import type { SVGProps } from "react";

export function ServiceSystemDevIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="8" width="15" height="14" rx="2" />
        <rect x="26" y="8" width="15" height="14" rx="2" />
        <rect x="7" y="26" width="15" height="14" rx="2" />
        <path d="M33.5 27v-3M33.5 42v-3M26 33.5h-3M44 33.5h-3M28.2 28.2l-2.1-2.1M40.9 40.9l-2.1-2.1M38.8 28.2l2.1-2.1M26.1 40.9l2.1-2.1" />
        <circle cx="33.5" cy="33.5" r="5.5" />
        <circle cx="33.5" cy="33.5" r="2" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}
