import { signIn, useSession } from 'next-auth/client';
import styles from './style.module.scss';

interface SubscribeBittonProps{
    priceId: string;
}

export function SubscribeBitton({priceId}: SubscribeBittonProps){
    const [session] = useSession();


    function handleSubcribe (){
        if(!session){
            signIn('github');
            return;
        }

        
    }
    return(
        <button
        type="button"
        className={styles.subscribeButton}
        onClick={handleSubcribe}
        >
            Subscribe now
        </button>
    );
}