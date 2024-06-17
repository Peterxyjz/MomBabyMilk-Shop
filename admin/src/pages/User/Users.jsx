import React, { useEffect, useState } from 'react'
import { Header } from '../../components'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
import { Button, ToggleSwitch } from 'flowbite-react';
import axios from 'axios';
import { Card } from 'primereact/card';
import { format } from 'date-fns';

import { Table, Switch, Pagination } from 'antd';




const Users = () => {

    const [Users, setUsers] = useState([]);
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'dd-MM-yyyy');
    };
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:4000/users/get-all-user", 
                    {
                        headers: {
                            Authorization: `Bearer ${JSON.parse(localStorage.getItem("result")).access_token}`
                        },             
                    }
                );
                const formattedUsers = res.data.users.map(user => ({
                    ...user,
                    date_of_birth: formatDate(user.date_of_birth)
                }));

                setUsers(formattedUsers);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        console.log(Users);
        fetchUsers();
    }, []);

    // const onToggleChange = (user) => {
    //     const updatedUsers = Users.map(u => {
    //         if (u.email === user.email) {
    //             return { ...u, status: !u.status };
    //         }
    //         return u;
    //     });
    //     setUsers(updatedUsers);
    // };

    // const toggleSwitchTemplate = (rowData) => {
    //     return (
    //         <ToggleSwitch checked={rowData.status} onChange={() => onToggleChange(rowData)}
    //             onIcon="pi pi-check" offIcon="pi pi-times" onLabel="Active" offLabel="Inactive" />
    //     );
    // };

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
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
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => (
                <Switch checked={record.status} />
            ),
            width: '10%',
            sorter: (a, b) => a.status - b.status,

        },
    ];

    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: '85vh' }}>
            <Card title="Tất cả người dùng" subTitle="" footer="" header="" className="" style={{ width: '90%', marginTop: '50px' }}>
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