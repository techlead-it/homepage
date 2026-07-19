import type { SVGProps } from "react";

export function PainSiloedIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="14" r="6" />
        <circle cx="11" cy="35" r="5" />
        <circle cx="37" cy="35" r="5" />
        <path d="M21 12h6M21 15h4" />
        <path d="M20 20 14 29M28 20l6 9" strokeDasharray="3 4" />
        <path d="M17 35h14" strokeDasharray="3 4" />
        <circle cx="24" cy="14" r="2" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}
