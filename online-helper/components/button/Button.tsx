import * as React from 'react';
import * as styles from './index.css';

export interface IButtonProps {
    status: 'online' | 'offline';
    count: number | undefined;
    text: string;
    onClick(): void;
}

// tslint:disable:max-line-length
export const Button: React.SFC<IButtonProps> = (props) => (
    <div className={styles.positionWrapper}>
        <div className={styles.button} onClick={props.onClick}>
            <div className={styles.status}>
                {props.status === 'online'
                    ? (
                        <svg className={styles.icon} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.87647 12.373L2.24118 13.877C2.11765 14.1578 2.17059 14.4987 2.34706 14.7393C2.48824 14.8997 2.6647 15 2.85882 15C2.92941 15 3.01765 14.9799 3.08824 14.9599L6.14118 13.7166C6.58235 13.7968 7.04118 13.8369 7.5 13.8369C11.6294 13.8369 15 10.7286 15 6.91845C15 3.10829 11.6294 0 7.5 0C3.37059 0 0 3.10829 0 6.91845C0 9.04412 1.07647 11.0695 2.87647 12.373Z" fill="#9BEBB7" />
                        </svg>
                    )
                    : (
                        <svg className={styles.icon} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.87647 12.373L2.24118 13.877C2.11765 14.1578 2.17059 14.4987 2.34706 14.7393C2.48824 14.8997 2.6647 15 2.85882 15C2.92941 15 3.01765 14.9799 3.08824 14.9599L6.14118 13.7166C6.58235 13.7968 7.04118 13.8369 7.5 13.8369C11.6294 13.8369 15 10.7286 15 6.91845C15 3.10829 11.6294 0 7.5 0C3.37059 0 0 3.10829 0 6.91845C0 9.04412 1.07647 11.0695 2.87647 12.373Z" fill="#589DFF" />
                        </svg>
                    )
                }
            </div>
            <div className={styles.text}>{props.text}</div>
        </div>
        {props.count
            ? (
                <div className={styles.messagesCounter}>
                    <span className={styles.messagesCounterNumber}>{props.count}</span>
                </div>
            )
            : null
        }
    </div>
);
