import React, { useEffect, useState } from 'react'
import { Header } from '../../components'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
import { ToggleSwitch } from 'flowbite-react';
import axios from 'axios';
import { Card } from 'primereact/card';
import { format } from 'date-fns';

import { Button, Table, Switch, Pagination, Modal, notification } from 'antd';
import { fetchAllUsers, fetchUpdateUser } from '../../data/api';




const Users = () => {

    const [Users, setUsers] = useState([]);
    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem("result"));

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'dd-MM-yyyy');
    };
    useEffect(() => {
        const fetchUsers = async () => {

            try {
                const result = JSON.parse(localStorage.getItem("result"))
                const res = await fetchAllUsers(result);
                const formattedUsers = res.data.users.map(user => ({
                    ...user,
                    date_of_birth: formatDate(user.date_of_birth)
                }));

                setUsers(formattedUsers);
                console.log(formattedUsers);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        console.log(Users);
        fetchUsers();
    }, []);


    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
    };

    const handleSwitchChange = (checked, user, token) => {
        Modal.confirm({
            title: "Xác nhận chặn tài khoản",
            content: checked
                ? "Bạn có muốn bỏ chặn tài khoản này?"
                : "Bạn có muốn chặn tài khoản này?",
            onOk: async () => {
                try {
                    user.isActive = checked;
                    await fetchUpdateUser(user, token, user._id);
                    setUsers((prevUsers) => {
                        return prevUsers.map((u) => (u._id === user._id ? user : u));
                    });

                    notification.success({
                        message: "Thành công",
                        description: `Thay đổi thành công! ${checked ? "Tài khoản đã hoạt động bình thường" : "Tài khoản đã bị chặn"
                            }`,
                        placement: "top",
                    });
                } catch (error) {
                    console.log(error);
                    notification.error({
                        message: "Lỗi",
                        description: "Có lỗi xảy ra khi thay đổi trạng thái tài khoản",
                        placement: "top",
                    });
                }
            },
            onCancel() {
                console.log("Cancel");
            },
            okButtonProps: {
                style: {
                    backgroundColor: "#46B5C1",
                    borderColor: "#46B5C1",
                },
            },
            cancelButtonProps: {
                style: {
                    backgroundColor: "#FF4D4F",
                    borderColor: "#FF4D4F",
                    color: "#FFFFFF",
                },
            },
            cancelText: "Đóng",
            okText: "Đồng ý",
        });
    };
    const columns = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '25%',
        },
        {
            title: 'Họ và tên',
            dataIndex: 'full_name',
            key: 'full_name',
            ellipsis: true,
            width: '10%',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.full_name.localeCompare(b.full_name),
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'date_of_birth',
            key: 'date_of_birth',
            ellipsis: true,
            width: '10%',
            sorter: (a, b) => new Date(a.date_of_birth) - new Date(b.date_of_birth),
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            ellipsis: true,
            width: '10%',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            ellipsis: true,
            width: '20%',
        },
        {
            title: 'Vai trò',
            dataIndex: 'role_name',
            key: 'role_name',
            ellipsis: true,
            width: '10%',
            sorter: (a, b) => a.role_name.localeCompare(b.role_name),

        },
        {
            title: 'Tình trạng',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (text, record) => (
                <Switch
                    checked={record.isActive}
                    style={{ backgroundColor: record.isActive ? "#4A99FF" : "#898989" }}
                    onChange={(checked) => handleSwitchChange(checked, record, token)}
                />
            ),
            width: '10%',
            sorter: (a, b) => a.isActive - b.isActive,

        },
    ];

    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: '120vh' }}>
            <Card title="Tất cả người dùng" subTitle="" footer="" header="" className="" style={{ width: '90%', height: '90vh', marginTop: '50px' }}>
                <div className="flex justify-between items-center mb-4">
                    <Button
                        type="primary"
                        size="large"
                        style={{ backgroundColor: "#46B5C1", height: "100%" }}
                        onClick={() => navigate("/add-staff")}
                    >
                        Thêm nhân viên
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={Users}
                    pagination={{
                        current: currentPage,
                        pageSize: pageSize,
                        total: Users.length,

                    }} scroll={{ x: '100%' }}
                    onChange={handleTableChange}
                    style={{ overflowX: 'auto', flexGrow: 1 }}
                    rowKey="email"
                />
                {/* <div style={{ padding: '10px 0', textAlign: 'center', marginTop: 'auto' }}>
            <Pagination defaultCurrent={1} total={Users.length} defaultPageSize={6}/>;
            </div> */}
            </Card>
        </div>
    )
}

export default Users