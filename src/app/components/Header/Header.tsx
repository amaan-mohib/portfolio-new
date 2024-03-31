import React, { FC } from "react";
import styles from "./Header.module.scss";
import classNames from "classnames";
import Link from "next/link";
import Logo from "../Logo";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => (
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
      <Link href={"/"} title="Amaan Mohib">
        <Logo height={30} />
      </Link>
    </div>
    <div className="flex items-center">
      <Link href="/projects">Projects</Link>
    </div>
  </div>
);

export default Header;
