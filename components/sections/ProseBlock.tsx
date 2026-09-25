export function ProseBlock({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-4 text-steel">
      {paragraphs.map((p) => (
        <p key={p.slice(0, 48)} className="leading-relaxed">
          {p}
        </p>
      ))}
    </div>
  );
}
