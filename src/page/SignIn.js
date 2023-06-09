import React, { useEffect } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification } from "antd";
import "../styles/SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import { CONSTANT, NOTIFICATION, ROUTERS, TOKEN } from "../constant/Constant";

const SignIn = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const user = JSON.parse(localStorage.getItem("user"));
  const Token = TOKEN;

  // Notification Handler
  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message: message,
      description: description
    });
  };

  // get SignUp Form Data
  const onFinish = (values) => {
    if (values.email === user.email && values.password === user.password) {
      openNotificationWithIcon("success", NOTIFICATION.LOGIN, NOTIFICATION.LOGIN_MSG)
      localStorage.setItem("Token", Token);
      localStorage.setItem("showUser", JSON.stringify(user));
      setTimeout(() => {
        navigate(ROUTERS.HOME);
      }, 1000)
    } else {
      openNotificationWithIcon("error", NOTIFICATION.LOGIN, NOTIFICATION.LOGIN_ERROR_MSG)
    }
  };

  // Check Login Or Not
  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      navigate(ROUTERS.HOME);
    }
    // eslint-disable-next-line 
  }, []);

  return (
    <div className="main_container">
      {/* Notification */}
      {contextHolder}

      {/* SingIn Form */}
      <Form
        name="normal_login"
        className="login-form login_Form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <div>
          <h2>{CONSTANT.SING_IN}</h2>
          <p>{CONSTANT.ENTER_BELOW_DETAILS}</p>
        </div>
        <h4 className="title">{CONSTANT.EMAIL}</h4>

        <Form.Item
          name="email"
          className="input"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <h4 className="title">{CONSTANT.PASSWORD}</h4>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button signIn_button"
          >
            {CONSTANT.SING_IN}
          </Button>
        </Form.Item>
        <p className="do_not_account">
          {CONSTANT.DO_NOT_ACCOUNT} <Link to={ROUTERS.SIGN_UP}><strong>{CONSTANT.SING_UP}</strong></Link>
        </p>
      </Form>
    </div>
  );
};

export default SignIn;
