import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
    title: string;
    category: string
    stepLabel: string;
    description: JSX.Element;
};


function NavigationCard({title, category, stepLabel, description}: FeatureItem) {
    return (
        <div className={clsx('col col--4')}>
            <div className={(category === "first_time") ? styles.featureFirstTime : styles.featureFamiliar}>
                <div className={(category === "first_time") ? styles.circleFirstTime : styles.circleFamiliar}>{stepLabel}</div>
                <h6 className={styles.title}>{title}</h6>
                <p className={styles.description}>{description}</p>
            </div>
        </div>
    );
}

export default function NavigationCards({ features }): JSX.Element {
    return (
        <section>
            <div className="container">
                <div className="row">
                    {features.map((props, idx) => (
                        <NavigationCard key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}