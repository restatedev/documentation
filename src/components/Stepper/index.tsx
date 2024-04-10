import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function Step({title, stepLabel, children}): JSX.Element {
    return (
        <div className="container">
            <div className={clsx('row')}>
                <div className={clsx('col', styles.stephead)}>
                    <div className={styles.circle}>{stepLabel}</div>
                    <h6 className={styles.title}>{title}</h6>
                </div>
            </div>
            <div className={clsx('row')}>
                <div className={clsx('col')}>
                    <div className={styles.feature}>
                        <p className={styles.description}>{children}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
