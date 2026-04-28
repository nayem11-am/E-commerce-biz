import type { PropsWithChildren } from "react";
import { Container } from "@/components/common/Container";

interface InfoPageLayoutProps extends PropsWithChildren {
  title: string;
  description: string;
}

export function InfoPageLayout({ title, description, children }: InfoPageLayoutProps) {
  return (
    <section className="py-10 sm:py-12">
      <Container>
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <header className="mb-8 border-b border-slate-200 pb-5">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">{description}</p>
          </header>
          <div className="space-y-8">{children}</div>
        </div>
      </Container>
    </section>
  );
}

