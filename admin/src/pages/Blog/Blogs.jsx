import React, { useState } from 'react'
import blogimg from "../../assets/images/cover_imgedit.png";
import { Col, Pagination, Row } from 'antd';
import { Card } from 'primereact/card';
import { blogData } from '../../data/dummy';
import { Button } from "flowbite-react";


const Blogs = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const onPageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };
    const header = (
        <img src={blogimg} style={{ objectFit: 'cover' }} />
    );

    const footer = (
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            width: "60%",
          }}>
            <Button
                type="default"
                onClick={"#"}
                style={{
                    backgroundColor: "#55B6C3",
                    fontSize: "10px",
                }}
            >
                Xem chi tiết
            </Button>
            <Button
                type="default"
                onClick={"#"}
                style={{
                    backgroundColor: "#ff4d4f",
                    fontSize: "10px",
                }}
            >
                Xóa
            </Button>
        </div>
    );

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

    return (
        <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>
            <Card
                title="Tất cả tin tức"
                style={{ width: '90%', maxWidth: '1400px', margin: '30px auto', minHeight: '70vh' }}
            >
                <Row gutter={[24, 24]} justify="center" >
                    {blogData.map((blog) => (
                        <Col span={8} key={blog.id} style={{ marginBottom: '30px' }}>
                            <Card
                                title={<h5 className="truncate">{blog.title}</h5>}
                                subTitle={<span>{formatDate(blog.date)}</span>}
                                header={header}
                                footer={footer}
                            >
                                <div className="card-content">
                                    <p className="m-0 truncate">{blog.content}</p>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Pagination
                 current={currentPage}
                 pageSize={pageSize}
                 total={blogData.length}
                 onChange={onPageChange}
                 style={{ textAlign: 'center', marginTop: '20px' }}
            />
            </Card>
        </div>
  )
}

export default Blogs