import { Button, Card, Rate, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { fetchProducts } from '../../data/api';
import ReplyFeedback from '../../components/Feedback/ReplyFeedback';

const AllFeedback = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [response, setResponse] = useState('');

    useEffect(() => {
        const getProducts = async () => {
            try {
                const productData = await fetchProducts();
                setProducts(productData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        };

        getProducts();
    }, []);
    if (loading) {
        return <div className="text-center font-bold text-2xl">Loading...</div>;
    }


    const columns = [
        {
            title: 'Thông tin Sản phẩm',
            dataIndex: 'productInfo',
            key: 'productInfo',
            render: (text, record) => (
                <Card>
                    <Card.Meta
                        avatar={<img src={record.imgUrl} alt="product" style={{ width: 100, height: 100 }} />}
                        title={<span style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}>{record.product_name}</span>}
                    />
                </Card>
            ),
            width: "40%",
        },
        {
            title: 'Đánh giá của Người mua',
            dataIndex: 'review',
            key: 'review',
            render: (text, record) => (
                <div style={{ textAlign: 'start' }}>
                    <p>
                        <Text type="secondary" style={{ fontSize: '15px', display: 'inline-block', marginRight: '10px' }}>Tên khách hàng | Mã đơn hàng</Text>
                    </p>
                    <Rate disabled defaultValue={record.rating} />
                    <p style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}>abc xyz xinh đẹp tuyệt vời, ờ mây zing gút chóp lun!! sản phẩm chất lượng, giao hàng nhanh chóng</p>
                    <Text type="secondary" style={{ fontSize: '15px', display: 'inline-block', marginRight: '10px' }}>01/01/2024 0:00:00</Text>
                </div>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <Button
                    type="default"
                    onClick={() => setModalOpen(true)}
                    style={{
                        backgroundColor: "#55B6C3",
                        fontSize: "15px",
                        color: 'white'
                    }}
                >
                    Trả lời
                </Button>
            ),
        },
    ];

    const { Text } = Typography;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>
            <Card
                title={<h2 className="text-2xl font-bold">Tất cả đánh giá</h2>}
                style={{ width: '90%', maxWidth: '70wh', margin: '30px auto', minHeight: '70vh' }}
            >
                <Table columns={columns} dataSource={products} />
                <ReplyFeedback
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    selectedRecord={selectedRecord}
                    response={response}
                    setResponse={setResponse}
                />
            </Card>
        </div>
    )
}

export default AllFeedback