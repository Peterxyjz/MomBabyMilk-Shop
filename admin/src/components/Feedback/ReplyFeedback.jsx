import { Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import React from 'react'

const ReplyFeedback = ({ modalOpen, setModalOpen, selectedRecord, response, setResponse }) => {
    const handleOk = () => {
        console.log('Phản hồi:', response);
        setModalOpen(false);
        setResponse('');
      };
    
      const handleCancel = () => {
        setModalOpen(false);
        setResponse('');
      };
    return (
        <Modal
            title="Trả lời đánh giá"
            centered
            open={modalOpen}
            onCancel={handleCancel}
            onOk={handleOk}
            okText="Gửi câu trả lời"
            cancelText="Đóng"
            okButtonProps={{
              style: {
                backgroundColor: '#46B5C1',
                borderColor: '#46B5C1',
              },
            }}
            cancelButtonProps={{
              style: {
                backgroundColor: '#FF4D4F',
                borderColor: '#FF4D4F',
                color: '#FFFFFF',
              },
            }}
        >
            <p>Trả lời đánh giá của: Tên khách hàng</p>
            <TextArea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                rows={4}
                placeholder="Nhập câu trả lời của bạn"
            />
            
        </Modal>
    );
}

export default ReplyFeedback