import type { SVGProps } from "react";

export function ServiceDxSupportIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="13" width="14" height="22" rx="4" />
        <rect x="28" y="13" width="14" height="22" rx="4" />
        <path d="M20 22h8M24 18v12" />
        <circle cx="13" cy="24" r="3" />
        <circle cx="35" cy="24" r="3" />
        <path d="M10 39h28" />
      </g>
    </svg>
  );
}
