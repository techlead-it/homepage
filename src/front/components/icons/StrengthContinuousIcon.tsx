import type { SVGProps } from "react";

export function StrengthContinuousIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M37 18a15 15 0 1 0 1 11" />
        <path d="m33 18 4 0 1-4" />
        <path d="M16 31h5v-5h5v-5h6" />
        <path d="m28 17 4 4-4 4" />
      </g>
    </svg>
  );
}
