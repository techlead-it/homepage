import type { ReactNode } from "react";

interface CardProps {
	children: ReactNode;
	className?: string;
	hover?: boolean;
}

export default function Card({
	children,
	className = "",
	hover = false,
}: CardProps) {
	const hoverStyles = hover ? "hover:shadow-lg transition-shadow" : "";

	return (
		<div
			className={`bg-white rounded-lg shadow-md p-6 ${hoverStyles} ${className}`}
		>
			{children}
		</div>
	);
}
