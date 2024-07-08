import React, { useEffect, useState } from "react";
import { fetchDeleteVoucher, fetchGetVoucher } from "../../data/api";
import { Button, Datepicker, Select, TextInput } from "flowbite-react";
import { fetchGetVoucherType, fetchUpdateVoucher } from "../../data/api";
import { toast, Toaster } from "react-hot-toast";
import Loading from "../../components/Loading";
import { Card, Modal, notification, Table } from "antd";
import { useNavigate } from "react-router-dom";


const Vouchers = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [voucherTypes, setVoucherTypes] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const token = JSON.parse(localStorage.getItem("result"));
  const navigate = useNavigate();


  useEffect(() => {
    const getVouchers = async () => {
      const data = await fetchGetVoucher();
      setVouchers(data);
      setLoading(false);
    };

    getVouchers();

    fetchGetVoucherType().then((res) => {
      if (res && res.data.result) {
        setVoucherTypes(res.data.result);
      }
    });
  }, []);

  const toggleModal = (voucher = null) => {
    setSelectedVoucher(voucher);
    setShowModal(!showModal);
  };

  const showDeleteConfirm = (voucherId) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa voucher này?',
      content: 'Hành động này không thể hoàn tác.',
      onOk: async () => {
        try {
          handleDelete(voucherId);
          notification.success({
            message: "Thành công",
            description: `Xóa thành công!`,
            placement: "top",
          });
        } catch (error) {
          console.log(error);
          notification.error({
            message: "Lỗi",
            description: "Có lỗi xảy ra khi xóa voucher",
            placement: "top",
          });
        }
      },
      onCancel() {
        console.log("Cancel");
      },
      okButtonProps: {
        style: {
          backgroundColor: "#46B5C1",
          borderColor: "#46B5C1",
        },
      },
      cancelButtonProps: {
        style: {
          backgroundColor: "#FF4D4F",
          borderColor: "#FF4D4F",
          color: "#FFFFFF",
        },
      },
      cancelText: "Đóng",
      okText: "Đồng ý",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const date_input = new Date(selectedVoucher.expire_date);
    date_input.setDate(date_input.getDate() + 1);
    const updatedVoucher = {
      voucher_type: Number(selectedVoucher.voucher_type),
      membership: Number(selectedVoucher.membership),
      expire_date: date_input.toISOString(),
      discount: Number(selectedVoucher.discount),
      amount: Number(selectedVoucher.amount),
    };
    console.log(updatedVoucher);
    await fetchUpdateVoucher(updatedVoucher, token, selectedVoucher._id)
      .then((res) => {
        console.log(res.data);
        toast.success("Cập nhật thành công", {
          position: "top-right",
        });
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Cập nhật thất bại", {
          position: "top-right",
        });
      });
  };

  const handleDelete = async (voucherId) => {
    await fetchDeleteVoucher(voucherId, token)
      .then((res) => {
        toast.success("Xóa voucher thành công", {
          position: "top-right",
        });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Xóa voucher thất bại", {
          position: "top-right",
        });
      });
  };

  if (loading) {
    return <Loading />
  }

  const columns = [
    {
      title: 'Mã Voucher',
      dataIndex: '_id',
      key: '_id',
      render: (text) => <div className="text-base font-semibold">{text}</div>,
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'expire_date',
      key: 'expire_date',
      sorter: (a, b) => new Date(a.expire_date) - new Date(b.expire_date),
    },
    {
      title: 'Membership',
      dataIndex: 'membership',
      key: 'membership',
      render: (value) =>
        new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(value),
      sorter: (a, b) => a.membership - b.membership,
    },
    {
      title: 'Mức giảm giá (VND)',
      dataIndex: 'discount',
      key: 'discount',
      render: (value) =>
        new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(value),
    },
    {
      title: 'Số lượng',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Loại Voucher',
      dataIndex: 'voucher_type',
      key: 'voucher_type',
      render: (type) => (type === 0 ? 'User' : 'Member'),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <div style={{
          display: "flex",
          justifyContent: "space-between",
        }}>
          <Button
            type="link"
            onClick={() => toggleModal(record)}
            style={{
              backgroundColor: "#55B6C3",
              fontSize: "5px",
            }}
          >
            Chỉnh sửa
          </Button>
          <Button
            type="link"
            onClick={() => showDeleteConfirm(record._id)}
            style={{
              backgroundColor: "#ff4d4f",
              fontSize: "5px",
            }}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>
        <Card
          title={<h2 className="text-2xl font-bold">Tất cả voucher</h2>}
          style={{ width: '90%', maxWidth: '70wh', margin: '30px auto', minHeight: '70vh' }}
        >
          <div className="flex justify-between items-center mb-4">
            <Button
              type="default"
              onClick={() => navigate(`/add-voucher`)}
              style={{ backgroundColor: "#55B6C3", fontSize: "10px" }}
            >
              Thêm voucher
            </Button>
          </div>
          <Table
            columns={columns}
            dataSource={vouchers}
            rowKey={(record) => record._id}
            pagination={false}
            className="w-full text-sm text-left rtl:text-right text-gray-500"
          />
        </Card>
      </div>
    </>
  );
};

export default Vouchers;
