import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUser } from '../../UserContext';
import styles from './navbar.module.css';

const Navbar = () => {
    const { userData, logout } = useUser();

    const handleLogout = () => {
        logout();
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <div className={`navbar-brand ${styles.brand}`}>
                    <div className={styles.login}>
                        {userData ? (
                            <NavLink onClick={handleLogout} to="/login" className={`nav-link ${styles.logout}`}>Logout</NavLink>
                        ) : (
                            <NavLink to="/login" className={`nav-link ${styles.logout}`}>Login</NavLink>
                        )}
                    </div>
                    <NavLink to="/" className={`navbar-brand ${styles.blogLink}`}>| My Blog</NavLink>
                </div>

                <div className="d-none d-lg-block">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink to='/write' className={`nav-link ${styles.link}`}>Write</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/recent-blogs' className={`nav-link ${styles.link}`}>Recent Blogs</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/all-blogs' className={`nav-link ${styles.link}`}>All Blogs</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/projects' className={`nav-link ${styles.link}`}>Projects</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/about" className={`nav-link ${styles.link}`}>About</NavLink>
                        </li>
                        {userData ? (
                            <li className="nav-item">
                                <NavLink onClick={handleLogout} to="/login" className={`nav-link ${styles.loginRight}`}>Logout</NavLink>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <NavLink to="/login" className={`nav-link ${styles.loginRight}`}>Login</NavLink>
                            </li>
                        )}
                    </ul>
                </div>

                <div className={`dropdown ms-auto d-lg-none ${styles.menuIcon}`}>
                    <button className={`btn dropdown-toggle ${styles.menuButton}`} type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className={`navbar-toggler-icon ${styles.menuButton}`}></span>
                    </button>
                    <ul className={`dropdown-menu dropdown-menu-end ${styles.menuItems}`} aria-labelledby="dropdownMenuButton">
                        <li><NavLink to='/write' className={`dropdown-item ${styles.link}`}>Write</NavLink></li>
                        <li><NavLink to='/recent-blogs' className={`dropdown-item ${styles.link}`}>Recent Blogs</NavLink></li>
                        <li><NavLink to='/all-blogs' className={`dropdown-item ${styles.link}`}>All Blogs</NavLink></li>
                        <li><NavLink to='/projects' className={`dropdown-item ${styles.link}`}>Projects</NavLink></li>
                        <li><NavLink to='/about' className={`dropdown-item ${styles.link}`}>About</NavLink></li>
                        {userData ? (
                            <li><NavLink onClick={handleLogout} to="/login" className={`dropdown-item ${styles.link}`}>Logout</NavLink></li>
                        ) : (
                            <li><NavLink to="/login" className={`dropdown-item ${styles.link}`}>Login</NavLink></li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;