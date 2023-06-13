import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import { signInWithEmailLink, updatePassword } from "firebase/auth";
import "react-toastify/dist/ReactToastify.css";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForSignIn"));
  }, []);

  const handleSubmit = async (e) => {
    debugger;

    e.preventDefault();
    if (!email || !password) {
      toast.error("email and password is required!");
      return;
    }
    if (password.length < 6) {
      toast.error("password must be 6 characters long");
      return;
    }
    try {
      const result = await signInWithEmailLink(
        auth,
        email,
        window.location.href
      );
      console.log(result);
      if (result.user.emailVerified) {
        window.localStorage.removeItem("emailForSignIn");
        let user = auth.currentUser;
        await updatePassword(user, password);
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user, "idTokenResult", idTokenResult);
        history.push("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled
      ></input>
      <br />
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        autoFocus
      ></input>
      <button type="submit" className="btn btn-raised">
        Complete Register
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Complete Registeration</h4>
          <ToastContainer />
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
