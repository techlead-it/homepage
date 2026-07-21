import type { SVGProps } from "react";

export function StrengthSecurityIcon(props: SVGProps<SVGSVGElement>) {
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
        <rect x="17" y="22" width="14" height="11" rx="2" />
        <path d="M20 22v-4a4 4 0 0 1 8 0v4" />
        <circle cx="24" cy="27.5" r="1.5" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}
