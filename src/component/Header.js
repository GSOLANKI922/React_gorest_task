import React from "react";
import "../styles/global.css";
import { Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { CONSTANT, ROUTERS } from "../constant/Constant";
const { Header } = Layout;

const CommonHeader = () => {
  const navigate = useNavigate();
  const loginUser = JSON.parse(localStorage.getItem("showUser"))
  const token = localStorage.getItem("Token");

  const listItem = [
    {
      key: 1,
      label: <Link to={ROUTERS.SIGN_IN}>{CONSTANT.SING_IN}</Link>,
    },
    {
      key: 2,
      label: <Link to={ROUTERS.SIGN_UP}>{CONSTANT.SING_UP}</Link>,
    },
  ];

  const logo = [
    {
      key: 1,
      label: `Welcome, ${loginUser && loginUser.firstname}`,
    },
    {
      key: 2,
      label: (
        <p
          onClick={() => {
            localStorage.removeItem("Token");
            localStorage.removeItem("showUser");
            navigate(ROUTERS.SIGN_IN);
          }}
        >
          {CONSTANT.LOGOUT}
        </p>
      ),
    },
  ];
  return (
    <Header className="header_Container">
      <div className="demo-logo Header_Logo">
        <Link to={token ? ROUTERS.HOME : ""} >
          <b>LOGO</b>
        </Link>
      </div>
      <div style={{ width: "20%" }}>
        <Menu
          style={{ width: "100%", backgroundColor: "#dddddd" }}
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={token ? logo : listItem}
        />
      </div>
    </Header>
  );
};

export default CommonHeader;
