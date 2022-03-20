import React from 'react';
import { Statistic, Row, Col } from 'antd';
import { LikeOutlined } from '@ant-design/icons';

const UserStats = () => {
  return (
    <Row gutter={16}>
      <Col span={12}>
        <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} />
      </Col>
      <Col span={12}>
        <Statistic title="Active Users" value={112893} />
      </Col>
    </Row>
  );
}

export default UserStats;
