"use client";

import { useActionState, useState } from "react";
import { completeOnboarding } from "@/lib/actions/profile";
import { Button } from "@/components/ui/button";

type State = { error?: string } | null;

async function action(_prev: State, formData: FormData): Promise<State> {
  const result = await completeOnboarding(formData);
  return result ?? null;
}

const ROLE_OPTIONS = [
  {
    value: "patient",
    label: "I have the diagnosis",
    description: "You're navigating your own diagnosis.",
  },
  {
    value: "loved-one",
    label: "Someone close to me has been diagnosed",
    description: "A family member, partner, friend, or someone you care for.",
  },
  {
    value: "exploring",
    label: "Just exploring",
    description: "No specific diagnosis — you're here to learn.",
  },
];

export function OnboardingForm({
  diseases,
  initialName,
  initialRole,
  initialDisease,
}: {
  diseases: { slug: string; name: string }[];
  initialName: string;
  initialRole: string;
  initialDisease: string;
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(action, null);
  const [role, setRole] = useState(initialRole);
  const [disease, setDisease] = useState(initialDisease);

  return (
    <form action={formAction} className="space-y-8">
      <fieldset className="space-y-3">
        <legend className="text-base font-medium mb-1">Who are you?</legend>
        <div className="space-y-2">
          {ROLE_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={`block rounded-lg border p-4 cursor-pointer transition-colors ${
                role === opt.value
                  ? "border-brand bg-brand-tint"
                  : "border-border bg-surface hover:border-border-strong"
              }`}
            >
              <input
                type="radio"
                name="role"
                value={opt.value}
                checked={role === opt.value}
                onChange={(e) => setRole(e.target.value)}
                className="sr-only"
              />
              <div className="font-medium">{opt.label}</div>
              <div className="text-sm text-fg-muted">{opt.description}</div>
            </label>
          ))}
        </div>
      </fieldset>

      {role && role !== "exploring" && (
        <fieldset className="space-y-3">
          <legend className="text-base font-medium mb-1">Which disease?</legend>
          <p className="text-sm text-fg-muted -mt-2">
            Pick the one most relevant to you right now. You can change this anytime from your
            account.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {diseases.map((d) => (
              <label
                key={d.slug}
                className={`block rounded-lg border p-3 cursor-pointer transition-colors text-sm ${
                  disease === d.slug
                    ? "border-brand bg-brand-tint"
                    : "border-border bg-surface hover:border-border-strong"
                }`}
              >
                <input
                  type="radio"
                  name="disease"
                  value={d.slug}
                  checked={disease === d.slug}
                  onChange={(e) => setDisease(e.target.value)}
                  className="sr-only"
                />
                {d.name}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <fieldset className="space-y-2">
        <label htmlFor="name" className="text-base font-medium block">
          What should we call you? <span className="text-fg-subtle font-normal">(optional)</span>
        </label>
        <input
          id="name"
          name="name"
          defaultValue={initialName}
          className="block w-full h-11 rounded-md border border-border bg-surface px-3"
        />
      </fieldset>

      {state?.error && <p className="text-sm text-danger">{state.error}</p>}

      <Button type="submit" disabled={pending || !role} size="lg">
        {pending ? "Setting up…" : "Continue"}
      </Button>
    </form>
  );
}
