import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { initializeApp } from "firebase/app";
import Header from "./header";
import { FormValidation, FormValidationWithName } from "../utils/validate";
import { login } from "../utils/loginSlice";
import * as firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB_JCVc6FfhDDgPJE2EgBx4M4AiBrcQEAY",
  authDomain: "just4food-135fd.firebaseapp.com",
  projectId: "just4food-135fd",
  storageBucket: "just4food-135fd.firebasestorage.app",
  messagingSenderId: "924492667527",
  appId: "1:924492667527:web:d05fed5e2bd3ce377fb622",
  measurementId: "G-EPYY2X44K9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendOTP = async () => {
  console.log("Firebase auth object:", auth);
  let message = isLogin
    ? FormValidation(phoneRef.current.value)
    : FormValidationWithName(
        nameRef.current.value,
        emailRef.current.value,
        phoneRef.current.value
      );

  if (message) {
    setErrorMessage(message);
    return;
  }
  setErrorMessage("");

  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      { size: "invisible" },
      auth
    );
  }

  const recaptcha = window.recaptchaVerifier;

  try {
    const phoneNumber = "+91" + phoneRef.current.value;
    const result = await signInWithPhoneNumber(auth, phoneNumber, recaptcha);
    setConfirmationResult(result);
    setOtpSent(true);
  } catch (error) {
    setErrorMessage("Failed to send OTP: " + error.message);
  }
};

  const verifyOTP = async () => {
    if (!otp) {
      setErrorMessage("Please enter OTP");
      return;
    }

    try {
      await confirmationResult.confirm(otp);
      dispatch(
        login({
          phone: phoneRef.current.value,
          name: !isLogin ? nameRef.current.value : null,
        })
      );
      navigate("/");
    } catch (error) {
      setErrorMessage("Invalid OTP");
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      <Header />
      <div className="flex justify-center items-center h-full pt-24">
        <form className="bg-white p-6 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold text-center mb-4">
            Login or Create Account
          </h1>

          <div className="flex justify-center mb-4 space-x-4">
            <button
              type="button"
              className={`px-4 py-2 rounded ${
                isLogin ? "bg-orange-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded ${
                !isLogin ? "bg-orange-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Create Account
            </button>
          </div>

          {!isLogin && (
            <>
              <input
                type="text"
                ref={nameRef}
                placeholder="Full Name"
                className="w-full p-2 border mb-2 rounded"
              />
              <input
                type="email"
                ref={emailRef}
                placeholder="Email"
                className="w-full p-2 border mb-2 rounded"
              />
            </>
          )}

          <input
            type="tel"
            ref={phoneRef}
            placeholder="Mobile Number"
            className="w-full p-2 border mb-2 rounded"
          />

          {otpSent && (
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full p-2 border mb-2 rounded"
            />
          )}

          {errorMessage && (
            <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
          )}

          {!otpSent ? (
            <button
              type="button"
              onClick={sendOTP}
              className="w-full bg-orange-500 text-white py-2 rounded mb-2"
            >
              Send OTP
            </button>
          ) : (
            <button
              type="button"
              onClick={verifyOTP}
              className="w-full bg-green-500 text-white py-2 rounded mb-2"
            >
              Verify OTP
            </button>
          )}

          <div id="recaptcha-container"></div>
        </form>
      </div>
    </div>
  );
};

export default Login;