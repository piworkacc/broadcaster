import React from 'react';
import {useParams} from 'react-router-dom'
import ReactPlayer from 'react-player/lazy';
import styled from 'styled-components'

const StreamPage = ({url}) => {
	const { streamId } = useParams();

	return (
			<div>
			<ReactPlayer url={url} />
			</div>

	)
};

export default StreamPage;

const Wrapper = styled.div`
display: fixed;
	
`
