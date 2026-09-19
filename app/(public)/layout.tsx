import { getSiteSettings } from "@/lib/data/queries";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { headerOffsetClass } from "@/lib/layout/header-offset";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/layout/Preloader";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Providers } from "@/components/layout/Providers";
import { cn } from "@/lib/utils/cn";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <Providers>
      <div className="site-root min-h-dvh">
        <Preloader />
        <ScrollProgress />
        <PublicHeader settings={settings} />
        <main className={cn("relative w-full max-w-full overflow-x-clip", headerOffsetClass(settings))}>
          {children}
        </main>
        <Footer settings={settings} />
      </div>
    </Providers>
  );
}
