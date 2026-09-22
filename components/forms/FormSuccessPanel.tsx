export function FormSuccessPanel({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-electric/30 bg-electric/10 p-8 text-center sm:p-10">
      <h2 className="text-3xl uppercase sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-relaxed text-steel">{body}</p>
    </div>
  );
}
