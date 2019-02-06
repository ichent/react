import * as React from 'react';
import * as styles from './index.css';

// tslint:disable:max-line-length
export const NoMessages: React.SFC = () => (
    <div className={styles.container}>
        <div className={styles.ico}>
            <svg width="90" height="87" viewBox="0 0 90 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M20.0183 79.6964L24.4802 69.5174L20.5911 66.8035C11.1957 60.2472 5.80645 50.2348 5.80645 40.0012C5.80645 21.7648 22.7926 5.78182 45 5.78182C67.2074 5.78182 84.1936 21.7648 84.1936 40.0012C84.1936 58.2376 67.2074 74.2206 45 74.2206C42.8734 74.2206 40.7581 74.0636 38.7212 73.7543C38.4302 73.7101 38.1408 73.6628 37.8533 73.6124L36.241 73.3299L20.0183 79.6964ZM36.8471 79.3068L18.5294 86.4954C18.1059 86.6113 17.5765 86.7273 17.1529 86.7273C15.9882 86.7273 14.9294 86.1475 14.0824 85.22C13.0496 83.8629 12.722 81.9542 13.3943 80.3548C13.4112 80.3144 13.4288 80.2743 13.4471 80.2343L17.2588 71.5384C6.45639 64.0003 0 52.2887 0 40.0012C0 17.9989 20.1928 0 45 0C69.8072 0 90 17.9989 90 40.0012C90 62.0035 69.8072 80.0024 45 80.0024C42.2471 80.0024 39.4941 79.7705 36.8471 79.3068Z" fill="#237CF9"/>
            </svg>
        </div>
        <div className={styles.title}>Онлайн помощник</div>
        <div className={styles.text}>Мгновенные ответы на ваши вопросы</div>
    </div>
);
