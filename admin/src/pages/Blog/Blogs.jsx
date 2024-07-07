import React, { useEffect, useState } from 'react'
import blogimg from "../../assets/images/cover_imgedit.png";
import { Col, Pagination, Row } from 'antd';
import { Card } from 'primereact/card';
import { blogData } from '../../data/dummy';
import { Button } from "flowbite-react";
import { fetchAllNews } from '../../data/api';
import { useNavigate } from 'react-router-dom';


const Blogs = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const onPageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };
    const header = (img_url) => (
        <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>

            <img src={img_url} alt="header" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
    );
    useEffect(() => {
        const getNews = async () => {
          try {
            const news = await fetchAllNews();
            setNews(news);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching products:", error);
            setLoading(false);
          }
        };
    
        getNews();
      }, []);
      console.log(news)

    const footer = (id) => (
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            width: "60%",
          }}>
            <Button
                type="default"
                onClick={() => navigate(`/edit-news?id=${id}`)}
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

    const currentNews = news.slice((currentPage - 1) * pageSize, currentPage * pageSize);


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
                    {currentNews.map((n) => (
                        <Col span={8} key={n._id} style={{ marginBottom: '30px' }}>
                            <Card
                                title={<h5 className="truncate">{n.news_name}</h5>}
                                subTitle={<span>{formatDate(n.created_at)}</span>}
                                header={header(n.img_url)}
                                footer={footer(n._id)}
                            >
                                  <div className="card-content">
                                    <div className="truncate" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 1, overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: n.description }} />
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Pagination
                 current={currentPage}
                 pageSize={pageSize}
                 total={news.length}
                 onChange={onPageChange}
                 style={{ textAlign: 'center', marginTop: '20px' }}
            />
            </Card>
        </div>
  )
}

export default Blogs