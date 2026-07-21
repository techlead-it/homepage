import type { SVGProps } from "react";

export function StrengthStableTechIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 7 38 12v10c0 9-5.5 15-14 19-8.5-4-14-10-14-19V12l14-5Z" />
        <path d="M18 31h12M20 31V21h8v10M17 35h14" />
        <path d="M18 21h12" />
      </g>
    </svg>
  );
}
