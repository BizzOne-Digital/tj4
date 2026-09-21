import { driveManifest } from "@/lib/images/drive-assets";
import { DriveImageGrid } from "@/components/sections/DriveImageGrid";

export function HomeWelcomeMedia() {
  const { images } = driveManifest.mainPage;

  if (!images.length) return null;

  return (
    <section className="border-y border-white/10 bg-charcoal/30 section-y">
      <div className="mx-auto max-w-7xl page-x">
        <p className="text-[10px] uppercase tracking-[0.25em] text-electric sm:text-xs sm:tracking-[0.3em]">
          Main Page · Pictures
        </p>
        <h2 className="mt-2 text-3xl sm:text-4xl">Life With the Lions</h2>
        <p className="mt-3 max-w-2xl text-sm text-steel sm:text-base">
          Highlights from practices, games, and team moments across Central PA Lions AAU.
        </p>
        <div className="mt-10">
          <DriveImageGrid images={images} altPrefix="Lions highlight" />
        </div>
      </div>
    </section>
  );
}
