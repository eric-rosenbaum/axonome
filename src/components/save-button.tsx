"use client";

import { useState, useTransition } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { toggleSave } from "@/lib/actions/save";
import { cn } from "@/lib/utils";

export function SaveButton({
  slug,
  initial,
  disabled = false,
  variant = "light",
}: {
  slug: string;
  initial: boolean;
  disabled?: boolean;
  variant?: "light" | "dark";
}) {
  const [saved, setSaved] = useState(initial);
  const [pending, startTransition] = useTransition();

  const onClick = () => {
    if (disabled || pending) return;
    startTransition(async () => {
      // optimistic
      setSaved((s) => !s);
      const result = await toggleSave(slug);
      if (result && "saved" in result && typeof result.saved === "boolean") {
        setSaved(result.saved);
      }
    });
  };

  const Icon = saved ? BookmarkCheck : Bookmark;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || pending}
      aria-pressed={saved}
      title={disabled ? "Sign in to save" : saved ? "Saved" : "Save for later"}
      className={cn(
        "inline-flex items-center gap-2 h-9 px-3 rounded-md text-sm font-medium transition-colors",
        variant === "dark"
          ? "bg-ink-soft hover:bg-ink-strong text-fg-inverse-strong border border-border-inverse"
          : "bg-card hover:bg-border text-fg",
        disabled && "opacity-60 cursor-not-allowed",
      )}
    >
      <Icon className="size-4" />
      {saved ? "Saved" : "Save"}
    </button>
  );
}
