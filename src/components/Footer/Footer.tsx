import React, { FC, PropsWithChildren } from "react";
import styles from "./Footer.module.scss";
import classNames from "classnames";
import Link from "next/link";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconLink,
  IconMail,
} from "@tabler/icons-react";
import LinkButton from "../LinkButton/LinkButton";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import { cookies } from "next/headers";

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  const theme = cookies().get("theme")?.value;

  return (
    <div
      className={classNames(
        styles.Footer,
        "px-5",
        "max-w-3xl",
        "mx-auto",
        "text-sm",
        "justify-between",
      )}
    >
      <p>© {new Date().getFullYear()}</p>
      <div className="flex items-center gap-1">
        <ThemeSwitcher initialTheme={theme} />
        <LinkButton href="/links" title="Links">
          <IconLink size={20} />
        </LinkButton>
        <LinkButton href="mailto:amaan.mohib@gmail.com" title="Email">
          <IconMail size={20} />
        </LinkButton>
        <LinkButton
          href="https://www.linkedin.com/in/amaan-mohib"
          target="_blank"
          title="LinkedIn"
        >
          <IconBrandLinkedin size={20} />
        </LinkButton>
        <LinkButton
          href="https://www.github.com/amaan-mohib"
          target="_blank"
          title="GitHub"
        >
          <IconBrandGithub size={20} />
        </LinkButton>
      </div>
    </div>
  );
};

export default Footer;
