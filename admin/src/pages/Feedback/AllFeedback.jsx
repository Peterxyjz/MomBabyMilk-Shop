import { Button, Card, Rate, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { fetchAllFeedback, fetchAllUsers, fetchProducts } from '../../data/api';
import ReplyFeedback from '../../components/Feedback/ReplyFeedback';
import Loading from '../../components/Loading';

const AllFeedback = () => {
    const [products, setProducts] = useState([]);
    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [response, setResponse] = useState('');
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [users, setUsers] = useState([]);

    const handleExpand = (expanded, record) => {
        setExpandedRowKeys(expanded ? [record._id] : []); // Expand only the selected row
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productData, feedbackData, usersData] = await Promise.all([
                    fetchProducts(),
                    fetchAllFeedback(),
                    fetchAllUsers(JSON.parse(localStorage.getItem("result")))
                ]);

                setProducts(productData);
                setFeedback(feedbackData.data.result);
                console.log(feedbackData.data.result);
                setUsers(usersData.data.users);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (products.length > 0 && feedback.length > 0 && users.length > 0) {
            const mergedProducts = products.map(product => {
                const productFeedback = feedback.filter(item => item.product_id === product._id).map(fb => {
                    const user = users.find(user => user._id === fb.user_id);
                    if (!user) {
                        console.warn(`No user found for user_id: ${fb.user_id}`);
                    }
                    return { ...fb, user };
                });
                return {
                    ...product,
                    feedback: productFeedback,
                };
            });

            setProducts(mergedProducts);
        }
    }, [feedback, users]);


    if (loading) {
        return <Loading/>
      }


    const columns = [
        {
            title: 'Hình Ảnh Sản Phẩm',
            dataIndex: 'imgUrl',
            key: 'imgUrl',
            render: (text, record) => (
                <img src={record.imgUrl} alt="product" style={{ width: 100, height: 100 }} />
            ),
            width: "20%",
        },
        {
            title: 'Tên Sản Phẩm',
            dataIndex: 'product_name',
            key: 'product_name',
            render: (text, record) => (
                <span style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}>{record.product_name}</span>
            ),
            width: "80%",
        }
    ];

    const feedbackColumns = [
        {
            title: 'Tên khách hàng',
            dataIndex: 'user',
            key: 'user',
            width: "20%",
            render: (user) => (
                user ? <Text type="secondary" style={{ fontSize: '15px' }}>{user.username}</Text> : <Text type="secondary" style={{ fontSize: '15px' }}>Không xác định</Text>
            ),
        },
        {
            title: 'Đánh giá',
            dataIndex: 'rating',
            key: 'rating',
            width: "20%",
            render: (rating) => (
                <Rate disabled defaultValue={rating} />
            ),
        },
        {
            title: 'Bình luận',
            dataIndex: 'description',
            key: 'description',
            render: (description) => (
                <p style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}>{description}</p>
            ),
        },
        {
            title: 'Thời gian',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at) => (
                <Text type="secondary" style={{ fontSize: '15px' }}>{formatDate(created_at)}</Text>
            ),
            width: "15%",
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <Button
                    type="default"
                    onClick={() => {
                        setSelectedFeedback(record);
                        setModalOpen(true);
                    }}
                    style={{
                        backgroundColor: "#55B6C3",
                        fontSize: "15px",
                        color: 'white'
                    }}
                >
                    Trả lời
                </Button>
            ),
            width: "10%",
        }
    ];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
        };

    const expandedRowRender = (record) => (
        <Table
            columns={feedbackColumns}
            dataSource={record.feedback}
            pagination={false}
            rowKey={(fb) => fb._id}
        />
    );


    const { Text } = Typography;

    const filteredProducts = products.filter(product => product.feedback && product.feedback.length > 0);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>
            <Card
                title={<h2 className="text-2xl font-bold">Tất cả đánh giá</h2>}
                style={{ width: '90%', maxWidth: '70wh', margin: '30px auto', minHeight: '70vh' }}
            >
                <Table
                    columns={columns}
                    dataSource={filteredProducts}
                    expandable={{
                        expandedRowRender: record => expandedRowRender(record),
                        rowExpandable: record => record.feedback && record.feedback.length > 0,
                        expandedRowKeys: expandedRowKeys,
                        onExpand: handleExpand,
                    }}
                    rowKey="_id"
                />
                {modalOpen && (
                    <ReplyFeedback
                        modalOpen={modalOpen}
                        setModalOpen={setModalOpen}
                        selectedFeedback={selectedFeedback}
                        response={response}
                        setResponse={setResponse}
                    />
                )}
            </Card>
        </div>
    )
}

export default AllFeedback