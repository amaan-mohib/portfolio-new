"use client";

import { usePathname } from "next/navigation";
import React, { PropsWithChildren, useEffect } from "react";

interface BackgroundSwitcherProps extends PropsWithChildren {}

const BackgroundSwitcher: React.FC<BackgroundSwitcherProps> = ({
  children,
}) => {
  const pathname = usePathname();

  useEffect(() => {
    let bgColor = "#000";
    switch (pathname) {
      case "/projects":
        bgColor = "#304e69";
        break;
      default:
        bgColor = "#000";
    }
    document.body.style.backgroundColor = bgColor;
  }, [pathname]);

  return children;
};

export default BackgroundSwitcher;
