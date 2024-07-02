import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { fetchAllUsers } from '../../data/api';
import { Button, Modal, Table } from 'antd';
import { Card } from 'primereact/card';


const Customers = () => {
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
            title: 'Điểm thành viên',
            dataIndex: 'menber_ship',
            key: 'menber_ship',
            width: '10%',
            sorter: (a, b) => a.menber_ship - b.menber_ship,

        },
    ];

    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: '120vh' }}>
            <Card title="Tất cả khách hàng" subTitle="" footer="" header="" className="" style={{ width: '90%', height: '90vh', marginTop: '50px' }}>
                <div className="flex justify-between items-center mb-4">

                </div>
                <Table
                    columns={columns}
                    dataSource={Users.filter(u => u.role_name === "Member")}
                    pagination={{
                        current: currentPage,
                        pageSize: pageSize,
                        total: Users.filter(u => u.role_name === "Member").length,
                    }} scroll={{ x: '100%' }}
                    onChange={handleTableChange}
                    style={{ overflowX: 'auto', flexGrow: 1 }}
                    rowKey="email"
                />

            </Card>
        </div>
    )
};

export default Customers;
