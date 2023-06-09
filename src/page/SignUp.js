import React, { useEffect } from "react";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification } from "antd";
import "../styles/SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import { CONSTANT, NOTIFICATION, ROUTERS } from "../constant/Constant";

const SignUp = () => {
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    // Notification Handler
    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description
        });
    };

    // get SignIn FOrm Data
    const onFinish = (values) => {
        openNotificationWithIcon("success", NOTIFICATION.SIGN_UP, NOTIFICATION.USER_SIGN_UP_MSG)
        localStorage.setItem("user", JSON.stringify(values));
        navigate(ROUTERS.SIGN_IN);
    };

    // Check Login Or Not
    useEffect(() => {
        const Token = localStorage.getItem("Token");
        if (Token) {
            navigate(ROUTERS.HOME);
        }
        // eslint-disable-next-line 
    }, []);

    return (
        <div className="main_container">
            {/* Notification */}
            {contextHolder}

            {/* SingUp Form */}
            <Form
                name="normal_login"
                className="login-form login_Form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <div>
                    <h2>{CONSTANT.SING_UP}</h2>
                    <p>{CONSTANT.ENJOY}</p>
                </div>
                <p className="title">{CONSTANT.FIRST_NAME}</p>
                <Form.Item
                    className="input"
                    name="firstname"
                    rules={[
                        {
                            required: true,
                            message: "Please input your firstname!",
                        },
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="First Name"
                    />
                </Form.Item>
                <p className="title">{CONSTANT.LAST_NAME}</p>
                <Form.Item
                    className="input"
                    name="lastname"
                    rules={[
                        {
                            required: true,
                            message: "Please input your lastname!",
                        },
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Last Name"
                    />
                </Form.Item>
                <p className="title">{CONSTANT.EMAIL}</p>
                <Form.Item
                    className="input"
                    name="email"
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
                <p className="title">{CONSTANT.PASSWORD}</p>
                <Form.Item
                    className="input"
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
                        {CONSTANT.SUBMIT}
                    </Button>
                </Form.Item>
                <p className="do_not_account">
                    {CONSTANT.ALREADY_ACCOUNT} <Link to={ROUTERS.SIGN_IN}><strong>{CONSTANT.SING_IN}</strong></Link>
                </p>
            </Form>
        </div>
    );
};

export default SignUp;
