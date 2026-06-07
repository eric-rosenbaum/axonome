"use client";

import { useActionState, useState } from "react";
import { updateProfile } from "@/lib/actions/profile";
import { Button } from "@/components/ui/button";

type State = { error?: string; ok?: boolean } | null;

async function action(_prev: State, formData: FormData): Promise<State> {
  const result = await updateProfile(formData);
  return result ?? null;
}

const ROLE_OPTIONS = [
  { value: "patient", label: "I have the diagnosis" },
  { value: "loved-one", label: "Someone close to me does" },
  { value: "exploring", label: "Just exploring" },
];

export function AccountForm({
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

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Who are you?</label>
        <select
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="block w-full h-11 rounded-md border border-border bg-surface px-3"
        >
          <option value="" disabled>
            Select…
          </option>
          {ROLE_OPTIONS.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </div>

      {role && role !== "exploring" && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Disease focus</label>
          <select
            name="disease"
            defaultValue={initialDisease}
            className="block w-full h-11 rounded-md border border-border bg-surface px-3"
          >
            <option value="" disabled>
              Select a disease…
            </option>
            {diseases.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Display name <span className="text-fg-subtle font-normal">(optional)</span>
        </label>
        <input
          id="name"
          name="name"
          defaultValue={initialName}
          className="block w-full h-11 rounded-md border border-border bg-surface px-3"
        />
      </div>

      {state?.error && <p className="text-sm text-danger">{state.error}</p>}
      {state?.ok && <p className="text-sm text-success">Saved.</p>}

      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : "Save"}
      </Button>
    </form>
  );
}
