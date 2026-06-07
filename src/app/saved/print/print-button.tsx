"use client";
import { Printer } from "lucide-react";
export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="print-hide inline-flex items-center gap-2 h-10 px-5 rounded-md bg-brand hover:bg-brand-hover text-white text-sm font-medium transition-colors">
      <Printer className="size-4" />Print this page
    </button>
  );
}
