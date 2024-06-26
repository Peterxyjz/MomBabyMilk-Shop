"use client";

import { Sidebar } from "flowbite-react";
import {
  HiChat,
  HiClock ,
  HiUser,
  HiGift,
  HiOutlineAdjustments  
} from "react-icons/hi";

export function SideBarProfile() {
  return (
    <Sidebar className="bg-white border mx-4">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/profile" icon={HiUser}>
            Tài khoản
          </Sidebar.Item>
          <Sidebar.Item href="/profile/change-password" icon={HiOutlineAdjustments}>
            Mật khẩu & bảo mật
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/profile/accumulated-points" icon={HiGift}>
            Đổi quà
          </Sidebar.Item>
          <Sidebar.Item href="/profile/history-order" icon={HiClock }>
            Lịch sử đơn hàng
          </Sidebar.Item>
          <Sidebar.Item href="/profile/my-feedback" icon={HiChat  }>
            Bình luận của tôi
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
