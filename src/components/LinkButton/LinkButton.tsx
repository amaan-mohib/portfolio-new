import React, { FC, PropsWithChildren } from "react";
import styles from "./LinkButton.module.scss";
import Link, { LinkProps } from "next/link";
import classNames from "classnames";

interface ButtonProps extends PropsWithChildren, LinkProps {
  target?: React.HTMLAttributeAnchorTarget;
  title?: string;
}
const LinkButton: FC<ButtonProps> = ({ children, target, title, ...rest }) => {
  return (
    <Link
      {...rest}
      target={target}
      title={title}
      aria-label={title}
      className={classNames(
        "remove-effect flex items-center rounded-lg border p-1",
        styles.LinkButton,
      )}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
