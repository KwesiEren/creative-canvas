import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

import { KNOWLEDGE } from './data/knowledge';

type KnowledgeChunk = {
  id: string;
  title: string;
  text: string;
  embedding: number[];
};

const EMBEDDING_DIMENSIONS = 18;

function buildMockEmbedding(text: string): number[] {
  const vector = Array.from({ length: EMBEDDING_DIMENSIONS }, () => 0);
  const tokens = (text.toLowerCase().match(/[a-z0-9]+/g) ?? []).filter(Boolean);

  for (const token of tokens) {
    let hash = 0;
    for (let i = 0; i < token.length; i += 1) {
      hash = (hash * 31 + token.charCodeAt(i)) >>> 0;
    }
    const index = hash % EMBEDDING_DIMENSIONS;
    vector[index] += 1 + token.length / 10;
  }

  return vector;
}

function cosineSimilarity(left: number[], right: number[]): number {
  const dotProduct = left.reduce((sum, value, index) => sum + value * right[index], 0);
  const leftNorm = Math.sqrt(left.reduce((sum, value) => sum + value * value, 0));
  const rightNorm = Math.sqrt(right.reduce((sum, value) => sum + value * value, 0));

  if (!leftNorm || !rightNorm) {
    return 0;
  }

  return dotProduct / (leftNorm * rightNorm);
}

const knowledgeChunks: KnowledgeChunk[] = [
  { id: 'summary', title: 'ADF summary', text: KNOWLEDGE.summary, embedding: buildMockEmbedding(KNOWLEDGE.summary) },
  {
    id: 'information-architecture',
    title: 'Information architecture',
    text: KNOWLEDGE.informationArchitecture,
    embedding: buildMockEmbedding(KNOWLEDGE.informationArchitecture),
  },
  {
    id: 'migration-rules',
    title: 'Migration rules',
    text: KNOWLEDGE.migrationRules,
    embedding: buildMockEmbedding(KNOWLEDGE.migrationRules),
  },
  {
    id: 'programmes',
    title: 'Programmes',
    text: KNOWLEDGE.programmes.map((programme) => `${programme.name} (${programme.id})`).join('. '),
    embedding: buildMockEmbedding(KNOWLEDGE.programmes.map((programme) => `${programme.name} ${programme.id}`).join(' ')),
  },
  {
    id: 'notes',
    title: 'Project notes',
    text: KNOWLEDGE.notes,
    embedding: buildMockEmbedding(KNOWLEDGE.notes),
  },
  {
    id: 'contact',
    title: 'Contact details',
    text: `Office: ${KNOWLEDGE.contact.office}. Email: ${KNOWLEDGE.contact.email}. Safeguarding: ${KNOWLEDGE.contact.safeguarding}. Investigations: ${KNOWLEDGE.contact.investigations}.`,
    embedding: buildMockEmbedding(`Office ${KNOWLEDGE.contact.office} email ${KNOWLEDGE.contact.email}`),
  },
];

function retrieveKnowledgeAnswer(query: string): string {
  const normalizedQuery = query.trim();
  if (!normalizedQuery) {
    return KNOWLEDGE.summary;
  }

  const queryEmbedding = buildMockEmbedding(normalizedQuery);
  const rankedChunks = knowledgeChunks
    .map((chunk) => ({
      id: chunk.id,
      title: chunk.title,
      text: chunk.text,
      score: cosineSimilarity(queryEmbedding, chunk.embedding),
    }))
    .filter((chunk) => chunk.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 3);

  if (rankedChunks.length === 0) {
    return KNOWLEDGE.summary;
  }

  const answer = rankedChunks.map((chunk) => chunk.text).join('\n\n');
  return answer.length > 600 ? answer.slice(0, 600) + '…' : answer;
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      // Handle a lightweight local chat endpoint for the ADF Assistant widget
      try {
        const url = new URL(request.url);
        if (url.pathname === '/api/chat' && request.method === 'POST') {
          const body = await request.json().catch(() => ({}));
          const message = (body?.message || '').toString();
          const answer = retrieveKnowledgeAnswer(message);

          return new Response(JSON.stringify({ text: answer }), {
            status: 200,
            headers: { 'content-type': 'application/json; charset=utf-8' },
          });
        }
      } catch (e) {
        console.error('Local API handler error', e);
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { 'content-type': 'text/html; charset=utf-8' },
      });
    }
  },
};
