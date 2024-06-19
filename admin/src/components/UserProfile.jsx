import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { Button } from ".";
import { adminProfileData, staffProfileData } from "../data/dummy";
import Buttonlogout from "@mui/material/Button";
import axios from "axios";
import { NavLink, useNavigate } from 'react-router-dom';
import { Modal } from "antd";
import { fetchLogout } from "../data/api";
const UserProfile = ({ isAdmin }) => {
  const user = JSON.parse(localStorage.getItem('user'));


  const handleLogout = async () => {
    const result = JSON.parse(localStorage.getItem("result"));
    Modal.confirm({
      title: 'Xác nhận đăng xuất',
      content: `Bạn có chắc chắn muốn đăng xuất?`,
      onOk: async () => {
        await fetchLogout(result);
        localStorage.clear();
        window.location.reload();
      },
      onCancel() {
        console.log('Cancel');
      },
      okButtonProps: {
        style: {
          backgroundColor: '#46B5C1',
          borderColor: '#46B5C1',
        },
      },
      cancelButtonProps: {
        style: {
          backgroundColor: '#FF4D4F',
          borderColor: '#FF4D4F',
          color: '#FFFFFF',
        },
      },
      cancelText: 'Đóng',
      okText: 'Đồng ý',
    });
  };
  return (
    <div className="nav-item absolute right-1 top-10 bg-white dark:bg-[#42464D] p-5 rounded-lg w-96">
      <div className="flex justify-between items-center gap-5 border-color border-b-1 pb-6">
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">
            {" "}
            {user.full_name}{" "}
          </p>
          <p className="text-gray-500 text-lg font-semibold dark:text-gray-400">
            {" "}
            {isAdmin ? "Quản trị viên" : "Nhân viên"}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {" "}
            {user.email}{" "}
          </p>
        </div>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div>
        {isAdmin ? (
          <div>
            <div>
              {adminProfileData.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
                >
                  <button
                    type="button"
                    style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                    className=" text-xl rounded-lg p-3 hover:bg-light-gray"
                  >
                    {item.icon}
                  </button>

                  <div>
                    <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
                    <p className="text-gray-500 text-sm dark:text-gray-400">
                      {" "}
                      {item.desc}{" "}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <Buttonlogout
                variant="contained"
                className="w-full"
                onClick={handleLogout}
              >
                Đăng xuất
              </Buttonlogout>
            </div>
          </div>
        ) : (
          <div>
            <div>
              {staffProfileData.map((item, index) => (
                <NavLink
                  key={index}
                  to={`/${item.path}`}
                  className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer dark:hover:bg-[#42464D]"
                >
                  <div
                    style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                    className="text-xl rounded-lg p-3 hover:bg-light-gray"
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-semibold dark:text-gray-200" style={{marginBottom: '5px'}}>{item.title}</p>
                    <p className="text-gray-500 text-sm dark:text-gray-400" style={{marginBottom: '5px'}}>{item.desc}</p>
                  </div>
                </NavLink>
              ))}
            </div>
            <div className="mt-5">
              <Buttonlogout
                variant="contained"
                className="w-full"
                onClick={handleLogout}
              >
                Đăng xuất
              </Buttonlogout>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
