import type { SVGProps } from "react";

export function PainDataUnusedIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="8" width="29" height="31" rx="3" />
        <path d="M13 31V20M20 31V14M27 31v-7" />
        <rect x="27" y="27" width="14" height="12" rx="2" />
        <path d="M30 27v-3a4 4 0 0 1 8 0v3M10 12l2-2M16 12l2-2" />
      </g>
    </svg>
  );
}
