interface ProficiencyLevelItemProps {
  level: number;
  title: string;
  description: string;
}

export default function ProficiencyLevelItem({
  level,
  title,
  description,
}: ProficiencyLevelItemProps) {
  const dots = Array.from({ length: level }, (_, i) => (
    <div
      key={`${title}-dot-${i + 1}`}
      className="w-3 h-3 rounded-full bg-blue-600"
    />
  ));

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <div className="flex gap-0.5">{dots}</div>
        <span className="text-sm font-semibold text-gray-900">{title}</span>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
