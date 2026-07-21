import type { SVGProps } from "react";

export function ServiceAiTrainingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <rect x="10" y="10" width="28" height="25" rx="5" />
        <path d="m17 35-5 6v-8" />
        <path d="M18 10V6M24 10V6M30 10V6M38 18h4M38 25h4M18 35v4M25 35v4M10 18H6M10 25H6" />
        <circle cx="19" cy="22" r="2" fill="currentColor" stroke="none" />
        <circle cx="29" cy="22" r="2" fill="currentColor" stroke="none" />
        <path d="M19 29h10" />
      </g>
    </svg>
  );
}
