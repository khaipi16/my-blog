import styles from './home.module.css'
import Universe from '../../images/universe.jpeg'

export const Home = () => {
    return(
        <div className={styles.container}>
            <div className={styles.title}>
                <h2>The Journey Begins!</h2>
            </div>
            <div className={styles.content}>
                <div className={styles.imgContainer}>
                    <img src={Universe} alt='new beginning'/>
                </div>
                <div className={styles.descript}>
                    <p>Today marks a new beginning yet again, here we go again</p>
                </div>
                <div className={styles.readMore}>
                    <button >Read More</button>
                </div>
            </div>
        </div>
    );
};

