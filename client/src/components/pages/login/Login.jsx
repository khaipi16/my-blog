import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useUser } from '../../../UserContext';
import styles from '../login/login.module.css'



export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { login } = useUser();

    const handleLogin = async (e) => {
        e.preventDefault();

        const login_url = 'http://127.0.0.1:5000/login';
        const login_url2 = 'https://52.91.80.202:5000/login';

        const response = await fetch(login_url, {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
        if (response.ok) {
            let userInfo = await response.json();
            console.log('userInfo', userInfo)

            
            login(userInfo.Data['user_info'], userInfo.Data['access_token']) // set user data, and token in context
            setRedirect(true)
        }
        else {
            alert("Invalid username or password.")
        }
    }
    
    if (redirect) {
        return <Navigate to={'/'} />
    }



    return (
        <div className={styles.content}>
            <div className={styles.container}>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title text-center">Login</h3>
                                    <form onSubmit={handleLogin}>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input type="email" className="form-control" 
                                                id="email" placeholder="Enter your email" 
                                                value={username}
                                                onChange={ev => setUsername(ev.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input type="password" className="form-control" 
                                                id="password" placeholder="Enter your password" 
                                                value={password}
                                                onChange={ev => setPassword(ev.target.value)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <button type="submit" className="btn btn-primary btn-block">Login</button>
                                            <div className="login-container">
                                                <span className={styles.message}>Don't have an account?</span>
                                                <Link to="/register" className={styles.register}> Register</Link>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    )
}