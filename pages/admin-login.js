import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../src/app/firebase";
import { db } from "../src/app/firebase";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import BigHeader from "@/app/components/BigHeader/BigHeader";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const toggleForm = () => setIsLogin(!isLogin);

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "This email address is already in use.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/operation-not-allowed":
        return "This operation is not allowed. Please contact support.";
      case "auth/weak-password":
        return "The password is too weak. Please enter a stronger password.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (!isLogin && !passwordRegex.test(password)) {
      setError({ password: "Password must meet the requirements." });
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await setDoc(doc(db, "Profile", userCred.user.uid), {
          email: email,
          identity: "researcher",
        });
      }
      router.push("/admin-dashboard");
    } catch (error) {
      console.error("Authentication failed: ", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <BigHeader>Admin {isLogin ? "Login" : "Signup"}</BigHeader>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md border border-2 border-primary">
        <h1 className="text-lg font-bold mb-4 text-center">
          {isLogin ? "Login" : "Signup"}
        </h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border rounded w-full py-2 px-3 text-black mb-4"
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border rounded w-full py-2 px-3 text-black mb-4"
            />
          </div>
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4"
            disabled={loading}
          >
            {loading
              ? isLogin
                ? "Logging in..."
                : "Signing up..."
              : isLogin
              ? "Login"
              : "Signup"}
          </button>
        </form>
      </div>
      <span className="my-5 text-gray-500">
        Are you a researcher?{" "}
        <a href="/login" className="text-primary hover:text-primaryDarker">
          Login with your Research Organization!
        </a>
      </span>
    </div>
  );
};

export default AuthForm;
