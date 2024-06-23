
import styles from '../login/login.module.css'

export const Login = () => {



    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                {/* <div className={styles.socialButton} onClick={() =>signIn('google')}>Sign in with Google</div> */}
                <div className={styles.socialButton}>Sign in with GitHub</div>
                <div className={styles.socialButton}>Sign in with Facebook</div>
            </div>
        </div>
    )
}