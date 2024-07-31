import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import styles from "./login.module.css";

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDOB] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        const register_url = 'http://127.0.0.1:5000/register';
        const register_url2 = 'https://52.91.80.202:5000/register'

        try {
            const response = await fetch(register_url, {
                method: 'POST',
                body: JSON.stringify({ firstName, lastName, dob, email, password }),
                headers: { 'Content-Type': 'application/json' },
            });
    
            if(response.ok) {
                alert('Successfully registered!');
                setRedirect(true)
            }
            else if(response.status === 409) {
                alert('The email address you entered is already registered.')
            }             
            else {

                // Handle non-success status codes (e.g., 400 Bad Request)
                alert('Failed to register. Please check your input.');

            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Registration error:', error);
            alert('An error occurred while registering. Please try again later.');
        }
    }

    if(redirect) {
        return <Navigate to={'/'} />
    }


    return (
        <div className="content">
            <div className={styles.container}>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title text-center">Register</h3>
                                    <form onSubmit={handleRegister}>
                                        <div className="mb-3">
                                            <label htmlFor="text" className="form-label">First name</label>
                                            <input type="text" 
                                                className="form-control" 
                                                placeholder="Enter your first name"
                                                value={firstName} 
                                                onChange={ev => setFirstName(ev.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="text" className="form-label">Last name</label>
                                            <input type="text" 
                                                className="form-control" 
                                                placeholder="Enter your last name"
                                                value={lastName} 
                                                onChange={ev => setLastName(ev.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Day of Birth</label>
                                            <input type="date" 
                                                className="form-control" 
                                                placeholder="Enter your date of birth"
                                                value={dob} 
                                                onChange={ev => setDOB(ev.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input type="email" 
                                                className="form-control" 
                                                placeholder="Enter your email"
                                                value={email} 
                                                onChange={ev => setEmail(ev.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input type="password" className="form-control" 
                                                placeholder="Enter your password" 
                                                value={password}
                                                onChange={ev => setPassword(ev.target.value)}
                                                required
                                            />
                                        </div>
                                        <div>  
                                            <button type="submit" className="btn btn-primary btn-block">Register</button>
                                            <div className="login-container">
                                                <span className={styles.message}>Already have an account?</span>
                                                <Link to="/login" className={styles.link}> Login</Link>
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

export default Register