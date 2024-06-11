import React from "react";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  iconPath: string;
  description: JSX.Element;
  java: string;
  ts: string;
  kotlin: string;
  link: { icon: string; url: string };
};

function Feature({
  title,
  iconPath,
  description,
  java,
  ts,
  link,
  kotlin,
}: FeatureItem) {
  return (
    <div className={styles.feature}>
      <h6 className={styles.title}>{title}</h6>
      {description ? <p className={styles.description}>{description}</p> : null}
      <div className={styles.langContainer}>
        {ts ? (
          <div id="overviewButtonDiv">
            <a
              className={`overviewButton btn btn-primary btn-lg firstTimeButton ${styles.lang}`}
              href={ts}
              target={"_blank"}
              role="button"
            >
              <img
                className="buttonIcon"
                src="/img/typescript.svg"
                width="28"
              />
            </a>
          </div>
        ) : null}
        {java ? (
          <div id="overviewButtonDiv">
            <a
              className={`overviewButton btn btn-primary btn-lg firstTimeButton  ${styles.lang}`}
              href={java}
              target={"_blank"}
              role="button"
            >
              <img className="buttonIcon" src="/img/java.svg" width="28" />
            </a>
          </div>
        ) : null}
        {kotlin ? (
          <div id="overviewButtonDiv">
            <a
              className={`overviewButton btn btn-primary btn-lg firstTimeButton  ${styles.lang}`}
              href={kotlin}
              target={"_blank"}
              role="button"
            >
              <img className="buttonIcon" src="/img/kotlin.svg" width="28" />
            </a>
          </div>
        ) : null}
        {link ? (
          <div id="overviewButtonDiv">
            <a
              className={`overviewButton btn btn-primary btn-lg firstTimeButton  ${styles.lang}`}
              href={link.url}
              target={"_blank"}
              role="button"
            >
              <img
                className="buttonIcon"
                src={link.icon ? link.icon : "/img/arrow-right.svg"}
                width="24"
              />
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function FeatureWidget({ itemsPerRow, features }): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featureRow}>
          {features.map((props, idx) => (
            <Feature key={idx} {...props} itemsPerRow={itemsPerRow} />
          ))}
        </div>
      </div>
    </section>
  );
}
