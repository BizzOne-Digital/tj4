import { requireAdmin } from "@/lib/auth/session";
import { connectDB, isDbConfigured } from "@/lib/db/mongodb";
import {
  Registration,
  ContactMessage,
  Program,
  BlogPost,
  Event,
  Testimonial,
  NewsletterSubscriber,
  ActivityLog,
} from "@/models/schemas";

export default async function AdminDashboardPage() {
  await requireAdmin();

  let stats = {
    registrations: 0,
    messages: 0,
    programs: 0,
    posts: 0,
    events: 0,
    pendingTestimonials: 0,
    subscribers: 0,
  };
  let activity: { action: string; userEmail?: string }[] = [];

  if (isDbConfigured()) {
    await connectDB();
    const [registrations, messages, programs, posts, events, pendingTestimonials, subscribers, logs] =
      await Promise.all([
        Registration.countDocuments(),
        ContactMessage.countDocuments({ read: false }),
        Program.countDocuments({ active: true }),
        BlogPost.countDocuments({ published: true }),
        Event.countDocuments({ published: true }),
        Testimonial.countDocuments({ approved: false }),
        NewsletterSubscriber.countDocuments({ active: true }),
        ActivityLog.find().sort({ createdAt: -1 }).limit(8).lean(),
      ]);
    stats = {
      registrations,
      messages,
      programs,
      posts,
      events,
      pendingTestimonials,
      subscribers,
    };
    activity = logs.map((l) => ({ action: l.action, userEmail: l.userEmail }));
  }

  const cards = [
    { label: "Registration Inquiries", value: stats.registrations },
    { label: "Unread Messages", value: stats.messages },
    { label: "Active Programs", value: stats.programs },
    { label: "Published Posts", value: stats.posts },
    { label: "Upcoming Events", value: stats.events },
    { label: "Testimonials Pending", value: stats.pendingTestimonials },
    { label: "Newsletter Subscribers", value: stats.subscribers },
  ];

  return (
    <div>
      <h2 className="mb-6 text-3xl uppercase">Dashboard</h2>
      {!isDbConfigured() && (
        <p className="mb-6 rounded-lg border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-steel">
          MongoDB is not configured. Set MONGODB_URI and run npm run seed.
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl border border-white/10 bg-charcoal/60 p-5">
            <p className="text-3xl font-[family-name:var(--font-display)]">{card.value}</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-steel">{card.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <h3 className="text-xl uppercase">Recent Activity</h3>
        <ul className="mt-4 space-y-2 text-sm text-steel">
          {activity.length ? (
            activity.map((item, i) => (
              <li key={i}>
                {item.action} {item.userEmail ? `· ${item.userEmail}` : ""}
              </li>
            ))
          ) : (
            <li>No activity logged yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
