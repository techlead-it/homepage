import type { SVGProps } from "react";

export function PainToolNotUsedIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <rect x="17" y="10" width="20" height="25" rx="3" />
        <path d="M22 16h10M22 21h10M22 26h6" />
        <path d="M30 40c-10 0-18-6-18-14 0-5 3-9 8-11" />
        <path d="m15 14 5 1-2 5" />
      </g>
    </svg>
  );
}
