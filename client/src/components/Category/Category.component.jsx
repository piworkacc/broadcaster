import React from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HeartOutlined } from '@ant-design/icons';

const Category = ({ title }) => {
  const videos = useSelector((state) => state.videos);
  const nav = useNavigate();
  const videosToRender = videos.filter((el) =>
    el.Tags.some((someEl) => someEl.tag === title),
  );
  return (
    <CatergoryLi>
      <Title>{title}</Title>
      <Splide
        options={{
          perPage: 4,
          rewind: true,
          maxWidth: '2000px',
          gap: 40,
        }}
      >
        {videosToRender?.map((el) => (
          <SlideContainer key={el.id}>
            <StyledStreamTitle>{el.title}</StyledStreamTitle>
            <StyledUser>@ {el.User.name}</StyledUser>
            <Img
              key={el.broadcast_id}
              src={
                el.preview ??
                'https://twizz.ru/wp-content/uploads/2016/06/%D0%BF%D1%80%D0%B5%D0%B2%D1%8C%D1%8E-19.jpg'
              }
              broadcast_id={el.broadcast_id}
              onClick={() => nav(`videos/${el.broadcast_id}`)}
            />
            <StyledLike>
              <StyledLikeIcon /> 78
            </StyledLike>
          </SlideContainer>
        ))}
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
  margin-top: 50px;

  &:after {
    content: '';
    display: block;
    position: relative;
    height: 20px;
    width: 280px;
    left: 0;
    top: 0;
    border-bottom: 2px solid #ee4540;
    z-index: 2;
  }
`;

const SlideContainer = styled(SplideSlide)`
  width: 300px;
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
  max-width: 100%;
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

const StyledStreamTitle = styled.h3`
  font-size: 15px;
  line-height: 20px;
  color: #fff;
  position: relative;
  right: 0;
  top: 20px;
  z-index: 1;
  font-weight: 800;
  letter-spacing: 5px;
  background: rgba(34, 34, 34, 0.7);
`;

const StyledUser = styled.span`
  font-size: 20px;
  line-height: 24px;
  background: rgba(34, 34, 34, 0.7);
  padding: 5px;
  border: 1px solid #222;
  border-radius: 10px;
  color: #fff;
  position: relative;
  right: 40%;
  top: 75%;
  z-index: 2;
  font-weight: 600;
`;

const StyledLike = styled.div`
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  top: -80px;
  left: 85%;
  width: 70px;
  background: rgba(34, 34, 34, 0.5);
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
  width: 40px;
  font-size: 15px;
  color: #ee4540;
  z-index: 3;
  margin-right: 10px;
`;
