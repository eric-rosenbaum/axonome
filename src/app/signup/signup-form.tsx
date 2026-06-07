"use client";

import { useActionState } from "react";
import { signUpWithPassword } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";

type State = { error?: string } | null;

async function action(_prev: State, formData: FormData): Promise<State> {
  const result = await signUpWithPassword(formData);
  return result ?? null;
}

export function SignupForm() {
  const [state, formAction, pending] = useActionState<State, FormData>(action, null);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="block w-full h-11 rounded-md border border-border bg-surface px-3 text-base focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className="block w-full h-11 rounded-md border border-border bg-surface px-3 text-base focus:outline-none focus:ring-2 focus:ring-brand"
        />
        <p className="text-xs text-fg-subtle">At least 8 characters.</p>
      </div>
      {state?.error && <p className="text-sm text-danger">{state.error}</p>}
      <Button type="submit" disabled={pending} className="w-full" size="lg">
        {pending ? "Creating account…" : "Create account"}
      </Button>
      <p className="text-xs text-fg-subtle">
        By creating an account you agree to our{" "}
        <a href="/terms" className="underline underline-offset-2">
          Terms
        </a>{" "}
        and{" "}
        <a href="/privacy" className="underline underline-offset-2">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
