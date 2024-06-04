import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: JSX.Element;
};

export default function TwoColumnText({ features }): JSX.Element {
  const left = features[0] as { title: string; description: string };
  const right = features[1] as { title: string; description: string };
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={clsx('row', 'featureRow')}>
          <div className={clsx('col col--4 margin-vert--lg')}>
            <div className={styles.featureDivBlue}>
              <div className="text--right padding-horiz--none">
                <h6 className="color-blue">{left.title}</h6>
                <p className="color-blue">{left.description}</p>
              </div>
            </div>
          </div>
          <div className={clsx('col col--4 margin-vert--lg')}>
            <div className={styles.featureDiv}>
              <div className="text--left padding-horiz--none">
                <h6>{right.title}</h6>
                <p>{right.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
