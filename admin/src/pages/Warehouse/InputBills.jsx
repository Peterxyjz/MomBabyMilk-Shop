import { Table } from 'antd';
import axios from 'axios';
import { Card } from 'primereact/card';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const InputBills = () => {
    const [loading, setLoading] = useState(true);
    const [bills, setBills] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(7);

  



    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: '120vh' }}>
            <Card title="Tất cả sản phẩm" style={{ width: '90%', marginTop: '50px', height: '110vh' }}>
                <div>
                    {/* <Table
                        dataSource={products}
                        columns={columns}
                        pagination={{
                            current: currentPage,
                            pageSize: pageSize,
                            total: products.length,
                            onChange: (page, pageSize) => {
                                setCurrentPage(page);
                                setPageSize(pageSize);
                            },
                        }}
                        rowKey="_id"
                    /> */}

                    Bảng đơn nhập hàng nè
                </div>
            </Card>
        </div>
    )
}

export default InputBills