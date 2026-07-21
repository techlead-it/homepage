import type { SVGProps } from "react";

export function StrengthQualityIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="19" r="11" />
        <path d="m18.5 19 3.5 3.5 7.5-7.5" />
        <path d="m17 28-2 12 9-5 9 5-2-12" />
      </g>
    </svg>
  );
}
