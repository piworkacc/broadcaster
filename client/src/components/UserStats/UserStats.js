import React from 'react';
import { Statistic, Row, Col } from 'antd';
import { LikeOutlined, EyeOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const UserStats = () => {
  return (
    <DivContainer>
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="Лайки" value={1128} prefix={<LikeOutlined />} />
        </Col>
        <Col span={12}>
          <Statistic title="Просмотры" value={112893} />
        </Col>
      </Row>
    </DivContainer>
  );
}

export default UserStats;

const DivContainer = styled.div`
color: white;
display: flex;
justify-content: center;
`
