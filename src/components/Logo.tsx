import * as React from "react";
import { SVGProps } from "react";
const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 308 377"
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeMiterlimit={4.818}
      strokeWidth={20}
      d="M81.346 187.651 153.5 339.5l71.915-151.849m-144.07 0L10 43v290l71.346-145.349Zm0 0L153.5 39l71.915 148.651m-144.07 0h144.07m0 0L297.5 43v290l-72.085-145.349Z"
    />
  </svg>
);
export default Logo;
