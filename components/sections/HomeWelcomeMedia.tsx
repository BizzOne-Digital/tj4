import { driveManifest } from "@/lib/images/drive-assets";
import { DriveImageGrid } from "@/components/sections/DriveImageGrid";
import { mainPageVideos } from "@/lib/data/site-videos";
import { SiteVideo } from "@/components/ui/SiteVideo";

export function HomeWelcomeMedia() {
  const { images } = driveManifest.mainPage;
  const [featuredVideo, ...moreVideos] = mainPageVideos;

  if (!images.length && !mainPageVideos.length) return null;

  return (
    <section className="border-y border-white/10 bg-charcoal/30 section-y">
      <div className="mx-auto max-w-7xl page-x">
        <p className="text-[10px] uppercase tracking-[0.25em] text-electric sm:text-xs sm:tracking-[0.3em]">
          Main Page · Pictures &amp; Videos
        </p>
        <h2 className="mt-2 text-3xl sm:text-4xl">Life With the Lions</h2>
        <p className="mt-3 max-w-2xl text-sm text-steel sm:text-base">
          Highlights from practices, games, and team moments across Central PA Lions AAU.
        </p>

        {featuredVideo && (
          <div className="mt-10 space-y-4 sm:space-y-6">
            <SiteVideo
              src={featuredVideo}
              title="Central PA Lions highlight video"
              className="mx-auto max-w-5xl"
              preload="metadata"
            />
            {moreVideos.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                {moreVideos.map((src, i) => (
                  <SiteVideo
                    key={src}
                    src={src}
                    title={`Central PA Lions highlight video ${i + 2}`}
                    preload="none"
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {images.length > 0 && (
          <div className={featuredVideo ? "mt-10 sm:mt-12" : "mt-10"}>
            <DriveImageGrid images={images} altPrefix="Lions highlight" />
          </div>
        )}
      </div>
    </section>
  );
}
