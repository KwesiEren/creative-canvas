import React from "react";
import { Link } from "@tanstack/react-router";
import { PROGRAMMES_DATA } from "@/data/mockData";

export const SpadraProgrammes: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-bold text-[var(--s-primary)] uppercase">Programmes</h2>
      <p className="mt-2 text-[var(--s-muted)]">
        Flagship initiatives delivering the SPADRA mandate across sub-Saharan Africa.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      {PROGRAMMES_DATA.map((programme) => (
        <article key={programme.id} className="border-2 border-[var(--s-primary)] flex flex-col">
          <div className="h-40 overflow-hidden">
            <img
              src={programme.image}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-6 flex flex-col gap-3 flex-1">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--s-accent)]">
              {programme.acronym} · {programme.leadRegion}
            </p>
            <h3 className="text-lg font-bold text-[var(--s-primary)]">{programme.name}</h3>
            <p className="text-sm text-[var(--s-muted)] leading-relaxed">{programme.summary}</p>
            <Link
              to="/programmes/$slug"
              params={{ slug: programme.id }}
              className="mt-auto inline-flex items-center gap-1.5 bg-[var(--s-primary)] text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 self-start hover:bg-[var(--s-primary-hover)] transition-colors"
            >
              Programme details
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </article>
      ))}
    </div>
  </div>
);
