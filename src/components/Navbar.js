import React, { useEffect, useState } from 'react'
import {NotificationManager} from 'react-notifications';

import {NavLink} from 'react-router-dom'

function Navbar(props) {
    // Create state for username and password
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // When the component mounts, check if a authToken cookie exists and set it.
    useEffect(
        () => {
            if(document.cookie.includes("authToken="))
            {
                let existingToken = document.cookie.split(";").find(cookie => cookie.startsWith("authToken=")).split("=")[1];
                props.setToken(existingToken);
            }
        },
        []
    )
    
    // Make authentication request and set authToken
    const signin = async (event) => {
        // Stop the page from refreshing
        event.preventDefault();

        try{
            // Make sign in request to API
            const signinResponse = await fetch(
                '/api/authenticate/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'username': username,
                        'password': password,
                    }),
                }
            );

            if(!signinResponse.ok){
                throw Error(signinResponse.statusText)
            }

            const responseJson = await signinResponse.json();


            // Save token response
            const expiryDate = new Date()
            expiryDate.setDate(expiryDate.getDate() + 1);
            document.cookie = "authToken=" + responseJson.token + ";expires=" + expiryDate.toUTCString() +";samesite=strict";
            props.setToken(responseJson.token);
        } catch (error) {
            NotificationManager.error('Failed to sign in');
        }

    }

    // Clear authToken
    const signout = () => {
        document.cookie = "authToken=";
        props.setToken("");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a href="#" className="navbar-brand">Simple Subscriber</a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-menu" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div id="navbar-menu" className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <NavLink className="nav-item nav-link" activeClassName="active" to="/" exact >My Feed</NavLink>
                        {props.token &&
                            <NavLink className="nav-item nav-link" activeClassName="active" to="/subscriptions">My Subscriptions</NavLink>
                        }
                    </ul>
                    <ul className="navbar-nav mr-right">
                        {props.token
                            ?<li className="nav-item">
                                <a 
                                    className="btn btn-danger"
                                    role="button"
                                    id="logout-button"
                                    onClick={() => signout()}
                                >
                                    Logout
                                </a>
                            </li>
                            :<li className="nav-item">
                                <div className="dropdown show">
                                    <a className="btn btn-success dropdown-toggle" role="button" id="login-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Login
                                    </a>

                                    <form className="dropdown-menu dropdown-menu-right p-4">
                                        <div className="form-group">
                                            <label htmlFor="email-input">Email address</label>
                                            <input 
                                                type="username"
                                                className="form-control"
                                                id="username-input"
                                                placeholder="Username"
                                                onChange={event => setUsername(event.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password-input">Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password-input"
                                                placeholder="Password"
                                                onChange={event => setPassword(event.target.value)}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            onClick={event => signin(event)}
                                        >Sign in</button>
                                    </form>
                                </div>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;