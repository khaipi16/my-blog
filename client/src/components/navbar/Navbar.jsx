import React from 'react'
import styles from './navbar.module.css'
import {NavLink} from 'react-router-dom'
// import SelectTheme from '../selectTheme/SelectTheme'
// import AuthLinks from '../authLinks/AuthLinks'


const Navbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.social}>
            </div>
            <div className={styles.name}>Khai Pi</div>
            <div className={styles.links}>
                <NavLink href="/" className={styles.link}>Home</NavLink>
                <NavLink href="/contact" className={styles.link}>Contact</NavLink>
                <NavLink href="/about" className={styles.link}>About</NavLink>
            </div>

        
        </div>
    )
}

export default Navbar