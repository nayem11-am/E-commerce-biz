"use client";

import type { PropsWithChildren } from "react";
import { Container } from "@/components/common/Container";
import { motion } from "framer-motion";

interface InfoPageLayoutProps extends PropsWithChildren {
  title: string;
  description: string;
}

export function InfoPageLayout({ title, description, children }: InfoPageLayoutProps) {
  return (
    <section className="py-10 sm:py-12">
      <Container>
        <div className="mx-auto max-w-4xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="premium-surface p-6 sm:p-8"
          >
            <h1 className="text-3xl font-bold tracking-tight text-white">{title}</h1>
            <p className="mt-3 text-sm leading-6 text-zinc-400 sm:text-base">{description}</p>
          </motion.div>
          <div className="space-y-6">{children}</div>
        </div>
      </Container>
    </section>
  );
}

