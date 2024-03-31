import React, { FC, PropsWithChildren } from "react";
import styles from "./MainWrapper.module.scss";

interface MainProps extends PropsWithChildren {}

const MainWrapper: FC<MainProps> = ({ children }) => (
  <div className={styles.Main}>{children}</div>
);

export default MainWrapper;
