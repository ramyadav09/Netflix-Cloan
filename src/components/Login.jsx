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
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const email = useRef(null);
  const password = useRef(null);
  const fullName = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    const message = checkValidData(
      email.current.value,
      password.current.value,
      !isSignInForm ? fullName.current?.value : null
    );
    setErrorMessage(message);

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
            photoURL: USER_AVATAR,
          });
        })
        .catch((error) => {
          setErrorMessage(error.message);
        })
        .then(() => {
          const { uid, email, displayName, photoURL } = auth.currentUser;
          dispatch(
            addUser({
              uid: uid,
              email: email,
              displayName: displayName,
              photoURL: photoURL,
            })
          );
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
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
        <img src={BG_URL} alt="Background" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute text-white w-[35%] m-3 space-y-4 flex flex-col  p-12 bg-black/80 my-32 mx-auto left-0 right-0 rounded-md"
      >
        <h2 className="font-bold text-4xl">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h2>
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
        <div className="flex space-x-1 py-2 text-semibold text-lg">
          <p>{isSignInForm ? "New to Netflix?" : "Already registered? "}</p>
          <button
            type="button"
            onClick={toggleSignInForm}
            className="underline cursor-pointer"
          >
            {isSignInForm ? "Sign Up now." : "Sign In now."}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
