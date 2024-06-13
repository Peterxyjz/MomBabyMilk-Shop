import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { Button } from ".";
import { adminProfileData, staffProfileData } from "../data/dummy";
import Buttonlogout from "@mui/material/Button";
import avatar from "../data/avatar.jpg";
import axios from "axios";
const UserProfile = ({ isAdmin }) => {
  const handleLogout = async () => {
    const result = JSON.parse(localStorage.getItem("result"));
    await axios.post(
      "http://localhost:4000/users/logout",
      {
        refresh_token: result.refresh_token,
      },
      {
        headers: {
          Authorization: `Bearer ${result.access_token}`,
        },
      }
    );
    localStorage.clear();
    window.location.reload();
  };
  return (
    <div className="nav-item absolute right-1 top-10 bg-white dark:bg-[#42464D] p-5 rounded-lg w-96">
      <div className="flex justify-between items-center gap-5 border-color border-b-1 pb-6">
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">
            {" "}
            Michael Roberts{" "}
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {" "}
            Administrator{" "}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {" "}
            info@shop.com{" "}
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
        )}
      </div>
    </div>
  );
};

export default UserProfile;
