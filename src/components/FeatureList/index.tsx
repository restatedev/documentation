import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  iconPath: string;
  description: JSX.Element;
};

function Feature({ title, iconPath, description }: FeatureItem) {
  return (
    <div className={styles.feature}>
      <div className="padding-sm bg-dark" className={styles.featureSvg}>
        <img src={iconPath} />
      </div>
      <h6>{title}</h6>
      <div className={styles.featureDescription}>{description}</div>
    </div>
  );
}

export default function FeatureList({ features }): JSX.Element {
  return (
    <section className={styles.features}>
      <div className={styles.featureRow}>
        {features.map((props, idx) => (
          <Feature key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}
