import React, { useEffect, useState } from 'react'
import { Header } from '../../components'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
import { Button, ToggleSwitch } from 'flowbite-react';
import axios from 'axios';




const Users = () => {

    const [Users, setUsers] = useState([]);
    const navigate = useNavigate();
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
                setUsers(res.data.users);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        console.log(Users);
        fetchUsers();
    }, []);

    const onToggleChange = (user) => {
        const updatedUsers = Users.map(u => {
            if (u.email === user.email) {
                return { ...u, status: !u.status };
            }
            return u;
        });
        setUsers(updatedUsers);
    };

    const toggleSwitchTemplate = (rowData) => {
        return (
            <ToggleSwitch checked={rowData.status} onChange={() => onToggleChange(rowData)}
                onIcon="pi pi-check" offIcon="pi pi-times" onLabel="Active" offLabel="Inactive" />
        );
    };

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header title="Người dùng" />
            <div>
                <Button
                    onClick={() => navigate('/add-staff')}
                    size="lg">
                    Thêm nhân viên
                </Button>
            </div>

            <DataTable value={Users} tableStyle={{ minWidth: '50rem' }}>
                <Column field="full_name" header="Họ và tên" sortable style={{ width: '20%' }}></Column>
                <Column field="email" header="Email" style={{ width: '15%' }}></Column>
                <Column field="date_of_birth" header="Ngày sinh" sortable style={{ width: '10%' }}></Column>
                <Column field="phone" header="Số điện thoại" style={{ width: '15%' }}></Column>
                <Column field="address" header="Địa chỉ" style={{ width: '30%' }}></Column>
                <Column field="role" header="Vai trò" sortable style={{ width: '10%' }}></Column>
                <Column field="status" header="Tình trạng" body={toggleSwitchTemplate} sortable style={{ width: '10%' }}></Column>
            </DataTable>

        </div>
    )
}

export default Users