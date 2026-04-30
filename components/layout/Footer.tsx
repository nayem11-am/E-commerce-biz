import Link from "next/link";
import { Container } from "@/components/common/Container";
import { FOOTER_LINKS } from "@/lib/constants/navigation";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950/80">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 py-8 text-sm text-zinc-500 md:flex-row md:items-center">
          <p>(c) {new Date().getFullYear()} ShopVerse. All rights reserved.</p>
          <ul className="flex flex-wrap gap-4">
            {FOOTER_LINKS.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
