import React from 'react'
import styles from './navbar.module.css'
import {NavLink} from 'react-router-dom'
import { useEffect } from 'react'
import { useUser } from '../../UserContext'


const Navbar = () => {

    const { userData, logout } = useUser(); // Get userData and logout function from context

    const handleLogout = () => {
        logout(); // Call logout method from context
    }

    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'> { /* shading and configurations for the navbar itself */}
            <div className='container'>
                <div className='left-container'>
                        {userData ? (
                            <div>
                            <NavLink onClick={handleLogout} to="/login" className={styles.link}>Logout</NavLink>
                            <span>|</span>
                            <NavLink to="/" className='navbar-brand'>| My Blog</NavLink>
                            </div>
                        ) : (
    
                            <div>
                            <NavLink to="/login" className={styles.link}>Login</NavLink>
                            <span>|</span>
                            <NavLink to="/" className='navbar-brand'>| My Blog</NavLink>
                            </div>
                        )}
                </div>
                <ul className={styles.menu}>
                    <li className={styles.item}>
                        <NavLink to='/write' className={styles.link}>Write</NavLink>
                    </li>
                    <li className={styles.item}>
                        <NavLink to='/recent-blogs' className={styles.link}>Recent Blogs</NavLink>
                    </li>
                    <li className={styles.item}>
                        <NavLink to='/projects' className={styles.link}>Projects</NavLink>
                    </li>
                    <li className={styles.item}>
                        <NavLink to="/about" className={styles.link}>About</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
