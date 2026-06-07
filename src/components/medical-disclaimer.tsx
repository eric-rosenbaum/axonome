export function MedicalDisclaimer({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-xs text-fg-subtle">
        Not medical advice. Always talk to your doctor about your specific situation.
      </p>
    );
  }
  return (
    <aside
      role="note"
      className="rounded-lg border border-border bg-card-soft px-4 py-3 text-sm text-fg-muted"
    >
      <strong className="text-fg">Not medical advice.</strong> This page is informational only.
      Always consult a qualified healthcare provider about your diagnosis, symptoms, or any change
      to your treatment.
    </aside>
  );
}
