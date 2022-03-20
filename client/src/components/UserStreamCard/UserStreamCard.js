import React from 'react';
import { Card } from 'antd';
import { LikeOutlined, EyeOutlined, CommentOutlined } from '@ant-design/icons';
import './UserStreamCard.css';
import styled from 'styled-components';
const {Meta} = Card;

const UserStreamCard = () => {

  return (
    <Card
      style={{ width: 300, }}
      cover={
        <img
          alt="example"
          src="https://cdnn21.img.ria.ru/images/155869/17/1558691754_161:0:1121:720_1920x0_80_0_0_06556eade8f6b713f733c22a16e04f7f.jpg"
        />
      }
    >
      <Meta
        title="Мой стрим"
      />
      <DivContainer>
        <ul className='streamStatsUl'>
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
