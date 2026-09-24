import type { ReactNode } from "react";

export function Section({
  eyebrow,
  title,
  action,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            {eyebrow && <p className="text-xs font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>}
            <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
          </div>
          {action}
        </div>
        {children}
      </div>
    </section>
  );
}
