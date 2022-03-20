import React, {useEffect} from 'react';
import SideBar from "../SideBar/SideBar.component";
import CarouselMain from "../Carousel/CarouselMain";
import styled from 'styled-components'
import CategoryList from "../CategoryList/CategoryList.component";
import {useDispatch} from "react-redux";
import {getAllStreamsAC} from '../../redux/actionCreators/getAllStreamsAC'
import {getAllVideosAC} from "../../redux/actionCreators/getAllVideosAC";


const Main = () => {
	const dispatch = useDispatch();
	const getStreams = () => {
		dispatch(getAllStreamsAC())
	}

	const getVideos = () => {
		dispatch(getAllVideosAC())
	}

	useEffect(() => {
		getStreams()
		getVideos()
	},[])




	return (
			<MainContainer>
			<TitleScreen>
				<SideBar/>
				<CarouselMain/>
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
