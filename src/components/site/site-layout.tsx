import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="skip-link focus:skip-link-focus">
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="border-b border-border bg-surface">
      <div className="container-page py-16">
        <p className="eyebrow text-accent">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl sm:text-5xl">{title}</h1>
        {intro ? (
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{intro}</p>
        ) : null}
      </div>
    </section>
  );
}
