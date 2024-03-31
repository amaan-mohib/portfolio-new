"use client";

import { usePathname } from "next/navigation";
import React, { PropsWithChildren, useEffect } from "react";

interface BackgroundSwitcherProps extends PropsWithChildren {}

const BackgroundSwitcher: React.FC<BackgroundSwitcherProps> = ({
  children,
}) => {
  const pathname = usePathname();

  useEffect(() => {
    let bgColor = "var(--bg-home)";

    switch (pathname) {
      case "/projects":
        bgColor = "var(--bg-projects)";
        break;
      case "/links":
        bgColor = "var(--bg-links)";
        break;
      default:
        bgColor = "var(--bg-home)";
    }
    document.body.style.backgroundColor = bgColor;
    document.documentElement.style.setProperty("--bg-color", bgColor);
  }, [pathname]);

  return children;
};

export default BackgroundSwitcher;
