import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-surface text-surface-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-semibold">African Disability Forum</p>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            A continental umbrella of organisations of persons with disabilities,
            advancing rights, inclusion and full participation across Africa.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="eyebrow text-muted-foreground">Explore</h2>
          <ul className="mt-4 space-y-2 text-base">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About ADF
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow text-muted-foreground">Accessibility</h2>
          <p className="mt-4 text-sm text-muted-foreground">
            This site is built to WCAG 2.2 Level AA. If you meet a barrier, tell us
            and we will fix it.
          </p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-wrap items-center justify-between gap-2 py-5 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} African Disability Forum. All rights reserved.</p>
          <p>Content shown is placeholder pending ADF-supplied material.</p>
        </div>
      </div>
    </footer>
  );
}
