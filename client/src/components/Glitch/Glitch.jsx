import React from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom'



const Glitch = () => {
	const nav = useNavigate();
	return (
			<GlitchStyled onClick={()=> nav(`/profile`)} data-text="NO ONE STREAMING, BE FIRST!">
				NO ONE STREAMING, BE FIRST!
			</GlitchStyled>
	)
};

export default Glitch;

const GlitchStyled = styled.div`
    color: white;
    font-size: 35px;
    position: relative;
    margin: 0 auto;
		cursor:pointer;
  @keyframes noise-anim {
    0% {
      clip: rect(15px, 9999px, 6px, 0);
    }
    5% {
      clip: rect(21px, 9999px, 72px, 0);
    }
    10% {
      clip: rect(79px, 9999px, 93px, 0);
    }
    15% {
      clip: rect(98px, 9999px, 67px, 0);
    }
    20% {
      clip: rect(89px, 9999px, 78px, 0);
    }
    25% {
      clip: rect(100px, 9999px, 17px, 0);
    }
    30% {
      clip: rect(55px, 9999px, 10px, 0);
    }
    35% {
      clip: rect(92px, 9999px, 20px, 0);
    }
    40% {
      clip: rect(26px, 9999px, 24px, 0);
    }
    45% {
      clip: rect(80px, 9999px, 60px, 0);
    }
    50% {
      clip: rect(93px, 9999px, 23px, 0);
    }
    55% {
      clip: rect(27px, 9999px, 17px, 0);
    }
    60% {
      clip: rect(4px, 9999px, 17px, 0);
    }
    65% {
      clip: rect(41px, 9999px, 18px, 0);
    }
    70% {
      clip: rect(30px, 9999px, 7px, 0);
    }
    75% {
      clip: rect(96px, 9999px, 77px, 0);
    }
    80% {
      clip: rect(59px, 9999px, 50px, 0);
    }
    85% {
      clip: rect(93px, 9999px, 83px, 0);
    }
    90% {
      clip: rect(74px, 9999px, 21px, 0);
    }
    95% {
      clip: rect(46px, 9999px, 100px, 0);
    }
    100% {
      clip: rect(87px, 9999px, 93px, 0);
    }
  }
   &:after {
    content: attr(data-text);
    position: absolute;
    left: 2px;
    text-shadow: -1px 0 red;
    top: 0;
    color: white;
    background: black;
    overflow: hidden;
    clip: rect(0, 900px, 0, 0);
    animation: noise-anim 2s infinite linear alternate-reverse;
  }

  @keyframes noise-anim-2 {
    0% {
      clip: rect(6px, 9999px, 86px, 0);
    }
    5% {
      clip: rect(54px, 9999px, 100px, 0);
    }
    10% {
      clip: rect(20px, 9999px, 16px, 0);
    }
    15% {
      clip: rect(50px, 9999px, 77px, 0);
    }
    20% {
      clip: rect(85px, 9999px, 35px, 0);
    }
    25% {
      clip: rect(35px, 9999px, 87px, 0);
    }
    30% {
      clip: rect(84px, 9999px, 36px, 0);
    }
    35% {
      clip: rect(4px, 9999px, 98px, 0);
    }
    40% {
      clip: rect(49px, 9999px, 67px, 0);
    }
    45% {
      clip: rect(54px, 9999px, 53px, 0);
    }
    50% {
      clip: rect(92px, 9999px, 9px, 0);
    }
    55% {
      clip: rect(21px, 9999px, 28px, 0);
    }
    60% {
      clip: rect(19px, 9999px, 16px, 0);
    }
    65% {
      clip: rect(31px, 9999px, 20px, 0);
    }
    70% {
      clip: rect(67px, 9999px, 28px, 0);
    }
    75% {
      clip: rect(63px, 9999px, 35px, 0);
    }
    80% {
      clip: rect(26px, 9999px, 5px, 0);
    }
    85% {
      clip: rect(35px, 9999px, 16px, 0);
    }
    90% {
      clip: rect(64px, 9999px, 57px, 0);
    }
    95% {
      clip: rect(9px, 9999px, 91px, 0);
    }
    100% {
      clip: rect(97px, 9999px, 27px, 0);
    }
  }
 	 &:before {
    content: attr(data-text);
    position: absolute;
    left: -2px;
    text-shadow: 1px 0 blue;
    top: 0;
    color: white;
    background: black;
    overflow: hidden;
    clip: rect(0, 900px, 0, 0);
    animation: noise-anim-2 3s infinite linear alternate-reverse;
  }	
`
