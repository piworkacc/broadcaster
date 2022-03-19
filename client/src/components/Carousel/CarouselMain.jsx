import React, {useEffect} from 'react';
import '@splidejs/splide/dist/css/splide.min.css';

import eR from '../../images/elden_ring.jpeg'
import horizon from '../../images/horizon.jpeg'
import valhalla from '../../images/valhalla.jpeg'
import styled from 'styled-components'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Stream from '../Stream/Stream.component'


const CarouselMain = ({id}) => {
	const nav = useNavigate()
	const streams = useSelector(state=> state.streams);

	return (
			<StyledSplide
					options={ {
						rewind: true,
					} }
			>
				{streams.map((el) => (
						<StyledSplideSide key={el.id}>
							<Img key={el.id}  src={el.img || horizon} broadcast_id={el.broadcast_id}  onClick={ ()=> nav(`streams/${el.broadcast_id}`)}/>
						</StyledSplideSide>
				))}
			</StyledSplide>
	);
}

export default CarouselMain;


const StyledLink = styled(Link)`
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: .7;
    z-index: 2;
  }
`


const Img = styled.img`
	object-fit: cover;
	width: 100%;
	height: 100%;
	cursor:pointer;
  &:hover {
    transition: .4s ease-in-out;
    opacity: .3;
    };

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: .7;
      z-index: 2;
    }
`



const StyledSplideSide = styled(SplideSlide)`
  height: 800px;
  object-fit: cover;
  &:hover {
    transition: .3s;
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
      top: 47%;
      left: 47%;
      z-index: 2;
      opacity: 1;
      cursor: pointer;
    }
  }
`

const StyledSplide = styled(Splide)`
height: 100%;
	
`
