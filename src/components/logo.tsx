import { ComponentProps } from 'react'

export function Logo(props: ComponentProps<'svg'>) {
  return (
    <svg
      width="79"
      height="79"
      viewBox="0 0 79 79"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="79" height="79" rx="26" fill="url(#paint0_linear_246_4)" />
      <g filter="url(#filter0_d_246_4)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M62.5963 19.6646H62.5918L44.3831 45.0626L55.1069 62L51.1651 62L42.1823 48.1325L41.2074 49.4923L49.0816 62L44.5205 62L38.617 52.8113L32.5263 62H28.0777L36.3605 49.7058L35.4068 48.269L28.3593 58.3354L25.6563 62H14.1689L16.6466 58.3354L29.5981 39.3382L16.4214 19.6646L14 16L25.9379 16L28.3029 19.6646H28.3026L35.3953 30.867L43.2531 19.6246L43.2555 19.6247L46.0013 16L65.4118 16L62.5963 19.6646ZM33.0331 34.3211L23.7418 19.6646L21.4893 19.6646L32.0546 35.6467L33.0331 34.3211ZM35.6207 38.0029L36.5743 39.4751L35.5421 40.9224L34.5853 39.4751L35.6207 38.0029ZM38.8369 36.3028L37.8797 34.791L48.5183 19.6646L57.2984 19.6646L42.1048 41.4641L41.1418 39.7328L54.4312 21.1299H49.5884L38.8369 36.3028ZM38.972 43.1766L37.9743 44.6016L38.9205 46.0329L39.9061 44.6187L38.972 43.1766ZM32.0051 43.1438L21.3206 58.3354L23.2913 58.3354L32.9463 44.5618L32.0051 43.1438Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_246_4"
          x="10"
          y="16"
          width="59.4121"
          height="54"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_246_4"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_246_4"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_246_4"
          x1="-3.2228"
          y1="-1.48745"
          x2="81.727"
          y2="80.9006"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#212121" stopOpacity="0.19" />
          <stop offset="1" />
        </linearGradient>
      </defs>
    </svg>
  )
}
