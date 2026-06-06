"use client";

import { MOOD_MAX, MOOD_MIN } from "@/lib/journal";

// The 1-10 mood control. The current value is the one big number on the screen
// (mono). The native range uses the lime accent for its fill and thumb.
export function MoodSlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="bg-surface rounded-md border border-border p-4">
      <div className="flex items-center gap-4">
        <span className="text-fg w-12 text-center font-mono text-3xl tabular-nums">
          {value}
        </span>
        <div className="flex-1">
          <input
            type="range"
            min={MOOD_MIN}
            max={MOOD_MAX}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
            aria-label="Mood, 1 to 10"
          />
          <div className="text-fg-3 mt-1 flex justify-between font-mono text-[11px]">
            <span>1</span>
            <span>10</span>
          </div>
        </div>
      </div>
    </div>
  );
}
