import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-xl mb-4">Trang bạn tìm kiếm không tồn tại.</p>
            <Link to="/" className="text-blue-500 text-lg hover:underline">
                Quay về trang chủ
            </Link>
        </div>
    );
};

export default NotFound;
