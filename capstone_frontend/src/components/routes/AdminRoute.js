import React, { useEffect, useState } from "react";
import { Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../functions/auth";

const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  console.log(user);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("CURRENT ADMIN RESOURCE", res);
          setDone(true);
        })
        .catch((err) => {
          console.log("ADMIN ROUTE ERR", err);
          setDone(false);
        });
    }
  }, []);
  return done ? (
    <Route {...rest} />
  ) : (
    <h1 className="text-danger">
      <LoadingToRedirect />
    </h1>
  );
};
export default AdminRoute;