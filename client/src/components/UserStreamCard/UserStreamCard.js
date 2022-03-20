import React from 'react';
import { Card } from 'antd';
import { LikeOutlined, EyeOutlined, CommentOutlined } from '@ant-design/icons';
import './UserStreamCard.css';
import styled from 'styled-components';
const { Meta } = Card;

const UserStreamCard = ({ id, title, preview, stream_key }) => {

  return (
    <Card
      style={{ width: 300, }}
      cover={
        <img
          alt="example"
          src={preview || "https://static-asset-delivery.hasbroapps.com/5d7b4adf060f3d11eb9e4b5f9308b71d76daa602/00cfe4aebd9c884acccb8da569176b8e.png"}
        />
      }
    >
      <Meta
        title={title}
      />
      <DivContainer>
        <ul className='streamStatsUl'>
          <li>
            Stream_key: {stream_key}
          </li>
          <li>
            <EyeOutlined /> <span>1000</span>
          </li>
          <li>
            <LikeOutlined /> <span>100</span>
          </li>
          <li>
            <CommentOutlined /> <span>10</span>
          </li>
        </ul>
      </DivContainer>
    </Card>
  );
}

export default UserStreamCard;


const DivContainer = styled.div`
display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-content: flex-start;
    align-items: center;
`
