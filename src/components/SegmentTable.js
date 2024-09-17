import React, { useState, useMemo } from 'react';
import { Table, Button, Modal, message } from 'antd';
import SegmentForm from './Segment';
import { LeftOutlined,PlusOutlined} from '@ant-design/icons';
import './segment.scss';

const SegmentTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [segments, setSegments] = useState([]);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleSaveSegment = (newSegment) => {
    setSegments((prev) => [...prev, newSegment]);
    message.success('Segment added successfully!');
    handleCancel();
  };

  const columns = useMemo(
    () => [
      {
        title: 'Segment Name',
        dataIndex: 'segment_name',
        key: 'segment_name',
      },
      {
        title: 'Schema',
        dataIndex: 'schema',
        key: 'schema',
        render: (schema) =>
          schema?.map((item, index) => (
            <div key={index}>{`${Object?.values(item)}`}</div>
          )),
      },
    ],
    []
  );

  return (
    <div className={`segment-table-container ${isModalVisible ? 'blur-background' : ''}`}>
      <div className="table-container">
        <div className="table-header">
          <Button className='green-button' icon={<PlusOutlined />} onClick={showModal} style={{ float: 'right' }}>
            Add Segment
          </Button>
          <h2>Segment Table</h2>
        </div>
      </div>
      <Table dataSource={segments} columns={columns} rowKey="segmentName" />

      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
        className="slide-in-modal"
        closable={false}
        style={{ top: 0, right: 0, position: 'absolute', width: '25%', height: '100%' }}
        maskStyle={{ backdropFilter: 'blur(8px)' }}
        title={
          <div className="custom-modal-header">
            <span className="close-icon" onClick={handleCancel}><LeftOutlined /></span>
            <span className="modal-title-text">Saving Segment</span>
          </div>
        }
      >
        <SegmentForm onSave={handleSaveSegment} onClose={handleCancel} />
      </Modal>
    </div>
  );
};

export default SegmentTable;

