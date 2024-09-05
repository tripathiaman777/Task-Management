// import {Link} from "react-router-dom";
// import {createRef, useState} from "react";
// import axiosClient from "../axios-client.js";
// import {useStateContext} from "../context/ContextProvider.jsx";

// export default function Signup() {
//   const nameRef = createRef()
//   const emailRef = createRef()
//   const passwordRef = createRef()
//   const passwordConfirmationRef = createRef()
//   const {setUser, setToken} = useStateContext()
//   const [errors, setErrors] = useState(null)

//   const onSubmit = ev => {
//     ev.preventDefault()

//     const payload = {
//       name: nameRef.current.value,
//       email: emailRef.current.value,
//       password: passwordRef.current.value,
//       password_confirmation: passwordConfirmationRef.current.value,
//     }
//     axiosClient.post('/signup', payload)
//       .then(({data}) => {
//         setUser(data.user)
//         setToken(data.token);
//       })
//       .catch(err => {
//         const response = err.response;
//         if (response && response.status === 422) {
//           setErrors(response.data.errors)
//         }
//       })
//   }

//   return (
//     <div className="login-signup-form animated fadeInDown">
//       <div className="form">
//         <form onSubmit={onSubmit}>
//           <h1 className="title">Signup for Free</h1>
//           {errors &&
//             <div className="alert">
//               {Object.keys(errors).map(key => (
//                 <p key={key}>{errors[key][0]}</p>
//               ))}
//             </div>
//           }
//           <input ref={nameRef} type="text" placeholder="Full Name"/>
//           <input ref={emailRef} type="email" placeholder="Email Address"/>
//           <input ref={passwordRef} type="password" placeholder="Password"/>
//           <input ref={passwordConfirmationRef} type="password" placeholder="Repeat Password"/>
//           <button className="btn btn-block">Signup</button>
//           <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
//         </form>
//       </div>
//     </div>
//   )
// }

import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";
import "../assets/SignInSignUp.css"; // Ensure the CSS is available
import Swal from "sweetalert2";

export default function Signup() {
  // State to manage form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    };

    try {
      const { data } = await axiosClient.post("/signup", payload);
      setUser(data.user);
      setToken(data.token);
    } catch (err) {
      const response = err.response;
      if (response && response.status === 422) {
        setErrors(response.data.errors);

        // Show SweetAlert2 with error messages
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          text: Object.values(response.data.errors).flat().join(", "), // Combine all error messages into a single string
        });
      }
    }
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100vw", 
            justifyContent: "center",
            display: "flex",
          }}
        >
          <h1 className="title">Create Account</h1>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update state on input change
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update state on input change
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update state on input change
          />
          <input
            type="password"
            placeholder="Repeat Password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)} // Update state on input change
          />
          <button className="btn btn-block" type="submit">
            Sign Up
          </button>
          <p className="message">
            Already registered? <Link to="/login">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
