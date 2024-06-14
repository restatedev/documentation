import React from 'react';
import styles from './styles.module.css';

export default function SdkNavigationItem(props: {
    sdk: string;
    label: string;
}): JSX.Element | null {
    return (
        <button className={styles.sdkButton}>
        <a onClick={() => {
            const currentUrl = new URL(window.location.href);
            console.log(props)
            currentUrl.searchParams.set('sdk', props.sdk);

            // go to that URL
            window.location.href = currentUrl.toString();
        }}
                type="button">
            {props.label}
        </a>
        </button>
    );
}