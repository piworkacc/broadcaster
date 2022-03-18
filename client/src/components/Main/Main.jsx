import React from 'react';
import SideBar from "../SideBar/SideBar.component";
import CarouselMain from "../Carousel/CarouselMain";
import styled from 'styled-components'
import CategoryList from "../CategoryList/CategoryList.component";


const Main = () => {
	return (
			<main>
			<TitleScreen>
				<SideBar/>
				<CarouselMain />
			</TitleScreen>
				<CategoryList/>
			</main>

	)
};

export default Main;


const TitleScreen = styled.section`
	display: flex;
	margin: 0 auto;
`
