import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
    title: string;
    category: string
    stepLabel: string;
    description: JSX.Element;
    link?: string;
};


function NavigationCard({title, category, stepLabel, description, link}: FeatureItem) {
    const cardContent = (
            <div className={(category === "first_time") ? styles.featureFirstTime : styles.featureFamiliar}>
                <div className={(category === "first_time") ? styles.circleFirstTime : styles.circleFamiliar}>{stepLabel}</div>
                <h6 className={styles.title}>{title}</h6>
                <div className={styles.description}>{description}</div>
            </div>
        );

    return (
        link ? (
            <a href={link} style={{textDecoration: "none"}} >
                {cardContent}
            </a>
        ) : (
            <>
                {cardContent}
            </>
        )
    );
}

export default function NavigationCards({ features }): JSX.Element {

    const colSize = 12 / features.length;
    return (
        <section>
            <div className="container">
                <div className="row">
                        {features.map((props, idx) => (
                            <div className={clsx(`col col--${colSize} margin-vert--md`)} key={props.title}>
                                <NavigationCard key={idx} {...props} />
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
}