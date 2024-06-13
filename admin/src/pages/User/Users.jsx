import React, { useState } from 'react'
import { Header } from '../../components'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react';




const Users = () => {

    const [Users, setUsers] = useState([
        { full_name: 'Nguyễn Văn A', email: 'a@a.com', date_of_birth: '01/01/2000', phone: '0123456789', address: 'Số 35, phố Tạ Quang Bửu, phường Bách Khoa, quận Hai Bà Trưng, Hà Nội', role: 'Nhân viên' },
        { full_name: 'Nguyễn Văn B', email: 'b@a.com', date_of_birth: '01/01/2001', phone: '0123456789', address: 'Số 15, phố Trần Duy Hưng, phường Trung Hòa, quận Cầu Giấy, Hà Nội', role: 'Nhân viên' },
        { full_name: 'Nguyễn Văn C', email: 'c@a.com', date_of_birth: '01/01/2002', phone: '0123456789', address: 'Số 25, phố Tạ Quang Bình, phường Bình Chánh, quận Thanh Xú, Hà Nội', role: 'Nhân viên' },
        { full_name: 'Nguyễn Văn D', email: 'd@a.com', date_of_birth: '01/01/2003', phone: '0123456789', address: 'Số 35, phố Tạ Quang Bình, phường Bình Chánh, quận Thanh Xú, Hà Nội', role: 'Khách hàng' },



    ]);
    const navigate = useNavigate();


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
            </DataTable>

        </div>
    )
}

export default Users