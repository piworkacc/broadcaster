import React from 'react';
import '@splidejs/splide/dist/css/splide.min.css';

import eR from '../../images/elden_ring.jpeg'
import horizon from '../../images/horizon.jpeg'
import valhalla from '../../images/valhalla.jpeg'
import styled from 'styled-components'



import { Splide, SplideSlide } from '@splidejs/react-splide';

const CarouselMain = () => {
	return (
			<StyledSplide
					options={ {
						rewind: true,
					} }
			>
				<StyledSplideSide>
					<Img src={horizon} alt="Image 1"/>
				</StyledSplideSide>
				<StyledSplideSide>
					<Img src={valhalla} alt="Image 2"/>
				</StyledSplideSide>
				<StyledSplideSide>
					<Img src={eR} alt="Image 3"/>
				</StyledSplideSide>
			</StyledSplide>
	);
}

export default CarouselMain;


const Img = styled.img`
	object-fit: cover;
	width: 100%;
	height: 100%;
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
  height: 500px;
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
