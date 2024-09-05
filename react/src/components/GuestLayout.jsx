// import {Navigate, Outlet} from "react-router-dom";
// import { useStateContext } from "../context/ContextProvider";

// export default function GuestLayout() {
//   const { user, token } = useStateContext();

//   if (token) {
//     return <Navigate to="/" />;
//   }

//   return (
//     <div id="guestLayout">
//       <Outlet />
//     </div>
//   );
// }

import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import "../assets/SignInSignUp.css"; // Ensure the CSS is available
import { useStateContext } from "../context/ContextProvider";

const GuestLayout = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const { user, token } = useStateContext();

  // Redirect to home if the user is already logged in
  if (token) {
    return <Navigate to="/" />;
  }

  // Handle button click to switch between SignIn and SignUp views
  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  return (
    <div>
      <div
        
        id="container"
      >
        {/* Use conditional rendering based on isSignUp */}
        <Outlet />
        {/* <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" onClick={handleSignInClick}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start your journey with us</p>
                            <button className="ghost" onClick={handleSignUpClick}>Sign Up</button>
                        </div>
                    </div>
                </div> */}
        {/* Use Outlet to render the current route's component */}
      </div>
    </div>
  );
};

export default GuestLayout;
