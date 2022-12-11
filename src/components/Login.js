import React, { useState, useEffect } from 'react';
import {Link } from 'react-router-dom';
import {getDatabase, ref, set as firebaseSet, onValue, push as firebasePush} from 'firebase/database';
import {StyledFirebaseAuth} from 'react-firebaseui';
import {getAuth, EmailAuthProvider, GoogleAuthProvider} from 'firebase/auth';

export default function Login({update}) {
    const [email, updateEmail] = useState("");
    const [password, updateP] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const auth = getAuth();

    const configObj = {
      signInOptions: [
        {
          provider: EmailAuthProvider.PROVIDER_ID,
          requireDisplayedName: true,
        },
        {
          provider: GoogleAuthProvider.PROVIDER_ID
        }
      ],
      signInFlow: 'popup',
      callbacks: {
        signInSuccessWithAuthResult: () => false
      },
      credentialHelper: "none"
    }

    useEffect(() => { 
      const db = getDatabase(); //"the database"
      const allMessageRef = ref(db, "Info");

      //addEventLister("databse value change")
    //returns the instructions how to turn it off
    const offFunction = onValue(allMessageRef, (snapshot) => {
      const valueObj = snapshot.val();
      const objKeys = Object.keys(valueObj);

      console.log(valueObj);

     updateEmail(valueObj.email); //needs to be an array
    })

    //the useEffect callback returns...
    function cleanup() {
      console.log("component is being removed");
      console.log("turn out the lights");
      offFunction();
    }

    return cleanup; 
    }, []);

    const db = getDatabase(); //"the database"
    const allMessageRef = ref(db, "Info");
    const addUser = {
      "email": email,
      "password": password
    }
    firebaseSet(allMessageRef, addUser);

    const emailChange = (event) => {
        const email = event.target.value;
        updateEmail(email);
        setSubmitted(false);
    }

    const pwChange = (event) => {
        const password = event.target.value;
        updateP(password);
        setSubmitted(false);
      }
    
      const handleSubmit = (event) => {
        event.preventDefault();
        if (email === '' || password === '') {
          setError(true);
          saveStateToLocalStorage();
        } else {
          setSubmitted(true);
          setError(false);
        }
        update(email, password);
      };
    
      const successMessage = () => {
        return (
          <div
            className="success"
            style={{
              display: submitted ? '' : 'none',
            }}>
            <h1>User {email} successfully login!!</h1>
          </div>
        );
      };

      const errorMessage = () => {
        return (
          <div
            className="error"
            style={{
              display: error ? '' : 'none',
            }}>
            <h1>Please enter all the fields</h1>
          </div>
        );
      };
    
    const state = [{email: {email}, password: {password}}];

    const saveStateToLocalStorage = () => { 
          localStorage.setItem('state', JSON.stringify({state})); 
        };

    return (
        <div className="container-fluid">
        <header>
            <h1>Log Into Your Account</h1>
        </header>

        <main className="login-profile">
            <form id="login">
              
                <div className="container">
                    <label key="email" id="label-email" onChange={emailChange}>Email</label>
                    <input type="email"
                        id="email"
                        placeholder="Enter Your Email" 
                        value={email} 
                        onChange={emailChange}/>
                    {submitted && !email &&
                        <div className="invalid-feedback">Email is required</div>
                    }
                </div>

                <div className="container">
                    <label key="password" id="label-password" onChange={pwChange}>Password</label>
                    <input type="password"
                        id="password"
                        placeholder="Enter your password" 
                        value={password} 
                        onChange={pwChange}/>
                    {submitted && !password &&
                        <div className="invalid-feedback">Password is required</div>
                    }
                </div>

                <div className="container">
                    <button id="Login" type="login" value="login" onClick={handleSubmit}><Link to='/profile'>
                    Login
                    </Link></button>
                </div>
                
                <StyledFirebaseAuth firebaseAuth={auth} uiConfig={configObj}/>
            </form>
        </main>

        <div className="messages">
            {errorMessage()}
            {successMessage()}
        </div>

    </div>

    )
}