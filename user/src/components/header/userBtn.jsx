import React from "react";
import { Dropdown } from "flowbite-react";
import { HiCog, HiViewGrid, HiLogout } from "react-icons/hi";
import { FaUser } from "react-icons/fa";

const UserBtn = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  
  return (
    <Dropdown label={<FaUser className="w-10 h-10 p-1.5 text-black" />} inline>
      {user ? (
        <>
          <Dropdown.Header>
            <span className="block text-sm">{user.username}</span>
            <span className="block truncate text-sm font-medium">
              {user.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item icon={HiViewGrid} className="w-48">Chỉnh Sửa</Dropdown.Item>
          <Dropdown.Item icon={HiCog} className="w-48">Tích Điểm</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item icon={HiLogout} className="w-48">Đăng Xuất</Dropdown.Item>
        </>
      ) : (
        <>
          <Dropdown.Item icon={HiViewGrid} className="w-48" href="/login">
            Đăng Nhập
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item icon={HiLogout} className="w-48" href="/register">
            Đăng Ký
          </Dropdown.Item>
        </>
      )}
    </Dropdown>
  );
};

export default UserBtn;
