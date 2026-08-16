import { useSyncExternalStore } from "react";

/**
 * Mock SPADRA portal store: in-memory state persisted to localStorage,
 * with a minimal pub/sub so components re-render on change.
 * No real backend — swap these calls for a real auth API later.
 */

export type SpadraUser = {
  id: string;
  name: string;
  email: string;
  organisation: string;
  country: string;
  role: string;
};

export type SpadraSignUp = Omit<SpadraUser, "id">;

interface SpadraState {
  user: SpadraUser | null;
  savedResources: string[];
}

const STORAGE_KEY = "adf-spadra-portal";

const DEFAULT_STATE: SpadraState = {
  user: null,
  savedResources: [],
};

function readStored(): SpadraState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<SpadraState>;
    return {
      user: parsed.user ?? null,
      savedResources: Array.isArray(parsed.savedResources) ? parsed.savedResources : [],
    };
  } catch {
    return DEFAULT_STATE;
  }
}

let state: SpadraState = readStored();
const listeners = new Set<() => void>();

function emit(next: SpadraState) {
  state = next;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable — keep in-memory state */
    }
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): SpadraState {
  return state;
}

export function getServerSnapshot(): SpadraState {
  return DEFAULT_STATE;
}

export function signUp(data: SpadraSignUp): SpadraUser {
  const user: SpadraUser = { ...data, id: `usr-${Date.now()}` };
  emit({ ...state, user });
  return user;
}

export function signIn(email: string): SpadraUser {
  if (state.user && state.user.email === email) return state.user;
  const user: SpadraUser = {
    id: `usr-${Date.now()}`,
    name: email.split("@")[0] || "Portal User",
    email,
    organisation: "My Organisation",
    country: "Kenya",
    role: "Member OPD representative",
  };
  emit({ ...state, user });
  return user;
}

export function signOut(): void {
  emit({ ...state, user: null });
}

export function isSaved(resourceId: string): boolean {
  return state.savedResources.includes(resourceId);
}

export function toggleSaved(resourceId: string): void {
  const savedResources = isSaved(resourceId)
    ? state.savedResources.filter((id) => id !== resourceId)
    : [...state.savedResources, resourceId];
  emit({ ...state, savedResources });
}

export function useSpadra(): SpadraState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
