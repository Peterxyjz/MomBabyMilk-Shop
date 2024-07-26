import React from 'react';
import logo from "../../assets/images/logo/Logo.png";

const ExchangePolicy = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="text-center">
                <img src={logo} alt="Logo" className="mx-auto" />
                <h1 className="text-3xl font-bold mt-4">CHÍNH SÁCH ĐỔI HÀNG</h1>
            </div>

            <h1 className="text-left text-2xl my-4 font-bold">
                HÀNG ĐƯỢC PHÉP ĐỔI
            </h1>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th></th>
                            <th className="px-6 py-3 border-r border-b bg-blue-500 text-white">
                                HÀNG HÓA KHÔNG BỊ LỖI, CÒN NGUYÊN VẸN 100%<br />(KHÁCH HÀNG CHƯA/ KHÔNG SỬ DỤNG)
                            </th>
                            <th className="px-6 py-3 border-r border-b bg-blue-500 text-white">
                                HÀNG HÓA BỊ LỖI, HỎNG<br />(DO NHÀ SẢN XUẤT)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-6 py-4 border-r border-b bg-blue-100 font-bold border-white">
                                THỜI GIAN ĐỔI HÀNG
                            </td>
                            <td className="px-6 py-4 border-b border-r bg-blue-100 font-bold border-white">
                                TRONG VÒNG 03 NGÀY KỂ TỪ NGÀY NHẬN HÀNG THÀNH CÔNG
                            </td>
                            <td className="px-6 py-4 border-b bg-blue-100 font-bold border-white">
                                TRONG VÒNG 03 NGÀY KỂ TỪ NGÀY NHẬN HÀNG THÀNH CÔNG
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 border-r border-b bg-blue-100 font-bold border-white">
                                PHÍ ĐỔI HÀNG
                            </td>
                            <td className="px-6 py-4 border-b border-r bg-blue-100 font-bold border-white">
                                MIỄN PHÍ
                            </td>
                            <td className="px-6 py-4 border-b bg-blue-100 font-bold border-white">
                                MIỄN PHÍ
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h1 className="text-left text-2xl my-4 font-bold">
                HÀNG KHÔNG ĐỔI ĐƯỢC
            </h1>

            <div className="text-left mb-8">
                <ul className="list-disc list-inside">
                    <li>THỰC PHẨM KHÔ, HÀNG BẢO QUẢN LẠNH, THỰC PHẨM CHỨC NĂNG.</li>
                    <li>HÀNG CÓ KHẢ NĂNG NHIỄM KHUẨN ĐÃ QUA BÓC TEM (BÌNH SỮA, NÚM TI, MÁY HÚT SỮA, V.V...).</li>
                    <li>HÀNG TẶNG, HÀNG THANH LÝ (CÓ THÔNG BÁO CHÍNH THỨC TẠI CỬA HÀNG).</li>
                    <li>HÀNG KHI MUA ĐƯỢC ÁP DỤNG CHÍNH SÁCH KHUYẾN MÃI, ƯU ĐÃI, GIẢM GIÁ, TRỢ GIÁ.</li>
                </ul>
            </div>

            <h1 className="text-left text-2xl my-4 font-bold">
                ĐIỀU KIỆN ĐỔI HÀNG
            </h1>
            <div className="text-left mb-8">
                <ul className="list-disc list-inside">
                    <li>HÀNG ĐẢM BẢO CÒN MỚI NGUYÊN VẸN TRANG THÁI BAN ĐẦU KHI MUA, CÒN NGUYÊN NHÃN MÁC, NGUYÊN HỘP, PHỤ KIỆN...</li>
                    <li>KHÁCH HÀNG CẦN GIỮ LẠI HÓA ĐƠN MUA HÀNG TẠI MOMBABYMILK.</li>
                    <li>HÀNG CÒN HẠN SỬ DỤNG.</li>
                    <li>HÀNG ĐƯỢC ĐỔI ĐÚNG CỬA HÀNG MOMBABYMILK ĐÃ MUA TRƯỚC ĐÓ.</li>
                </ul>
            </div>

            <h1 className="text-left text-2xl my-4 font-bold">
                LƯU Ý
            </h1>
            <div className="text-left mb-8">
                <ul className="list-disc list-inside">
                    <li>SẢN PHẨM ĐỔI MỚI SẼ CÓ GIÁ TRỊ NGANG BẰNG HOẶC LỚN HƠN GIÁ TRỊ SẢN PHẨM TẠI THỜI ĐIỂM ĐÃ MUA TRƯỚC ĐÓ.</li>
                    <li>TRONG TRƯỜNG HỢP SẢN PHẨM ĐỔI MỚI CÓ GIÁ TRỊ LỚN HƠN SẢN PHẨM ĐÃ MUA, QUÝ KHÁCH VUI LÒNG THANH TOÁN THÊM PHẦN CHÊNH LỆCH.</li>
                </ul>
            </div>

            <h1 className="text-left text-2xl my-4 font-bold">
                QUY TRÌNH ĐỔI HÀNG
            </h1>
            <div className="text-left mb-8">
                <p>- BƯỚC 1: KHÁCH HÀNG GỌI HOTLINE <span className="text-yellow-500">0986777514</span> HOẶC EMAIL TỚI ĐỊA CHỈ <span className="text-yellow-500">pass10diemswp391@gmail.com</span> ĐỂ YÊU CẦU VIỆC ĐỔI SẢN PHẨM. THẾ GIỚI SỮA SẼ HƯỚNG DẪN CÁC BƯỚC ĐỂ KHÁCH ĐỔI SẢN PHẨM.</p>
                <p>- BƯỚC 2: KHÁCH HÀNG GỬI SẢN PHẨM TỚI MOMBABYMILK (KHÁCH TRỰC TIẾP TỚI CỬA HÀNG MOMBABYMILK HOẶC CHUYỂN PHÁT TRONG TRƯỜNG HỢP KHÁCH MUA HÀNG QUA CÁC KÊNH ONLINE).</p>
                <p>- BƯỚC 3: <span className="text-yellow-500">MOMBABYMILK</span> NHẬN VÀ KIỂM TRA SẢN PHẨM, SAU ĐÓ CHÚNG TÔI SẼ TIẾN HÀNH HỖ TRỢ KHÁCH HÀNG TÙY TRƯỜNG HỢP CỤ THỂ THEO ĐÚNG QUY ĐỊNH.</p>
                <p>- BƯỚC 4: KHÁCH HÀNG NHẬN SẢN PHẨM 1 ĐỔI 1 HOẶC SẢN PHẨM THAY THẾ MÀ KHÁCH LỰA CHỌN THEO CÁC QUY ĐỊNH NÊU TRÊN CỦA <span className="text-yellow-500">MOMBABYMILK</span>.</p>
                <p className="mt-4">Quý khách vui lòng gửi sản phẩm qua chuyển phát về MOMBABYMILK trong vòng 03 ngày làm việc kể từ khi thông báo với bộ phận chăm sóc khách hàng.</p>
                <p className="mt-2">Quý khách vui lòng gửi kèm:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Hóa đơn bán hàng.</li>
                    <li>Phụ kiện, quà tặng khuyến mãi kèm theo nếu có.</li>
                </ul>
                <p className="mt-2">Khách hàng chịu toàn bộ trách nhiệm về trạng thái nguyên vẹn của sản phẩm khi gửi tới MOMBABYMILK.</p>
            </div>

            <div className="bg-blue-700 text-white text-center py-2">
                <p>HOTLINE: 090 7089078 | https://www.mombabymilk.xyz/</p>
            </div>
        </div>
    );
};

export default ExchangePolicy;
