"use client";

import { useTransition } from "react";
import { deleteAccount } from "@/lib/actions/profile";

export function DeleteAccountButton() {
  const [pending, startTransition] = useTransition();

  const handleClick = () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This will permanently remove your profile and all saved pages. This cannot be undone."
      )
    )
      return;

    startTransition(async () => {
      await deleteAccount();
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className="inline-flex h-10 items-center justify-center rounded-md border border-danger/40 px-4 text-sm font-medium text-danger hover:bg-danger/5 transition-colors disabled:opacity-50"
    >
      {pending ? "Deleting account…" : "Delete account"}
    </button>
  );
}
