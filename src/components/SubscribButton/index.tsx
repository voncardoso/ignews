import styles from './style.module.scss';

interface SubscribeBittonProps{
    priceId: string;
}

export function SubscribeBitton({priceId}: SubscribeBittonProps){
    return(
        <button
        type="button"
        className={styles.subscribeButton}
        >
            Subscribe now
        </button>
    );
}