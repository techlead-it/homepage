import type { SVGProps } from "react";

export function PainPocStalledIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="18" width="34" height="12" rx="2" />
        <path d="M12 24h15M23 20l4 4-4 4M33 15v18M37 15v18" />
        <circle cx="11" cy="37" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="17" cy="37" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="23" cy="37" r="1.5" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}
