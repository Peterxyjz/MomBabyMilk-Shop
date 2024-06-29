import React, { useEffect, useState } from "react";
import { Header } from "../../components";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom";
import { ToggleSwitch } from "flowbite-react";
import axios from "axios";
import { Card } from "primereact/card";
import { format } from "date-fns";

import { Button, Table, Switch, Pagination, Modal, notification } from "antd";
import { fetchAllUsers } from "../../data/api";

const Users = () => {
  const [Users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [shouldRefetch, setShouldRefetch] = useState(false); // State to trigger refetch

  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd-MM-yyyy");
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = JSON.parse(localStorage.getItem("result"));
        const res = await fetchAllUsers(result);
        const formattedUsers = res.data.users.map((user) => ({
          ...user,
          date_of_birth: formatDate(user.date_of_birth),
        }));

        setUsers(formattedUsers);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    console.log(Users);
    fetchUsers();
  }, [shouldRefetch]);

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
  const [pageSize, setPageSize] = useState(10);

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  // const handleSwitchChange = (checked, Users) => {
  //     Modal.confirm({
  //       title: "Xác nhận thay đổi tình trạng người dùng",
  //       content: `Bạn có muốn thay đổi tình trạng người dùng? Hiện đang ${
  //         checked ? "tắt" : "bật"
  //       }`,
  //       onOk: async () => {
  //         Users.isActive = checked;
  //         await updateUser(Users);
  //         setUsers([...Users]);
  //         notification.success({
  //           message: "Thành công",
  //           description: `Thay đổi thành công! Sản phẩm hiện đang ${
  //             checked ? "bật" : "tắt"
  //           }`,
  //           placement: "top",
  //         });
  //       },
  //       onCancel() {
  //         console.log("Cancel");
  //       },
  //       okButtonProps: {
  //         style: {
  //           backgroundColor: "#46B5C1",
  //           borderColor: "#46B5C1",
  //         },
  //       },
  //       cancelButtonProps: {
  //         style: {
  //           backgroundColor: "#FF4D4F",
  //           borderColor: "#FF4D4F",
  //           color: "#FFFFFF",
  //         },
  //       },
  //       cancelText: "Đóng",
  //       okText: "Đồng ý",
  //     });
  //   };

  const handleSwitchChange = async (checked, user) => {
    console.log(checked);
    user.isActive = checked === true ? 0 : 1;
    console.log(user);
    const token = JSON.parse(localStorage.getItem("result"));
    console.log(token);
    await axios
      .post(
        `http://localhost:4000/users/change-status/${user._id}`,
        { },
        {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.message);
        setShouldRefetch(prev => !prev);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "25%",
    },
    {
      title: "Họ và tên",
      dataIndex: "full_name",
      key: "full_name",
      ellipsis: true,
      width: "10%",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.full_name.localeCompare(b.full_name),
    },
    {
      title: "Ngày sinh",
      dataIndex: "date_of_birth",
      key: "date_of_birth",
      ellipsis: true,
      width: "10%",
      sorter: (a, b) => new Date(a.date_of_birth) - new Date(b.date_of_birth),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      ellipsis: true,
      width: "10%",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      ellipsis: true,
      width: "20%",
    },
    {
      title: "Vai trò",
      dataIndex: "role_name",
      key: "role_name",
      ellipsis: true,
      width: "10%",
      sorter: (a, b) => a.role_name.localeCompare(b.role_name),
    },
    {
      title: "Tình trạng",
      dataIndex: "isActive",
      key: "isActive",
      render: (text, record) => (
        <Switch
          checked={record.isActive === 0 ? false : true}
          style={{ backgroundColor: record.isActive === 1 ? "#4A99FF" : "#898989" }}
          onChange={(checked) => handleSwitchChange(checked, record)}
        />
      ),
      width: "10%",
      sorter: (a, b) => a.status - b.status,
    },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "120vh" }}>
      <Card
        title="Tất cả người dùng"
        subTitle=""
        footer=""
        header=""
        className=""
        style={{ width: "90%", height: "90vh", marginTop: "50px" }}
      >
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
          }}
          scroll={{ x: "100%" }}
          onChange={handleTableChange}
          style={{ overflowX: "auto", flexGrow: 1 }}
          rowKey="email"
        />
        {/* <div style={{ padding: '10px 0', textAlign: 'center', marginTop: 'auto' }}>
            <Pagination defaultCurrent={1} total={Users.length} defaultPageSize={6}/>;
            </div> */}
      </Card>
    </div>
  );
};

export default Users;
