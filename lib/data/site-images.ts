/** Local stock photography — replace via admin / Cloudinary when ready */
export const siteImages = {
  hero: "/images/arena-tunnel.jpg",
  heroFallback: "/images/hero-bg.jpg",
  courtCenter: "/images/court-center.jpg",
  trainingCourt: "/images/training-court.jpg",
  arenaTunnel: "/images/arena-tunnel.jpg",
  benchGear: "/images/bench-gear.jpg",
  achievements: "/images/achievements.jpg",
  shootingMachine: "/images/shooting-machine.jpg",
  lockerRoom: "/images/locker-room.jpg",
  logo: "/images/logo.png",
} as const;

export const programImageRotation = [
  siteImages.trainingCourt,
  siteImages.courtCenter,
  siteImages.shootingMachine,
  siteImages.benchGear,
  siteImages.arenaTunnel,
  siteImages.lockerRoom,
  siteImages.achievements,
];

export function programImageByIndex(index: number): string {
  return programImageRotation[index % programImageRotation.length];
}
