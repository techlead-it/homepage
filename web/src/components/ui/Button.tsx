import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: "primary" | "secondary" | "outline";
	size?: "sm" | "md" | "lg";
	to?: string;
	href?: string;
}

export default function Button({
	children,
	variant = "primary",
	size = "md",
	to,
	href,
	className = "",
	...props
}: ButtonProps) {
	const baseStyles =
		"inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

	const variantStyles = {
		primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
		secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
		outline:
			"border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
	};

	const sizeStyles = {
		sm: "px-3 py-1.5 text-sm",
		md: "px-4 py-2 text-base",
		lg: "px-6 py-3 text-lg",
	};

	const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

	if (to) {
		return (
			<Link to={to} className={classes}>
				{children}
			</Link>
		);
	}

	if (href) {
		return (
			<a
				href={href}
				className={classes}
				target="_blank"
				rel="noopener noreferrer"
			>
				{children}
			</a>
		);
	}

	return (
		<button className={classes} {...props}>
			{children}
		</button>
	);
}
