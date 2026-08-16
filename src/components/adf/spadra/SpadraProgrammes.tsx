import React from "react";
import { Link } from "@tanstack/react-router";
import { PROGRAMMES_DATA } from "@/data/mockData";

export const SpadraProgrammes: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-bold text-[#0f1b3d] uppercase">Programmes</h2>
      <p className="mt-2 text-[#33415c]">
        Flagship initiatives delivering the SPADRA mandate across sub-Saharan Africa.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      {PROGRAMMES_DATA.map((programme) => (
        <article key={programme.id} className="border-2 border-[#0f1b3d] flex flex-col">
          <div className="h-40 overflow-hidden">
            <img
              src={programme.image}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-6 flex flex-col gap-3 flex-1">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#245a86]">
              {programme.acronym} · {programme.leadRegion}
            </p>
            <h3 className="text-lg font-bold text-[#0f1b3d]">{programme.name}</h3>
            <p className="text-sm text-[#33415c] leading-relaxed">{programme.summary}</p>
            <Link
              to="/programmes/$slug"
              params={{ slug: programme.id }}
              className="mt-auto inline-flex items-center gap-1.5 bg-[#0f1b3d] text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 self-start hover:bg-[#1e3a5f] transition-colors"
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
