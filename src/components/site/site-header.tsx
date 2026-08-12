import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { AccessibilityToolbar } from "./accessibility-toolbar";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About ADF" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <AccessibilityToolbar />
      <div className="container-page flex items-center justify-between gap-4 py-3">
        <Link
          to="/"
          className="flex items-center gap-3"
          aria-label="African Disability Forum — home"
        >
          <span
            aria-hidden="true"
            className="grid size-10 place-items-center rounded-md bg-primary font-display text-lg font-bold text-primary-foreground"
          >
            ADF
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block font-display text-base font-semibold text-foreground">
              African Disability Forum
            </span>
            <span className="block text-xs text-muted-foreground">
              Nothing about us, without us
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  activeProps={{
                    className:
                      "bg-secondary text-secondary-foreground underline decoration-2 underline-offset-8",
                  }}
                  className="rounded-md px-3 py-2 text-base font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border border-input px-3 py-2 text-sm font-medium md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X aria-hidden="true" className="size-5" />
          ) : (
            <Menu aria-hidden="true" className="size-5" />
          )}
          Menu
        </button>
      </div>

      {open ? (
        <nav id="mobile-nav" aria-label="Main (mobile)" className="border-t border-border md:hidden">
          <ul className="container-page flex flex-col py-2">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-3 text-base font-medium text-foreground hover:bg-muted"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
