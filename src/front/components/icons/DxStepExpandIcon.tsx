import type { SVGProps } from "react";

export function DxStepExpandIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="24" r="5" />
        <circle cx="24" cy="24" r="11" strokeDasharray="3 4" />
        <path d="M24 9V4m0 0-3 3m3-3 3 3M39 24h5m0 0-3-3m3 3-3 3M24 39v5m0 0-3-3m3 3 3-3M9 24H4m0 0 3-3m-3 3 3 3" />
      </g>
    </svg>
  );
}
