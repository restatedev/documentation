import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  imgPath: string;
  description: JSX.Element;
  button1?: JSX.Element;
  link1?: string;
  button2?: JSX.Element;
  link2?: string;
};

export default function FeatureSpotlight({
  title,
  imgPath,
  imgSize,
  description,
  button1,
  link1,
  button2,
  link2,
}): JSX.Element {
  return (
    <section className={styles.featurespotlight}>
      <div className="container">
        <div className="row">
          <div className={clsx("col col--12")}>
            <div className={styles.featureDiv}>
              <div className="text--center padding-horiz--md padding-vert--lg">
                <h2>{title}</h2>
                {description ? <div>{description}</div> : null}
                {imgPath ? (
                  <div className="text--center">
                    <img src={imgPath} alt={title} />
                  </div>
                ) : null}
                {(button1) ? <a href={link1} target="_blank" className={styles.spotlightButton}>{button1}</a> : null}
                {(button2) ? <a href={link2} target="_blank" className={styles.spotlightButton}>{button2}</a> : null}
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
