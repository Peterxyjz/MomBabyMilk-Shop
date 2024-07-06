import React from 'react';
import Breadcrumbs from '../../components/elements/Breadcrumb';

const Contact = () => {
    return (
        <>
            <Breadcrumbs headline="Liên hệ" />
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h1 className="text-2xl font-bold">CỬA HÀNG SỮA ONLINE MOMBABYMILK</h1>
                        <p>
                            <strong>Địa chỉ:</strong> Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Hồ Chí Minh.
                        </p>
                        <p>
                            <strong>Điện thoại:</strong> 090 7089078
                        </p>
                        <p>
                            <strong>Email:</strong> cskh@thegioisua.com
                        </p>

                        <h2 className="text-xl font-semibold mt-8">Liên hệ với chúng tôi</h2>
                        <form className="mt-4 space-y-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Họ và tên"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <textarea
                                    placeholder="Nội dung"
                                    rows="4"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full p-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                                >
                                    Gửi liên hệ của bạn
                                </button>
                            </div>
                        </form>
                    </div>
                    <div>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15674.440041588125!2d106.809883!3d10.8411276!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgVFAuIEhDTQ!5e0!3m2!1svi!2s!4v1720286824829!5m2!1svi!2s"
                            width="600"
                            height="500"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-120 rounded-md"
                        />
                    </div>
                </div>
            </div>
        </>

    );
};

export default Contact;
