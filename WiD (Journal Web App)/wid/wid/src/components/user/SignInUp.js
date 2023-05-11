/* eslint-disable no-unused-vars */
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React from "react"
import { useLocation, useNavigate } from "react-router";
import { auth } from "../../firebase"
import GridLoader from "react-spinners/GridLoader";
import Main from "../Main";
export default function SignInUp() {
  //#region Variables and State
    const initialValues = { email: "", password: "" };
    const initialFireBaseValues = { invalidEmail: "", invalidUser: "", invalidPassword: ""};
    const [nothingEntered, setNothingEntered] = React.useState("");
    const [formValues, setFormValues] = React.useState(initialValues);
    const [fireBaseValues, setFireBase] = React.useState(initialFireBaseValues);
    const [fireBaseError, setFireBaseError] = React.useState(""); 
    const [passwordErrors, setPasswordErrors] = React.useState([]);
    const [createUserError, setCreateUserError] = React.useState("");
    const [authUser, setAuthUser] = React.useState(null);
    const [loading, setLoading] = React.useState(false); 
    const location = useLocation();
    const Navigate = useNavigate();
    //#endregion
    // Grabs username and password as they are typed.
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
      console.log(formValues);
    };
    const handleSignIn = (e) => {
      e.preventDefault();
      setFireBase(validateFireBase(fireBaseValues)); 
    };
    const validateFireBase = (values) => {
      
      if (!formValues.email === 0 || !formValues.password) {
        setNothingEntered("Please fill out both fields.");
      }
      else {
        setNothingEntered("");
        signInWithEmailAndPassword(auth, formValues.email, formValues.password)
            .then((userCredential) => {
              if (location.state?.from) {
                  Navigate(location.state.from);
              }
            })
            .catch((error) => {
                // eslint-disable-next-line eqeqeq
                if (error == "FirebaseError: Firebase: Error (auth/invalid-email).") {
                  setFireBaseError("Hmm... that email doesn't look quite right.");
                  setNothingEntered("");
                }
                // eslint-disable-next-line eqeqeq
                else if (error == "FirebaseError: Firebase: Error (auth/user-not-found).") {
                  setFireBaseError("We can't find a current user with that email.");
                  setNothingEntered("");

                }
                // eslint-disable-next-line eqeqeq
                else if (error == "FirebaseError: Firebase: Error (auth/wrong-password).") {
                  setFireBaseError("Incorrect email or password, double check your info.");
                  setNothingEntered("");
                }
                // eslint-disable-next-line eqeqeq
                else if (error == "FirebaseError: Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).") {
                  setFireBaseError("You've tried logging in too many times. Please try again later.");
                  setNothingEntered("");
                }
            })
      }
    }
    function handleSignUp(e) { 
      e.preventDefault();
      console.log(signUpErrorCatching(formValues.password).stringify)
      if (signUpErrorCatching(formValues.password)) {
        createUserWithEmailAndPassword(auth, formValues.email, formValues.password)
        .then((userCredential) => {
          console.log(userCredential);
        })
        .catch((error) => {
              // eslint-disable-next-line eqeqeq
              if (error == "FirebaseError: Firebase: Error (auth/email-already-in-use).") {
                setPasswordErrors([]);
                setCreateUserError("That email's already in use. Try using another or logging in instead.")
              }
        });
      }
  };
    function signUpErrorCatching(p) {
      let errors = [];
      if (p.length < 8) {
          errors.push("Your password must be at least 8 characters"); 
      }
      if (!/[a-zA-Z]/.test(p)) {
          errors.push("Your password must contain at least one letter.");
      }
      if (!/\d/.test(p)) {
          errors.push("Your password must contain at least one digit."); 
      }
      if (errors.length > 0) {
        setPasswordErrors(errors);
          return false;
      }
      return true;    
    }
    const reset = () => {
      setFireBaseError();
      setNothingEntered();
      setPasswordErrors();
      setCreateUserError();
    }
    function create(e) {
      reset(); 
      document.getElementById('signUpForm').style.display = "block";
      document.getElementById('signInForm').style.display = "none";
    }
    function login(e) {
      reset(); 
      document.getElementById('signUpForm').style.display = "none";
      document.getElementById('signInForm').style.display = "block";
    }
    // Listen for sign in
    React.useEffect(() => {
      const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
          setAuthUser(user);
      } else {
          setAuthUser(null);
      }
      });
      return () => {
      listen();
      };
      }, []);
    React.useEffect(() => {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 3000)
    }, []);
    React.useEffect(() => {
      if (!loading) {
        const cursor = document.getElementById('cursor');
        const littleCursor = document.getElementById('littleCursor');
  
        document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px'; 
        cursor.style.top = e.clientY + 'px'; 
        littleCursor.style.left = e.clientX + 'px'; 
        littleCursor.style.top = e.clientY + 'px'; });
        var h1Elements = document.querySelectorAll('h1');
        var inputs = document.querySelectorAll('input');
        var buttons = document.querySelectorAll('button');
        var elements = 0;
        for (var i = 0; i < h1Elements.length; i++) {
            h1Elements[i].addEventListener('mouseenter', function() {
                cursor.classList.add('large-cursor');
                littleCursor.classList.add('littleLarge-cursor')
            });
            h1Elements[i].addEventListener('mouseleave', function() {
                cursor.classList.remove('large-cursor');
                littleCursor.classList.remove('littleLarge-cursor')
            });
        }
      }
    }, [loading]);
      
  // JSX
  return (
    loading ? 
  <div className="loading">
    <GridLoader
      cssOverride={true}
      size={50}
      color={'#39ffc1'}
    />
    </div> 
    : authUser ? <Main /> :
  <div className="landingPage">
    <div id="cursor" className="cursor"></div>
    <div id="littleCursor" className="littleCursor"></div>
              <div className="landingPage--info">
                    <div className="line">
                    <h1 id="fancy--word" className="word">
                      <span className="letter">w</span>
                      <span className="letter">i</span>
                      <span className="letter">d</span>
                      </h1>
                      <div className="words">
                          journal your day.
                      </div>
                  </div> 
              </div>
              <div className="landingPage--login">
                  <form id="signInForm" onSubmit={handleSignIn} className="login--main--signIn">
                          <h1>Welcome back! <span><img height={'40px'} src="https://i.ibb.co/yFsLRfy/logo192.png" alt="logo192" border="0" /></span> <br/>Let's get you <span ><mark className="login--signIn">
                            <span className="signedIn">s</span>
                            <span className="signedIn">i</span>
                            <span className="signedIn">g</span>
                            <span className="signedIn">n</span>
                            <span className="signedIn">e</span>
                            <span className="signedIn">d</span>
                            <span className="signedIn"> </span>
                            <span className="signedIn">i</span>
                            <span className="signedIn">n</span>
                            </mark>
                          </span>
                          </h1>
                          <div>
                            <input  type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formValues.email}
                                    onChange={handleChange}>
                            </input>
                          </div>
                          <div>
                            <input  type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formValues.password}
                                    onChange={handleChange}>
                            </input>
                          </div>
                          {nothingEntered && <p className="invalid">{nothingEntered}</p>}
                          {fireBaseError && <p  className="invalid">{fireBaseError}</p>}
                          <div>
                            <button className="loginBtn">Log in</button>
                          </div>
                          <h3>New Here? <button className="createBtn" onClick={create}>Create an Account</button></h3>
                  </form>

                  <form id="signUpForm" onSubmit={handleSignUp} className="login--main--signUp">
                          <h1>Glad you're here :) <br/> Let's get you <span><mark className="login--signUp">
                            <span className="signUp">r</span>
                            <span className="signUp">e</span>
                            <span className="signUp">g</span>
                            <span className="signUp">i</span>
                            <span className="signUp">s</span>
                            <span className="signUp">t</span>
                            <span className="signUp">e</span>
                            <span className="signUp">r</span>
                            <span className="signUp">e</span>
                            <span className="signUp">d</span>
                            </mark>
                          </span>
                          </h1>
                          <div>
                            <input  type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formValues.email}
                                    onChange={handleChange}>
                            </input>
                          </div>
                          <div>
                            <input  type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formValues.password}
                                    onChange={handleChange}>
                            </input>
                          </div>
                          {passwordErrors && <p className="invalid">{passwordErrors[0]}</p>}
                          {createUserError && <p className="invalid">That email's already in use. Try using
                            another or <span className="createLogin" onClick={login}>logging in</span> instead</p>}
                          <div>
                            <button className="signUpBtn" type="submit">Sign me up</button>
                          </div>
                          <h3>Been here before?  <button className="createBtn" onClick={login}>Login</button></h3>
                  </form>
              </div>
      </div>
  );
}