import React from 'react';
import ReactPlayer from "react-player/lazy";
import styled from 'styled-components';


const Stream = ({ title, url, broadcast_id}) => {
	return (
			<Wrapper>
				<h3>{title}</h3>
				<ReactPlayer title={title} url={url} broadcast_id={broadcast_id} />
			</Wrapper>
	)
};

export default Stream;

const Wrapper = styled.div`
	max-width: 100%;
	min-height: 100%;
`
