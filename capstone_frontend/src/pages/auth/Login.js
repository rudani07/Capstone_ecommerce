import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOutlined, MailOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const createOrUpdateUser = async (authToken) => {
  return await axios.post(
    "http://localhost:8000/api/create-or-update-user",
    {},
    {
      headers: {
        authToken,
      },
    }
  );
};

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log(result.user);
      const idTokenResult = await result.user.getIdTokenResult();
      createOrUpdateUser(idTokenResult.token)
        .then((res) => console.log("create or update res", res))
        .catch();
      // dispatch({
      //   type: "LOGGED_IN_USER",
      //   payload: {
      //     email: result.user.email,
      //     token: idTokenResult.token,
      //   },
      // });
      // history.push("/");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider())
      .then(async (result) => {
        const idTokenResult = await result.user.getIdTokenResult();
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: result.user.email,
            token: idTokenResult.token,
          },
        });
        history.push("/");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          placeholder="your email address"
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        ></input>
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          placeholder="your password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <Button
        className="mb-3"
        type="primary"
        onClick={handleSubmit}
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Login with Email/Password
      </Button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <ToastContainer />
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Login</h4>
          )}
          {loginForm()}
          <Button
            className="mb-3"
            type="primary"
            onClick={googleLogin}
            block
            danger
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
          >
            Login with Google
          </Button>
          <Link to="/forgot/password" className="float-right text-danger">
            forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
