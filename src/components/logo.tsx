import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/images/axonome-logo.png"
      alt="Axonome"
      width={28}
      height={28}
      className={className}
    />
  );
}
