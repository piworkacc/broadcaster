import React from 'react';
import '@splidejs/splide/dist/css/splide.min.css';
import horizon from '../../images/horizon.jpeg';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HeartOutlined } from '@ant-design/icons';

const CarouselMain = ({ id }) => {
  const nav = useNavigate();
  const streams = useSelector((state) => state.streams);

  return (
    <StyledSplide
      options={{
        rewind: true,
      }}
    >
      {streams.map((el) => (
        <StyledSplideSide key={el?.id}>
          <StyledStreamTitle>{el?.title}</StyledStreamTitle>
          <StyledUser>@{el?.User.name}</StyledUser>
          <Img
            key={el?.id}
            src={el?.preview || horizon}
            broadcast_id={el?.broadcast_id}
            onClick={() => nav(`streams/${el.broadcast_id}`)}
          />
          <StyledLike>
            <StyledLikeIcon /> 78
          </StyledLike>
        </StyledSplideSide>
      ))}
    </StyledSplide>
  );
};

export default CarouselMain;

const Img = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  cursor: pointer;

  &:hover {
    transition: 0.4s ease-in-out;
    opacity: 0.3;
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.7;
    z-index: 2;
  }
`;

const StyledSplideSide = styled(SplideSlide)`
  height: 800px;
  object-fit: cover;
  &:hover {
    transition: 0.3s;
    opacity: 1;
  }
`;
// &:before {
//   content: '▶';
//   display: block;
//   font-size: 20px;
//   line-height: 20px;
//   color: #fff;
//   background-color: #ee4540;
//   border-radius: 50%;
//   background-position: center;
//   position: absolute;
//   padding: 12px 10px 10px 12px;
//   top: 47%;
//   left: 47%;
//   z-index: 2;
//   opacity: 1;
//   cursor: pointer;
// }

const StyledSplide = styled(Splide)`
  height: 100%;
`;
const StyledStreamTitle = styled.h3`
  font-size: 30px;
  line-height: 34px;
  color: #fff;
  position: relative;
  right: 30%;
  top: 100px;
  z-index: 2;
  font-weight: 800;
  letter-spacing: 3px;
`;
const StyledUser = styled.span`
  font-size: 20px;
  line-height: 24px;
  color: #fff;
  position: relative;
  left: 38%;
  top: 55px;
  z-index: 2;
  font-weight: 800;
  letter-spacing: 5px;
`;

const StyledLike = styled.div`
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  top: -200px;
  left: 85%;
  width: 80px;
  background-color: #222;
  font-size: 20px;
  border: 1px solid #ee4540;
  border-radius: 25px;
  color: #fff;
  transition: 0.4s transform ease;
  z-index: 3;

  &:hover {
    cursor: pointer;
    transform: scale(1.15);
  }
`;

const StyledLikeIcon = styled(HeartOutlined)`
  padding: 0;
  position: relative;
  width: 50px;
  font-size: 20px;
  color: #ee4540;
  z-index: 3;
`;
