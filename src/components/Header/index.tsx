import { SignInButton } from '../SigninButton';
import styles from './style.module.scss';

export function Header(){
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="ig.news" />
                <nav>
                    <a className={styles.active}>Home</a>
                    <a>Pots</a>
                </nav>

                <SignInButton />
            </div>
        </header>
    );
}