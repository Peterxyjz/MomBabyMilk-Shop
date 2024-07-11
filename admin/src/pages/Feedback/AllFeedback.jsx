import { Avatar, Button, Card, List, Rate, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { fetchAllFeedback, fetchAllUsers, fetchProducts } from '../../data/api';
import ReplyFeedback from '../../components/Feedback/ReplyFeedback';
import Loading from '../../components/Loading';
import { Comment } from '@ant-design/compatible';


const AllFeedback = () => {
    const [products, setProducts] = useState([]);
    const [feedback, setFeedback] = useState([]);
    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [response, setResponse] = useState('');
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    


    const handleExpand = (expanded, record) => {
        setExpandedRowKeys(expanded ? [record._id] : []);
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
        return <Loading />
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
            width: "50%",
        },
        {
            title: 'Đánh Giá',
            dataIndex: 'rating',
            key: 'rating',
            render: (text, record) => (
                <div>
                    <Rate allowHalf disabled value={record.rating} />
                    <div>{record.rating.toFixed(1)} / 5 ({record.memberFeedbackCount} đánh giá)</div>
                </div>
            ),
            width: "30%",
            fontSize: "20px",
        }
    ];

    const renderComments = (feedback) => {
        return (
            <List
                dataSource={feedback}
                itemLayout="horizontal"
                renderItem={item => (
                    <Comment
                        author={<Text type="secondary" style={{ fontSize: '15px' }}>{item.user?.username || 'Không xác định'}</Text>}
                        avatar={<Avatar>{item.user?.username?.charAt(0) || '?'}</Avatar>}
                        content={
                            <>
                                <span style={{ fontSize: '15px', display: 'flex', justifyContent: 'space-between' }}>
                                    <p style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}>{item.description}</p>
                                    {item.user?.role_name === 'Member' && (
                                        <div style={{ marginRight: '10%' }}>
                                            <Rate style={{ fontSize: '20px' }} disabled defaultValue={item.rating} />
                                        </div>
                                    )}
                                </span>
                            </>
                        }
                        datetime={formatDate(item.created_at)}
                        actions={[
                            item.user?.role_name === 'Member' && (
                                <Button
                                    type="default"
                                    onClick={() => {
                                        setSelectedFeedback(item);
                                        setModalOpen(true);
                                    }}
                                    style={{
                                        backgroundColor: "#55B6C3",
                                        fontSize: "15px",
                                        color: 'white'
                                    }}
                                    disabled={item.replies && item.replies.length > 0}
                                >
                                    Trả lời
                                </Button>
                            )
                        ]}
                    >
                        {item.replies && item.replies.length > 0 && renderReplies(item.replies)}
                    </Comment>
                )}
            />
        );
    };

    const renderReplies = (replies) => {
        return (
            <List
                dataSource={replies}
                itemLayout="horizontal"
                renderItem={reply => (
                    <Comment
                        author={<Text type="secondary" style={{ fontSize: '15px' }}>{reply.user?.username || 'Không xác định'}</Text>}
                        avatar={<Avatar>{reply.user?.username?.charAt(0) || '?'}</Avatar>}
                        content={<p style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}>{reply.description}</p>}
                        datetime={formatDate(reply.created_at)}
                    />
                )}
            />
        );
    };

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

    const expandedRowRender = (record) => {
        const feedbackRows = record.feedback.filter(fb => fb.user && fb.user.role_name === 'Member');
        feedbackRows.forEach(fb => {
            fb.replies = record.feedback.filter(reply => reply.user && reply.user.role_name === 'Staff' && reply._id === fb._id);
        });
        console.log("Feedback ne:",feedbackRows);

        return (
            <div>
                {renderComments(feedbackRows)}
            </div>
        );
    };



    const { Text } = Typography;

    const filteredProducts = products.filter(product => product.feedback && product.feedback.length > 0);
    console.log("Product ne:",filteredProducts);


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
                        expandedRowRender,
                        rowExpandable: record => record.feedback && record.feedback.length > 0,
                        expandedRowKeys,
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