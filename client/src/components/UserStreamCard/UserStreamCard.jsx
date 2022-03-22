import React from 'react';
import { Card } from 'antd';
import { LikeOutlined, EyeOutlined, CommentOutlined } from '@ant-design/icons';
import './UserStreamCard.css';
import styled from 'styled-components';
const { Meta } = Card;

const UserStreamCard = ({ id, title, preview, start }) => {
  const date = start.match(/\d{4}.\d{2}.\d{2}/gm)
  const time = start.match(/\d{2}[:]\d{2}/)
  return (
    <StyledCard
      cover={
        <StyledImg
          alt="example"
          src={preview || "https://static-asset-delivery.hasbroapps.com/5d7b4adf060f3d11eb9e4b5f9308b71d76daa602/00cfe4aebd9c884acccb8da569176b8e.png"}
          style={{borderTopLeftRadius: '15px', borderTopRightRadius: '15px'}}
        />
      }
    >
      <Meta
        title={title}
        style={{fontWeight: '800px', fontSize: '18px'}}
      />
      <DivContainer>
        <StyledList className='streamStatsUl'>
          <StyledLi>
            Время стрима: {`${time} / ${date}`}
          </StyledLi>
          <StyledLi>
            <EyeOutlined />Просмотры <span>1000</span>
          </StyledLi>
          <StyledLi>
            <LikeOutlined />Лайки <span>100</span>
          </StyledLi>
          <StyledLi>
            <CommentOutlined />Комментарии <span>10</span>
          </StyledLi>
        </StyledList>
      </DivContainer>
    </StyledCard>
  );
}

export default UserStreamCard;

const StyledCard = styled(Card)`
  width: 300px;
  background-color: #222;
  border-radius: 15px;
  object-fit:cover;


`


const DivContainer = styled.div`
  max-width: 350px;
  height: 120px;
  display: flex;
  color: #fff;
  background-color: #222;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;

`
const StyledLi = styled.li`
  width: 100%;
  border-bottom: 1px solid #434343;
  padding-top: 5px;
  display:flex;
  align-items: center;
  justify-content: space-between;
`

const StyledList = styled.ul`
  padding:0;
`

const StyledImg = styled.img`
  width: 100%;
  height: 180px;
  border: 1px solid transparent;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
`
