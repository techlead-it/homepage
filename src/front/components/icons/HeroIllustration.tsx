import type { SVGProps } from "react";

export function HeroIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 480 360"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M54 91h112l22 22v154H54V91Z" />
        <path d="M166 91v22h22" />
        <path d="M69 129h102M69 151h102M69 173h102M69 195h102M69 217h102M69 239h102" />
        <path d="M94 129v110M132 129v110" />
        <path d="M42 106 28 120v153h126" />
        <path d="M204 180h68m-18-18 18 18-18 18" />
        <rect x="294" y="85" width="150" height="184" rx="8" />
        <path d="M294 119h150" />
        <circle cx="312" cy="102" r="3" fill="currentColor" stroke="none" />
        <circle cx="324" cy="102" r="3" fill="currentColor" stroke="none" />
        <path d="M314 143h44v43h-44zM372 143h52v18h-52zM372 174h52v12h-52z" />
        <path d="M314 230v-21M332 230v-34M350 230v-25M368 230v-48M386 230v-31M404 230v-42" />
        <path d="M310 243h118" />
        <path d="M278 283h182M330 283l-8 18h94l-8-18" />
      </g>
    </svg>
  );
}
