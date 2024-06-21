import React, { useState } from 'react';
import { FaUser, FaHistory, FaCreditCard, FaLock, FaCommentDots, FaHeart, FaShareAlt } from 'react-icons/fa';
import Breadcrumbs from '../../components/elements/Breadcrumb';

const EditProfile = () => {
    const [profile, setProfile] = useState({
        username: 'thinhtu254',
        name: '',
        email: 'tu********@gmail.com',
        phone: '********67',
        gender: '',
        birthDate: {
            day: '19',
            month: '6',
            year: '2024'
        }
    });

    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value
        });
    };

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            birthDate: {
                ...profile.birthDate,
                [name]: value
            }
        });
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Profile updated:', profile);
    };

    return (
        <>
            <Breadcrumbs headline={"Thay đổi thông tin"} />
            <div className="flex flex-col md:flex-row p-4 md:p-8 bg-white rounded-lg shadow-md mb-12">
                {/* Sidebar */}
                <div className="md:w-1/4 flex flex-col p-4 border-r border-gray-200" style={{ minHeight: '100vh' }}>
                    <nav className="flex flex-col divide-y divide-gray-200">
                        <a href="#" className="flex items-center py-3 text-blue-500 font-medium">
                            <FaUser className="mr-2" /> Hồ Sơ
                        </a>
                        <a href="#" className="flex items-center py-3 text-gray-600 hover:text-blue-500">
                            <FaLock className="mr-2" /> Đổi Mật Khẩu
                        </a>
                        <a href="#" className="flex items-center py-3 text-gray-600 hover:text-blue-500">
                            <FaHistory className="mr-2" /> Lịch Sử Đơn Hàng
                        </a>
                        <a href="#" className="flex items-center py-3 text-gray-600 hover:text-blue-500">
                            <FaCommentDots className="mr-2" /> Bình Luận Của Tôi
                        </a>
                        <a href="#" className="flex items-center py-3 text-gray-600 hover:text-blue-500">
                            <FaHeart className="mr-2" /> Sản Phẩm Yêu Thích
                        </a>
                        <a href="#" className="flex items-center py-3 text-gray-600 hover:text-blue-500">
                            <FaShareAlt className="mr-2" /> Tích điểm
                        </a>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="md:w-3/4 p-4">
                    <h2 className="text-xl font-bold mb-4">Hồ Sơ Của Tôi</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700">Tên đăng nhập</label>
                            <input
                                type="text"
                                name="username"
                                value={profile.username}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Tên</label>
                            <input
                                type="text"
                                name="name"
                                value={profile.name}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Email</label>
                            {isEditingEmail ? (
                                <div className="flex items-center">
                                    <input
                                        type="email"
                                        name="email"
                                        value={profile.email}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="button"
                                        className="ml-2 text-blue-500 hover:underline"
                                        onClick={() => setIsEditingEmail(false)}
                                    >
                                        Lưu
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <span>{profile.email}</span>
                                    <button
                                        type="button"
                                        className="ml-2 text-blue-500 hover:underline"
                                        onClick={() => setIsEditingEmail(true)}
                                    >
                                        Thay Đổi
                                    </button>
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-gray-700">Số điện thoại</label>
                            {isEditingPhone ? (
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        name="phone"
                                        value={profile.phone}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="button"
                                        className="ml-2 text-blue-500 hover:underline"
                                        onClick={() => setIsEditingPhone(false)}
                                    >
                                        Lưu
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <span>{profile.phone}</span>
                                    <button
                                        type="button"
                                        className="ml-2 text-blue-500 hover:underline"
                                        onClick={() => setIsEditingPhone(true)}
                                    >
                                        Thay Đổi
                                    </button>
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-gray-700">Giới tính</label>
                            <div className="flex space-x-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Nam"
                                        checked={profile.gender === 'Nam'}
                                        onChange={handleChange}
                                        className="form-radio h-4 w-4 text-blue-500"
                                    />
                                    <span className="ml-2">Nam</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Nữ"
                                        checked={profile.gender === 'Nữ'}
                                        onChange={handleChange}
                                        className="form-radio h-4 w-4 text-blue-500"
                                    />
                                    <span className="ml-2">Nữ</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Khác"
                                        checked={profile.gender === 'Khác'}
                                        onChange={handleChange}
                                        className="form-radio h-4 w-4 text-blue-500"
                                    />
                                    <span className="ml-2">Khác</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700">Ngày sinh</label>
                            <div className="flex space-x-4">
                                <select
                                    name="day"
                                    value={profile.birthDate.day}
                                    onChange={handleDateChange}
                                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {[...Array(31).keys()].map((day) => (
                                        <option key={day + 1} value={day + 1}>
                                            {day + 1}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    name="month"
                                    value={profile.birthDate.month}
                                    onChange={handleDateChange}
                                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {[...Array(12).keys()].map((month) => (
                                        <option key={month + 1} value={month + 1}>
                                            Tháng {month + 1}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    name="year"
                                    value={profile.birthDate.year}
                                    onChange={handleDateChange}
                                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {[...Array(100).keys()].map((year) => (
                                        <option key={year + 1920} value={year + 1920}>
                                            {year + 1920}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-red-500 text-white font-bold rounded-md hover:bg-red-600"
                        >
                            Lưu
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditProfile;
