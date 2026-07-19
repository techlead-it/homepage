import type { SVGProps } from "react";

export function DxStepEmbedIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 34V18" />
        <path d="M24 22c-7 0-11-4-11-10 7 0 11 4 11 10Z" />
        <path d="M24 18c0-6 4-10 11-10 0 6-4 10-11 10Z" />
        <path d="M24 34 15 42M24 34l9 8M24 34v9M19 38l-7 1M29 38l7 1" />
        <path d="M9 33h30" />
      </g>
    </svg>
  );
}
