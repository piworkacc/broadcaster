import React from 'react';
import SideBar from "../SideBar/SideBar.component";
import CarouselMain from "../Carousel/CarouselMain";
import styled from 'styled-components'
import CategoryList from "../CategoryList/CategoryList.component";


const Main = () => {
	return (
			<MainContainer>
			<TitleScreen>
				<SideBar/>
				<CarouselMain />
			</TitleScreen>
				<CategoryList/>
			</MainContainer>

	)
};

export default Main;


const TitleScreen = styled.section`
	display: flex;
	margin: 0 auto;
`

const MainContainer = styled.main`
  padding-left: 200px;

`
