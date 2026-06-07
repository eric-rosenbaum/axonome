"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { X } from "lucide-react";
import { toggleSave } from "@/lib/actions/save";

export function RemoveButton({ slug }: { slug: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const onClick = () => {
    startTransition(async () => {
      await toggleSave(slug);
      router.refresh();
    });
  };
  return (
    <button type="button" onClick={onClick} disabled={pending} title="Remove from saved" className="p-2 rounded-md text-fg-subtle hover:text-danger hover:bg-card transition-colors disabled:opacity-40">
      <X className="size-4" />
    </button>
  );
}
