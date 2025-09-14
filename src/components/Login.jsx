import React from "react";
import Header from "./Header";
import { useState, useRef } from "react";
import { checkValidData } from "../utils/Validate";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const email = useRef(null);
  const password = useRef(null);
  const fullName = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleButtonClick = () => {
    console.log(email.current.value);
    console.log(password.current.value);
    const message = checkValidData(
      email.current.value,
      password.current.value,
      !isSignInForm ? fullName.current?.value : null
    );
    setErrorMessage(message);
    // console.log(message);

    if (message) return;
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;

          return updateProfile(user, {
            displayName: fullName.current.value,
            photoURL:
              "https://avatars.githubusercontent.com/u/145370048?s=48&v=4",
          });
        })
        .catch((error) => {
          setErrorMessage(error.message);
        })
        .then(() => {
          // console.log("User profile updated");
          const { uid, email, displayName, photoURL } = auth.currentUser; //update the value of sign in auth-info
          dispatch(
            addUser({
              uid: uid,
              email: email,
              displayName: displayName,
              photoURL: photoURL,
            })
          );
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          // console.log(user);
          // ...
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/0b0dad79-ad4d-42b7-b779-8518da389976/web/IN-en-20250908-TRIFECTA-perspective_0647b106-80e1-4d25-9649-63099752b49a_large.jpg"
          alt="Background"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute text-white w-[35%] m-3 space-y-4 flex flex-col  p-12 bg-black/80 my-32 mx-auto left-0 right-0 rounded-md"
      >
        <h2 className="font-bold text-4xl">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h2>
        {/* if signinform is false then only work */}
        {!isSignInForm && (
          <input
            ref={fullName}
            className="bg-[#1c2634] rounded-sm px-3 py-3 border font-xl outline-blue-500 font-semibold text-white"
            type="text"
            placeholder="Full Name"
          />
        )}
        <input
          ref={email}
          className="bg-[#1c2634] rounded-sm px-3 py-3 border font-xl outline-blue-500 font-semibold text-white"
          type="text"
          placeholder="Email or Phone"
        />
        <input
          ref={password}
          className="bg-[#1c2634] rounded-sm px-3 py-3 border font-xl outline-blue-500 font-semibold text-white"
          type="password"
          placeholder="Password"
        />
        <p className="text-red-700 font-semibold">{errorMessage}</p>
        <button
          onClick={handleButtonClick}
          className="py-2 cursor-pointer rounded-sm bg-red-700 text-white font-semibold text-xl hover:bg-red-800 transition"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <div className="flex justify-center font-semibold font-4xl">
          <h3>OR</h3>
        </div>
        <button className="bg-gray-500/50 cursor-pointer text-semibold text-lg  hover:bg-gray-500/60 py-2">
          Use a sign-in code
        </button>
        {/* <button className="underline cursor-pointer py-2 text-semibold text-lg">
          Forgot password?
        </button>{" "} */}
        <button
          type="button"
          onClick={toggleSignInForm}
          className="underline cursor-pointer py-2 text-semibold text-lg"
        >
          {isSignInForm
            ? "New to Netflix?Sign Up now."
            : "Already registered?Sign In now."}
        </button>
      </form>
    </div>
  );
};
export default Login;
