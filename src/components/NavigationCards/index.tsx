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
            <div className={styles.feature}>
                <div className={(category === "first_time") ? styles.circleFirstTime : styles.circleFamiliar}>{stepLabel}</div>
                <h4 className="margin--xs">{title}</h4>
                <p className={styles.description}><i>{description}</i></p>
            </div>
        </div>
    );
}

export default function NavigationCards({ features }): JSX.Element {
    return (
        <section className={styles.features}>
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