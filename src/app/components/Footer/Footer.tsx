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

interface FooterProps {}

interface ButtonProps extends PropsWithChildren {
  link: string;
  target?: React.HTMLAttributeAnchorTarget;
  title?: string;
}
const Button: FC<ButtonProps> = ({ link, children, target, title }) => {
  return (
    <Link
      href={link}
      target={target}
      title={title}
      className="flex items-center p-1 hover:bg-white/10 border rounded-lg border-white/20"
    >
      {children}
    </Link>
  );
};

const Footer: FC<FooterProps> = () => (
  <div
    className={classNames(
      styles.Footer,
      "px-3",
      "max-w-3xl",
      "mx-auto",
      "text-sm",
      "justify-between",
    )}
  >
    <Link href={"/links"}>© {new Date().getFullYear()}</Link>
    <div className="flex items-center gap-1">
      <Button link="/links" target="_blank" title="Links">
        <IconLink size={20} />
      </Button>
      <Button link="mailto:amaan.mohib@gmail.com" title="Email">
        <IconMail size={20} />
      </Button>
      <Button
        link="https://www.linkedin.com/in/amaan-mohib"
        target="_blank"
        title="LinkedIn"
      >
        <IconBrandLinkedin size={20} />
      </Button>
      <Button
        link="https://www.github.com/amaan-mohib"
        target="_blank"
        title="GitHub"
      >
        <IconBrandGithub size={20} />
      </Button>
    </div>
  </div>
);

export default Footer;
