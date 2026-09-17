export default function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-white/[0.07] bg-white/[0.008] py-5">
      <div className="animate-marquee flex w-max">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 pr-10 text-[12px] font-medium tracking-[0.42em] text-white/40"
          >
            <span className={i % 2 === 1 ? 'text-stroke-faint font-display font-semibold' : ''}>
              {item}
            </span>
            <span className="h-1 w-1 rounded-full bg-electric/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
