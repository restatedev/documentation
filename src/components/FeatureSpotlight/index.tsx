import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  imgPath: string;
  description: JSX.Element;
};

export default function FeatureSpotlight({title, imgPath, description}): JSX.Element {
  return (
    <section className={styles.featurespotlight}>
      <div className="container">
        <div className="row">
          <div className={clsx('col col--12')}>
            <div className={styles.featureDiv}>
              <div className="text--center padding-horiz--md">
                <h2>{title}</h2>
                {description ? (
                    <p>{description}</p>
                ) : null}
                {imgPath ? (
                    <div className="text--center">
                      <img src={imgPath} />
                    </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
