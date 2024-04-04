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

    if (pathname.startsWith("/projects")) {
      bgColor = "var(--bg-projects)";
    } else if (pathname.startsWith("/links")) {
      bgColor = "var(--bg-links)";
    }

    document.body.style.backgroundColor = bgColor;
    document.documentElement.style.setProperty("--bg-color", bgColor);
  }, [pathname]);

  return children;
};

export default BackgroundSwitcher;
