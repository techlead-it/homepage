import type { SVGProps } from "react";

export function PainNoDirectionIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 41V28c0-5-4-8-9-8H8" />
        <path d="m12 16-4 4 4 4" />
        <path d="M24 28c0-5 4-8 9-8h7" />
        <path d="m36 16 4 4-4 4" />
        <path d="M24 28V10" />
        <path d="m20 14 4-4 4 4" />
        <circle cx="24" cy="41" r="2" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}
