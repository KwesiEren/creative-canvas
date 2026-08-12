import { useEffect, useState } from "react";
import { Contrast, Minus, Plus, Wind } from "lucide-react";

type Prefs = {
  scale: number;
  contrast: boolean;
  reduceMotion: boolean;
};

const STORAGE_KEY = "adf-a11y-prefs";
const DEFAULTS: Prefs = { scale: 1, contrast: false, reduceMotion: false };

function apply(prefs: Prefs) {
  const root = document.documentElement;
  root.style.setProperty("--text-scale", String(prefs.scale));
  root.classList.toggle("hc", prefs.contrast);
  root.classList.toggle("reduce-motion", prefs.reduceMotion);
}

export function AccessibilityToolbar() {
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = { ...DEFAULTS, ...JSON.parse(raw) } as Prefs;
        setPrefs(parsed);
        apply(parsed);
      }
    } catch {
      /* ignore unreadable storage */
    }
  }, []);

  function update(next: Partial<Prefs>) {
    const merged = { ...prefs, ...next };
    setPrefs(merged);
    apply(merged);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    } catch {
      /* ignore unwritable storage */
    }
  }

  const btn =
    "inline-flex items-center gap-1.5 rounded-md border border-transparent px-2.5 py-1 text-sm font-medium text-primary-foreground/90 transition-colors hover:bg-primary-foreground/15 hover:text-primary-foreground";

  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container-page flex flex-wrap items-center justify-between gap-2 py-1.5">
        <p className="text-sm text-primary-foreground/80">
          African Disability Forum — voice of organisations of persons with
          disabilities in Africa
        </p>
        <div
          role="group"
          aria-label="Accessibility settings"
          className="flex items-center gap-1"
        >
          <span className="mr-1 text-sm text-primary-foreground/80">Text size</span>
          <button
            type="button"
            className={btn}
            onClick={() => update({ scale: Math.max(0.9, +(prefs.scale - 0.1).toFixed(2)) })}
            aria-label="Decrease text size"
          >
            <Minus aria-hidden="true" className="size-4" />
          </button>
          <span aria-live="polite" className="min-w-11 text-center text-sm tabular-nums">
            {Math.round(prefs.scale * 100)}%
          </span>
          <button
            type="button"
            className={btn}
            onClick={() => update({ scale: Math.min(1.5, +(prefs.scale + 0.1).toFixed(2)) })}
            aria-label="Increase text size"
          >
            <Plus aria-hidden="true" className="size-4" />
          </button>
          <button
            type="button"
            className={btn}
            aria-pressed={prefs.contrast}
            onClick={() => update({ contrast: !prefs.contrast })}
          >
            <Contrast aria-hidden="true" className="size-4" />
            High contrast
          </button>
          <button
            type="button"
            className={btn}
            aria-pressed={prefs.reduceMotion}
            onClick={() => update({ reduceMotion: !prefs.reduceMotion })}
          >
            <Wind aria-hidden="true" className="size-4" />
            Reduce motion
          </button>
        </div>
      </div>
    </div>
  );
}
