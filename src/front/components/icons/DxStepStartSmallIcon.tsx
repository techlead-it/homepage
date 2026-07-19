import type { SVGProps } from "react";

export function DxStepStartSmallIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 39V23" />
        <path d="M24 28c-8 0-13-4-13-11 8 0 13 4 13 11Z" />
        <path d="M24 23c0-7 5-11 13-11 0 7-5 11-13 11Z" />
        <path d="M14 39h20" />
        <circle cx="24" cy="39" r="2" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}
