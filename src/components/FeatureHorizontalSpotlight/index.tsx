import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  imgPath: string;
  description: JSX.Element;
};

export default function FeatureHorizontalSpotlight({title, imgPath, description}): JSX.Element {
  return (
    <section className={styles.featurespotlight}>
      <div className="container">
        <div className="row padding-vert--lg">
          <div className={clsx('col col--8')}>
            <div className={styles.featureDiv}>
                <img src={imgPath} />
            </div>
          </div>
          <div className={clsx('col col--4')}>
            <div className={styles.featureDiv}>
              <h2>{title}</h2>
              {description ? (
                  <p>{description}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
