import { ComponentProps } from 'react'

type LogoProps = ComponentProps<'svg'>

export function Logo(props: LogoProps) {
  return (
    <svg
      width={179}
      height={26}
      viewBox="0 0 179 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_d_23_16)" clipPath="url(#clip0_23_16)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22.477 3.942h-.002L14.131 15.57l4.914 7.754H17.24l-4.117-6.349-.447.623 3.609 5.726h-2.09l-2.706-4.207-2.791 4.207H6.658l3.796-5.628-.437-.658-3.23 4.608-1.239 1.678H.284l1.135-1.678 5.936-8.697-6.039-9.006-1.11-1.677h5.471l1.084 1.677 3.25 5.128 3.602-5.146 1.26-1.66h8.895l-1.29 1.678zM8.93 10.652l-4.258-6.71H3.639l4.842 7.316.448-.606zm1.186 1.685l.437.674-.473.663-.439-.663.475-.674zm1.474-.778l-.439-.692 4.876-6.925h4.023l-6.963 9.98-.44-.793 6.09-8.516h-2.22l-4.927 6.946zm.062 3.147l-.457.652.433.655.452-.647-.428-.66zm-3.193-.015l-4.897 6.954h.904l4.424-6.305-.431-.65z"
          fill="#F2F2F2"
        />
      </g>
      <path
        d="M37.66 20V5.4h4.08c.96 0 1.793.187 2.5.56.707.36 1.253.873 1.64 1.54.4.667.6 1.453.6 2.36v5.66c0 .893-.2 1.68-.6 2.36a3.986 3.986 0 01-1.64 1.58c-.707.36-1.54.54-2.5.54h-4.08zm2.16-1.96h1.92c.8 0 1.427-.22 1.88-.66.467-.453.7-1.073.7-1.86V9.86c0-.773-.233-1.38-.7-1.82-.453-.453-1.08-.68-1.88-.68h-1.92v10.68zm13.972 2.16c-.893 0-1.68-.173-2.36-.52a3.793 3.793 0 01-1.54-1.5c-.36-.64-.54-1.387-.54-2.24v-2.88c0-.867.18-1.613.54-2.24.36-.64.873-1.133 1.54-1.48.68-.36 1.467-.54 2.36-.54.907 0 1.694.18 2.36.54.667.347 1.18.84 1.54 1.48.36.627.54 1.373.54 2.24v1.96h-6.8v.92c0 .813.2 1.433.6 1.86.414.427 1.007.64 1.78.64.627 0 1.134-.107 1.52-.32.387-.227.627-.553.72-.98h2.14c-.16.933-.64 1.68-1.44 2.24-.8.547-1.787.82-2.96.82zm2.36-6.48v-.68c0-.8-.2-1.42-.6-1.86-.4-.44-.986-.66-1.76-.66-.76 0-1.346.22-1.76.66-.4.44-.6 1.067-.6 1.88v.5l4.88-.02-.16.18zM64.164 20l-3.64-11h2.2l2.26 7.04c.147.413.274.833.38 1.26.12.413.207.74.26.98.067-.24.154-.567.26-.98.12-.427.24-.847.36-1.26L68.464 9h2.18l-3.64 11h-2.84z"
        fill="#fff"
      />
      <mask
        id="a"
        style={{
          maskType: 'alpha',
        }}
        maskUnits="userSpaceOnUse"
        x={72}
        y={4}
        width={106}
        height={20}
      >
        <path
          d="M72.4 20l3.92-7.54-3.66-7.06h3.3l1.52 3.2c.147.293.267.56.36.8.107.24.173.413.2.52.027-.107.087-.28.18-.52s.207-.507.34-.8l1.56-3.2h3.22l-3.66 7.06L83.6 20h-3.3l-1.76-3.6a32.251 32.251 0 01-.6-1.4c-.04.133-.107.327-.2.58a8.133 8.133 0 01-.36.82L75.62 20H72.4zm12.712 3.6V9h2.9v2.1h.7l-.7.7c0-.947.26-1.68.78-2.2.52-.533 1.233-.8 2.14-.8 1.107 0 1.993.393 2.66 1.18.667.773 1 1.813 1 3.12v2.8c0 .867-.153 1.627-.46 2.28-.293.64-.713 1.14-1.26 1.5-.546.347-1.193.52-1.94.52-.907 0-1.62-.26-2.14-.78-.52-.533-.78-1.273-.78-2.22l.7.7h-.7l.1 2.7v3h-3zm4.74-6c.56 0 .987-.153 1.28-.46.307-.32.46-.767.46-1.34v-2.6c0-.587-.153-1.033-.46-1.34-.293-.307-.72-.46-1.28-.46-.547 0-.973.16-1.28.48-.306.307-.46.747-.46 1.32v2.6c0 .573.154 1.02.46 1.34.307.307.733.46 1.28.46zm11.752 2.6c-.973 0-1.826-.18-2.56-.54a4.175 4.175 0 01-1.68-1.54c-.386-.667-.58-1.44-.58-2.32v-2.6c0-.88.194-1.647.58-2.3.4-.667.96-1.18 1.68-1.54.734-.373 1.587-.56 2.56-.56.974 0 1.814.187 2.52.56.72.36 1.274.873 1.66 1.54.4.653.6 1.42.6 2.3v2h-6.74v.6c0 .693.167 1.22.5 1.58.334.347.834.52 1.5.52.467 0 .84-.08 1.12-.24.294-.16.487-.38.58-.66h2.94c-.24.96-.786 1.733-1.64 2.32-.84.587-1.853.88-3.04.88zm1.92-6.54v-.5c0-.68-.16-1.2-.48-1.56-.306-.36-.786-.54-1.44-.54-.653 0-1.146.187-1.48.56-.32.373-.48.9-.48 1.58v.3l4.08-.04-.2.2zm5.493 6.34V9h2.8v2.1h.76l-.86 1.28c0-1.187.273-2.08.82-2.68.546-.6 1.346-.9 2.4-.9 1.213 0 2.153.367 2.82 1.1.68.733 1.02 1.767 1.02 3.1v.9h-3.2v-.7c0-.6-.167-1.067-.5-1.4-.32-.333-.754-.5-1.3-.5-.574 0-1.014.167-1.32.5-.294.333-.44.8-.44 1.4V20h-3zm11.552 0v-2.72h3.8V11.7h-3.3V9h6.1v8.28h3.2V20h-9.8zm5-12.74c-.547 0-.987-.14-1.32-.42-.32-.28-.48-.66-.48-1.14 0-.48.16-.86.48-1.14.333-.28.773-.42 1.32-.42.546 0 .98.14 1.3.42.333.28.5.66.5 1.14 0 .48-.167.86-.5 1.14-.32.28-.754.42-1.3.42zm11.412 12.94c-.973 0-1.827-.18-2.56-.54a4.175 4.175 0 01-1.68-1.54c-.387-.667-.58-1.44-.58-2.32v-2.6c0-.88.193-1.647.58-2.3.4-.667.96-1.18 1.68-1.54.733-.373 1.587-.56 2.56-.56.973 0 1.813.187 2.52.56a3.87 3.87 0 011.66 1.54c.4.653.6 1.42.6 2.3v2h-6.74v.6c0 .693.167 1.22.5 1.58.333.347.833.52 1.5.52.467 0 .84-.08 1.12-.24.293-.16.487-.38.58-.66h2.94c-.24.96-.787 1.733-1.64 2.32-.84.587-1.853.88-3.04.88zm1.92-6.54v-.5c0-.68-.16-1.2-.48-1.56-.307-.36-.787-.54-1.44-.54-.653 0-1.147.187-1.48.56-.32.373-.48.9-.48 1.58v.3l4.08-.04-.2.2zm5.172 6.34V9h2.9v2.1h.88l-.88.7c0-.933.267-1.667.8-2.2.533-.533 1.253-.8 2.16-.8 1.067 0 1.92.373 2.56 1.12.653.747.98 1.74.98 2.98V20h-3v-6.8c0-.573-.153-1.013-.46-1.32-.293-.32-.713-.48-1.26-.48-.533 0-.947.16-1.24.48-.293.307-.44.747-.44 1.32V20h-3zm16.532.2c-.973 0-1.826-.18-2.56-.54-.733-.373-1.3-.887-1.7-1.54-.4-.667-.6-1.44-.6-2.32v-2.6c0-.893.2-1.667.6-2.32.4-.653.967-1.16 1.7-1.52.734-.373 1.587-.56 2.56-.56 1.454 0 2.614.367 3.48 1.1.867.733 1.327 1.733 1.38 3h-3c-.04-.467-.226-.833-.56-1.1-.32-.267-.753-.4-1.3-.4-.6 0-1.06.153-1.38.46-.32.307-.48.753-.48 1.34v2.6c0 .573.16 1.02.48 1.34.32.307.78.46 1.38.46.547 0 .98-.127 1.3-.38.334-.267.52-.64.56-1.12h3c-.053 1.267-.513 2.267-1.38 3-.866.733-2.026 1.1-3.48 1.1zm11.753 0c-.974 0-1.827-.18-2.56-.54a4.175 4.175 0 01-1.68-1.54c-.387-.667-.58-1.44-.58-2.32v-2.6c0-.88.193-1.647.58-2.3.4-.667.96-1.18 1.68-1.54.733-.373 1.586-.56 2.56-.56.973 0 1.813.187 2.52.56a3.87 3.87 0 011.66 1.54c.4.653.6 1.42.6 2.3v2h-6.74v.6c0 .693.166 1.22.5 1.58.333.347.833.52 1.5.52.466 0 .84-.08 1.12-.24.293-.16.486-.38.58-.66h2.94c-.24.96-.787 1.733-1.64 2.32-.84.587-1.854.88-3.04.88zm1.92-6.54v-.5c0-.68-.16-1.2-.48-1.56-.307-.36-.787-.54-1.44-.54-.654 0-1.147.187-1.48.56-.32.373-.48.9-.48 1.58v.3l4.08-.04-.2.2z"
          fill="#fff"
        />
      </mask>
      <g mask="url(#a)">
        <path
          transform="rotate(31.51 162.181 -709)"
          fill="#fff"
          d="M162.181 -709H1334.181V204H162.181z"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_23_16"
          x={0.0000305176}
          y={2.26453}
          width={23.9742}
          height={21.4709}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={0.206451} />
          <feGaussianBlur stdDeviation={0.103226} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_23_16" />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_23_16"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_23_16">
          <path
            fill="#fff"
            transform="translate(0 2.265)"
            d="M0 0H24V21.4709H0z"
          />
        </clipPath>
      </defs>
    </svg>
  )
}