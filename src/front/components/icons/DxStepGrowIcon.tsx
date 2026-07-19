import type { SVGProps } from "react";

export function DxStepGrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M39 20A16 16 0 0 0 11 14" />
        <path d="m10 8 1 6 6-1" />
        <path d="M9 28a16 16 0 0 0 28 6" />
        <path d="m38 40-1-6-6 1" />
        <path d="m17 28 5-5 4 4 6-8" />
        <path d="m28 19h4v4" />
      </g>
    </svg>
  );
}
