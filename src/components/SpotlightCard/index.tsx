import React, { PropsWithChildren } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

export default function SpotlightCard({
  children,
}: PropsWithChildren<{}>): JSX.Element {
  return <div className={styles.container}>{children}</div>;
}
