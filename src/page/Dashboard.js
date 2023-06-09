import React, { useEffect, useState } from "react";
import axiosInstance from "../axios/AxiosInstance";
import { Button, Popconfirm, Space, Table, Input, notification, Pagination } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import PersonModal from "../component/PersonModal";
import { CONSTANT, NOTIFICATION, ROUTERS } from "../constant/Constant";

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editData, setEditData] = useState({});
    const [Page, setPage] = useState(1);

    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    // Notification Handler
    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description
        });
    };

    // User API 
    const getUsers = async () => {
        setDataLoading(true);
        setIsEdit(false);
        await axiosInstance
            .get(`/users?page=${Page}`)
            .then((response) => {
                // Handle the response
                setUsers(response.data);
                setDataLoading(false);
            })
            .catch((error) => {
                // Handle the error
                console.error(error);
            });
    };

    // User Lists Api Call
    useEffect(() => {
        getUsers();
        let token = localStorage.getItem("Token");
        if (!token) {
            navigate(ROUTERS.SIGN_IN);
        }
        // eslint-disable-next-line 
    }, [Page]);

    // user Form Body Data 
    let userData;
    if (users) {
        userData = users?.map(({ id, email, gender, name, status }) => {
            return {
                key: id,
                name: name,
                email: email,
                gender: gender,
                status: status,
            };
        });
    }

    // Model Open handler
    const showModal = () => {
        setIsModalOpen(true);
    };

    // User current Data get handler
    const EditHandler = (data) => {
        console.log(data);
        setEditData({
            firstname: data.name.split(" ")[0],
            lastname: data.name.split(" ")[1],
            email: data.email,
            status: data.status,
            gender: data.gender,
            id: data.key,
        });
        setIsEdit(true);
        setIsModalOpen(true);
    };

    //User Delete
    const confirmDelete = async (idd) => {
        await axiosInstance
            .delete(`/users/${idd}`)
            .then((response) => {
                // Handle the response
                openNotificationWithIcon("success", NOTIFICATION.DELETE, NOTIFICATION.DELETE_MSG)
                getUsers();
            })
            .catch((error) => {
                // Handle the error
                openNotificationWithIcon("error", NOTIFICATION.DELETE, NOTIFICATION.DELETE_ERR)
            });
    };

    // Table Columns
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Gender",
            dataIndex: "gender",
            key: "gender",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Action",
            dataIndex: "",
            key: "x",
            render: (_, record) => (
                //Actions Buttons
                <Space size="middle">
                    <Link>
                        <Button onClick={() => EditHandler(record)}>
                            <EditOutlined />
                        </Button>
                    </Link>
                    <Popconfirm
                        placement="top"
                        title="Are You Sure!"
                        description="Confirm Delete"
                        onConfirm={() => confirmDelete(record.key)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>
                            <DeleteOutlined />
                        </Button>
                    </Popconfirm>
                    <Link to={`/postlist/${record.key}`}>
                        <Button>
                            <EyeOutlined />
                        </Button>
                    </Link>
                </Space>
            ),
        },
    ];

    //search 
    const onSearch = async (e) => {
        console.log(e.target.value, "search");
        setDataLoading(true)
        await axiosInstance
            .get(`/users?name=${e.target.value}`)
            .then((response) => {
                // Handle the response
                console.log(response, "response");
                setUsers(response.data)
            })
            .catch((error) => {
                // Handle the error
            });
        setDataLoading(false)
    };

    // pagination
    const pageChangeHandler = (page) => {
        console.log(page);
        setPage(page)
    }

    return (
        <div>
            {/* Notification */}
            {contextHolder}

            {/* Add - Edit form model */}
            {isModalOpen && (
                <PersonModal
                    setEditData={setEditData}
                    showModal={showModal}
                    setIsModalOpen={setIsModalOpen}
                    isModalOpen={isModalOpen}
                    setIsEdit={setIsEdit}
                    isEdit={isEdit}
                    editData={editData}
                    getUsers={getUsers}
                />
            )}

            {/* Add User Button */}
            <div className="person_list_search">
                <Button type="default" onClick={showModal}>
                    {CONSTANT.ADD_NEW_USER}
                </Button>
                <Input
                    allowClear
                    placeholder="input search text"
                    onChange={onSearch}
                    style={{
                        width: 200,
                    }}
                />
            </div>

            {/* User List Table */}
            <Table
                scroll={{ y: 300 }}
                columns={columns}
                dataSource={userData}
                loading={dataLoading}
                pagination={false}
            />

            {/* pagination */}
            <Pagination simple defaultCurrent={Page} total={2870} onChange={pageChangeHandler} defaultPageSize={10} />
        </div>
    );
};

export default Dashboard;
