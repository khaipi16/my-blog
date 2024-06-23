// import styles from './home.module.css';
import Universe from '../../images/universe.jpeg';
import { Image } from 'react-bootstrap';
// import { Button } from 'react-bootstrap';

// export const Home = () => {
//     return(
//         <div className={styles.container}>
//             <div className={styles.title}>
//                 <h2>The Journey Begins!</h2>
//             </div>
//             <div className={styles.content}>
//                 <div className={styles.imgContainer}>
//                     <Image src={Universe} alt='' fluid styles={{width: '100%', height: '100%', objectFit: 'cover', position: 'absolute' }}/>
//                 </div>
//                 <div className={styles.descript}>
//                     <p>Today marks a new beginning yet again, here we go again</p>
//                 </div>
   
//             </div>
//             <div className={styles.readMore}>
//                     <Button>Read More</Button>
//             </div>
//         </div>
//     );
// };

import React from 'react'
import styles from './home.module.css';
// import Image from 'next/image'


export const Home = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}><b>Genesis 2:7</b> | In the beginning...</h1>

            <div className={styles.blog}>
                <div className={styles.imgContainer}>
                    <Image src={Universe} alt="HomeImage" className={styles.image}/>
                </div>
                <div className={styles.textContainer}>
                    <h1 className={styles.postTitle}>This is the title</h1>
                    <p className={styles.descript}>
                        This is just some writing test scripts that I am using to see how 
                        this text displays on the landing page of this blog site.

                        Verses 1-3: The psalmist begins by acknowledging {"God's"} goodness to Israel, especially to those who are pure in heart. However, he admits his own struggle with envy when he sees the prosperity of the wicked.

                        Verses 4-12: The psalmist describes how the wicked seem to thrive, living without trouble and enjoying abundance, while they boast in their own arrogance and oppression of others.

                        Verses 13-16: The psalmist confesses his own struggle with understanding this apparent injustice, feeling that he has kept his heart pure in vain and his efforts to live righteously have not been rewarded.

                        Verses 17-20: The psalmist gains a new perspective when he enters the sanctuary of God. There, he realizes the ultimate fate of the wicked—they will be destroyed in an instant, swept away by sudden terrors.

                        Verses 21-26: The psalmist reflects on his own relationship with God, acknowledging that even though he may face trials and sufferings in this life, God is his strength and portion forever. He finds comfort and refuge in {"God's"} presence.

                        Verses 27-28: The psalmist concludes by affirming his trust in God, recognizing that those who are far from Him will perish, but for him, it is good to be near God and to put his trust in Him.
                        {/* <ul>
                            <li>Creation of Humanity:</li>
                            Unlike the rest of creation, which God simply spoke into existence, creation of Adam involves a more intimate act of forming him from the dust of the ground.

                            <li>Breathe of Life:</li>
                            What distinguishes Adam as a living being from the lifeless dust is the breathe of life from which he was formed, which leads to...---


                            <li>Unity of Body & Spirit:</li>
                            {"Adam's"} physical body is formed from dust, but it is the divine breath breathed into him by God that brings him to life imbuing him with a spiritual dimension.

                            <li>Dependence on God:</li>
                            The act of God breathing life into Adam emphasizes {"humanity's"} dependence on God for our existence, purpose, and vitality.
                        </ul> */}
                    </p>
                    <button className={styles.readMore}>Read More</button>
                </div>
            </div>
        </div>
    )
}

