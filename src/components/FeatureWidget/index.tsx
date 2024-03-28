import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  iconPath: string;
  description: JSX.Element;
};


function Feature({title, iconPath, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
          <img className={styles.featureSvg} src={iconPath} />
      </div>
      <div className="text--center padding-horiz--md">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function FeatureWidget({ features }): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {features.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
