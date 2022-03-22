import React, { useEffect } from 'react';
import SideBar from '../SideBar/SideBar.component';
import CarouselMain from '../Carousel/CarouselMain';
import styled from 'styled-components';
import CategoryList from '../CategoryList/CategoryList.component';
import { useSelector } from 'react-redux';
import Glitch from '../Glitch/Glitch';

const Main = () => {
  const streams = useSelector((state) => state.streams);

  return (
    <MainContainer>
      <TitleScreen>
        <SideBar />
        {streams.length > 0 ? <CarouselMain /> : <Glitch />}
      </TitleScreen>
      <CategoryList />
    </MainContainer>
  );
};

export default Main;

const TitleScreen = styled.section`
  display: flex;
  margin: 0 auto;
`;

const MainContainer = styled.main`
  padding-left: 200px;
`;
