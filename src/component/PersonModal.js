import React from "react";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification, Modal, Radio, Select } from "antd";
import axiosInstance from "../axios/AxiosInstance";
import { CONSTANT, NOTIFICATION } from "../constant/Constant";

const { Option } = Select;

const PersonModal = ({
  isModalOpen,
  setIsModalOpen,
  setIsEdit,
  isEdit,
  editData,
  setEditData,
  getUsers,
}) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  {/* Notification */ }
  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message: message,
      description: description
    });
  };

  // Handle ADD - EDIT person data Form
  const onFinish = async (values) => {
    let id = editData.id && editData.id;
    let curVal = {
      name: `${values.firstname} ${values.lastname}`,
      email: values.email,
      gender: values.gender,
      status: values.status,
    };
    if (isEdit) {
      // Edit data api call
      await axiosInstance
        .put(`/users/${id}`, { ...curVal })
        .then((response) => {
          // Handle the response
          getUsers();
          openNotificationWithIcon("success", NOTIFICATION.Edit, NOTIFICATION.EDIT_MSG)
        })
        .catch((error) => {
          // Handle the error
          openNotificationWithIcon("error", NOTIFICATION.Edit, NOTIFICATION.EDIT_ERR)
        });
    } else {
      // Add data api call
      await axiosInstance
        .post("/users", { ...curVal })
        .then((response) => {
          // Handle the response
          openNotificationWithIcon("success", NOTIFICATION.ADD, NOTIFICATION.ADD_MSG)
          getUsers();
        })
        .catch((error) => {
          // Handle the error
          openNotificationWithIcon("error", NOTIFICATION.ADD, NOTIFICATION.ADD_ERR)
        });
    }
    setIsModalOpen(false);
    setIsEdit(false);
  };

  // cancel Add Edit Model
  const handleCancel = () => {
    form.resetFields();
    setEditData({});
    setIsEdit(false);
    setIsModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        {!isEdit ? (
          <h3>{CONSTANT.ADD_NEW_USER}</h3>
        ) : (
          <h3>{CONSTANT.EDIT_USER}</h3>
        )}
        <hr />
        <Form
          name="normal_login"
          className="login-form login_Form"
          initialValues={editData ? editData : null}
          onFinish={onFinish}
        >
          <div className="input_first_last">
            <div>
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
            </div>
            <div>
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
            </div>
          </div>
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

          <div className="Input_gender_status">
            <div>
              <p className="title">{CONSTANT.GENDER}</p>
              <Form.Item
                name="gender"
                rules={[
                  {
                    required: true,
                    message: "Please pick an item!",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value="female">{CONSTANT.FEMALE}</Radio>
                  <Radio value="male">{CONSTANT.MALE}</Radio>
                  <Radio value="other">{CONSTANT.OTHER}</Radio>
                </Radio.Group>
              </Form.Item>
            </div>

            <div>
              <p className="title">{CONSTANT.STATUS}</p>
              <Form.Item
                name="status"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please select your status!",
                  },
                ]}
              >
                <Select
                  placeholder="Please select a status"
                  style={{
                    width: 220,
                  }}
                >
                  <Option value="inactive">{CONSTANT.INACTIVE}</Option>
                  <Option value="active">{CONSTANT.ACTIVE}</Option>
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="button_container">
            <Form.Item className="button_wrapper">
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button signIn_button"
              >
                {CONSTANT.SUBMIT}
              </Button>
            </Form.Item>
            <Form.Item className="button_wrapper">
              <Button
                type="primary"
                className="signIn_button signIn_button"
                onClick={handleCancel}
                htmlType="reset"
              >
                Cancel
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default PersonModal;
