import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

type FeatureItem = {
  itemsPerRow: number;
  title: string;
  iconPath: string;
  description: JSX.Element;
  java: string;
  ts: string;
  kotlin: string;
  go: string;
  link: { icon: string; url: string };
  links: [{ icon: string; url: string }];
};

function Feature({
  itemsPerRow,
  title,
  iconPath,
  description,
  java,
  ts,
  link,
  kotlin,
  go,
  links,
}: FeatureItem) {
  const colWidth = itemsPerRow ? Math.floor(12 / itemsPerRow) : 4;
  return (
    <div className={clsx(`col col--${colWidth} margin-bottom--sm`)}>
      <div className={styles.featureDiv}>
        {iconPath ? (
          <div className="text--center">
            <img className={styles.featureSvg} src={iconPath} />
          </div>
        ) : null}
        <div className="text--center padding-horiz--md">
          <h6>{title}</h6>
          {description ? <p>{description}</p> : null}
          {ts ? (
            <div id="overviewButtonDiv">
              <a
                className="overviewButton btn btn-primary btn-lg firstTimeButton"
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
                className="overviewButton btn btn-primary btn-lg firstTimeButton"
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
                className="overviewButton btn btn-primary btn-lg firstTimeButton"
                href={kotlin}
                target={"_blank"}
                role="button"
              >
                <img className="buttonIcon" src="/img/kotlin.svg" width="28" />
              </a>
            </div>
          ) : null}
          {go ? (
            <div id="overviewButtonDiv">
              <a
                className="overviewButton btn btn-primary btn-lg firstTimeButton"
                href={go}
                target={"_blank"}
                role="button"
              >
                <img className="buttonIcon" src="/img/go.svg" width="40" />
              </a>
            </div>
          ) : null}
          {link ? (
            <div id="overviewButtonDiv">
              <a
                className="overviewButton btn btn-primary btn-lg firstTimeButton"
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
          {links ? (
            <div id="overviewButtonDiv">
              {links.map((link) => (
                <a
                  className="overviewButton btn btn-primary btn-lg firstTimeButton"
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
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function FeatureWidget({ itemsPerRow, features }): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={clsx("row", "")}>
          {features.map((props, idx) => (
            <Feature key={idx} {...props} itemsPerRow={itemsPerRow} />
          ))}
        </div>
      </div>
    </section>
  );
}
