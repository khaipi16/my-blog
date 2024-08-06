import React from 'react';
import styles from './about.module.css';
import linkedIn from '../../../images/linkedin.png';
import github from '../../../images/github.png';

const About = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>About Me</h1>
            
            <div className={styles.section}>
                <p>
                    My name is Cin Khai, but I go by my last name Khai as it is my culture. I am a Software Engineer with a background in Physics 
                    with over 3 years of experience in the tech industry. My journey in software development has equipped me with a strong 
                    foundation in programming, design, and debugging. I am passionate about leveraging technology to solve 
                    real-world problems and continuously learning new skills to stay updated with the latest trends.
                </p>
            </div>

            <div className={styles.section}>
                <h2>Experience</h2>
                <p>
                    Throughout my career so far, I have contributed to various projects, ranging from backend development to full-stack.
                    My expertise includes languages like Java, Python, JavaScript, SQL, and frameworks such as Spring, React, and Angular. 
                    I have a proven track record of producing high-quality software solutions in a fast-pace environment and delivering before deadlines.
                </p>
            </div>

            <div className={styles.section}>
                <h2>Future Aspirations</h2>
                <p>
                    With my career being still relatively early, I like to get more involve in Full-Stack development levaraging Java/Python, Spring, React/Angular, etc. 
                    I would eventually like to become an expert/specialize in either frontend or backend since you cannot know it all. 
                    My current goal for the future is to become a lead software architect, where I can mentor junior developers and 
                    contribute to the design and architecture of large-scale systems. I also plan to add more projects to the projects tab for this blog to learn but also maintain my technical skills.
                </p>
            </div>

            <div className={styles.section}>
                <h2>Interests and Hobbies</h2>
                <p>
                    Beyond my professional life, I like to lead an active lifestyle especially after staring at screens for a long period of time. 
                    I enjoy running, hiking, and playing soccer.  
                    These activities help me unwind and provide a fresh body and mind to help me keep a good work-life balance. 
                </p>
            </div>

            <div className={styles.section}>
                <h2>Contact</h2>
                <p>
                    Feel free to reach out via email at khaipi011@gmail.com. You can also connect with me on LinkedIn and look at my personal projects on GitHub using the links below.
                </p>
            </div>

            <div className={styles.socials}>
                <a href="https://www.linkedin.com/in/khai-pi/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                    <img className={styles.socialIcon} src={linkedIn} alt="LinkedIn" />
                </a>
                <a href="https://github.com/khaipi16" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                    <img className={styles.socialIcon} src={github} alt="GitHub" />
                </a>
            </div>
        </div>
    );
}

export default About;