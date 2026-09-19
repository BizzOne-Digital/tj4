import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-xs uppercase tracking-[0.4em] text-electric">404</p>
      <h1 className="mt-4 text-6xl">Off the Court</h1>
      <p className="mt-4 max-w-md text-steel">This page doesn&apos;t exist. Head back to the homepage or explore programs.</p>
      <div className="mt-8 flex gap-4">
        <Button href="/">Home</Button>
        <Link href="/programs" className="text-sm uppercase tracking-widest text-steel hover:text-white">
          Programs
        </Link>
      </div>
    </div>
  );
}
