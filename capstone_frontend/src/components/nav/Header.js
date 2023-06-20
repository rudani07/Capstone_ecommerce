import React, { useState } from "react";
import {
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  SettingOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
const { SubMenu, Item } = Menu;

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const history = useHistory();
  const logout = async () => {
    try {
      await auth.signOut(auth);
      dispatch({
        type: "LOGOUT",
        payload: null,
      });
      history.push("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const [current, setCurrent] = useState("home");

  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      {!user && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">Register</Link>
        </Item>
      )}

      {!user && (
        <Item key="login" icon={<UserOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Item>
      )}

      {user && (
        <SubMenu
          icon={<SettingOutlined />}
          title={user.email && user.email.split("@")[0]}
          className="float-right"
        >
          {user && user.role === "subscriber" && (
            <Item>
              <Link to="/user/history">Dashboard</Link>
            </Item>
          )}
          {user && user.role === "admin" && (
            <Item>
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}
          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;
