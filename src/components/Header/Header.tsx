import React, { FC } from "react";
import styles from "./Header.module.scss";
import classNames from "classnames";
import Link from "next/link";
import Logo from "../Logo";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <div
      className={classNames(
        styles.Header,
        "px-3",
        "max-w-3xl",
        "mx-auto",
        "flex",
        "justify-between",
      )}
    >
      <div>
        <Link href={"/"} title="Amaan Mohib" className="remove-effect">
          <Logo height={30} />
        </Link>
      </div>
      <div className="flex items-center gap-5 text-sm">
        <Link href="/projects">Projects</Link>
        <Link href="/resume" target="_blank">
          Resume
        </Link>
      </div>
    </div>
  );
};

export default Header;
