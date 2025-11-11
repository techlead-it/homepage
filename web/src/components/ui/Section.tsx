import type { ReactNode } from "react";

interface SectionProps {
	children: ReactNode;
	className?: string;
	id?: string;
	background?: "white" | "gray";
}

export default function Section({
	children,
	className = "",
	id,
	background = "white",
}: SectionProps) {
	const bgStyles = {
		white: "bg-white",
		gray: "bg-gray-50",
	};

	return (
		<section id={id} className={`py-16 ${bgStyles[background]} ${className}`}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
		</section>
	);
}
