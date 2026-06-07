"use client";

import { useTransition } from "react";
import { signOut } from "@/lib/actions/profile";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  const [pending, startTransition] = useTransition();
  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => startTransition(() => signOut())}
      disabled={pending}
    >
      {pending ? "Signing out…" : "Sign out"}
    </Button>
  );
}
