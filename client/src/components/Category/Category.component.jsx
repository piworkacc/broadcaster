import React from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import viking from '../../images/valhalla.jpeg';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Category = ({ title }) => {
  const videos = useSelector((state) => state.videos);
  console.log(videos)
  const nav = useNavigate();
  return (
    <CatergoryLi>
      <Title>{title}</Title>
      <Splide
        options={{
          perPage: 6,
          rewind: true,
          maxWidth: '100%',
          gap: 40,
        }}>
        {videos?.map((el) => (
          <SlideContainer key={el.id}>
            <Img
              key={el.broadcast_id}
              src={el.preview ?? viking}
              broadcast_id={el.broadcast_id}
              onClick={() => nav(`videos/${el.broadcast_id}`)}
            />
          </SlideContainer>
        ))}
        1
      </Splide>
    </CatergoryLi>
  );
};

export default Category;

const Title = styled.h2`
  color: #f9fafb;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-bottom: 1px solid #393939;
  text-align: start;

  &:after {
    content: '';
    display: block;
    position: relative;
    height: 20px;
    width: 280px;
    left: 0;
    top: 0px;
    border-bottom: 2px solid #ee4540;
    z-index: 2;
  }
`;

const SlideContainer = styled(SplideSlide)`
  width: 250px;
  height: 200px;
  margin: 20px;

  &:hover {
    transition: 0.3s;
    opacity: 1;

    &:before {
      content: '▶';
      display: block;
      font-size: 20px;
      line-height: 20px;
      color: #fff;
      background-color: #ee4540;
      border-radius: 50%;
      background-position: center;
      position: absolute;
      padding: 12px 10px 10px 12px;
      top: 45%;
      left: 50%;
      z-index: 2;
      opacity: 1;
      cursor: pointer;
    }
  }
`;
const Img = styled.img`
  max-width: 230px;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;

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

const CatergoryLi = styled.li`
  padding-left: 30px;
`;
