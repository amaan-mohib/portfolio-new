"use client";

import React, { FC, useEffect, useState } from "react";
import LinkButton from "../LinkButton/LinkButton";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { setThemeAction } from "@/actions/setTheme";

interface ThemeSwitcherProps {
  initialTheme?: string;
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ initialTheme }) => {
  const [theme, setTheme] = useState<string>();

  const toggleTheme = () => {
    if (theme == "light") {
      setTheme("dark");
    } else if (theme == "dark") {
      setTheme("light");
    }
  };

  const maybeTheme = () => {
    const themeSystem = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    return initialTheme ?? themeSystem;
  };

  useEffect(() => {
    if (!document) return;
    (document.querySelector(":root") as any).dataset.theme =
      theme ?? maybeTheme();
    setThemeAction(theme ?? maybeTheme());
    setTheme(theme ?? maybeTheme());

    const useSetTheme = (e: any) => {
      setTheme(e.matches ? "dark" : "light");
    };

    const watchSysTheme = window.matchMedia("(prefers-color-scheme: dark)");

    watchSysTheme.addEventListener("change", useSetTheme);

    return () => {
      watchSysTheme.removeEventListener("change", useSetTheme);
    };
  }, [theme]);

  return (
    <>
      <LinkButton
        href="#"
        data-theme={theme}
        onClick={(e) => {
          e.preventDefault();
          toggleTheme();
        }}
      >
        {theme === "dark" ? <IconSun size={20} /> : <IconMoon size={20} />}
      </LinkButton>
    </>
  );
};

export default ThemeSwitcher;
