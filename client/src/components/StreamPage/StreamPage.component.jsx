import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import ReactPlayer from 'react-player/lazy';
import styled from 'styled-components'
import {useSelector} from "react-redux";
import {urlForStream} from '../../utils/fetchPath'

const StreamPage = () => {
	const [stream, setStream] = useState('')
	const { streamId } = useParams();
	const currStream = useSelector(state => {
					const streamRedux = state.streams;
					return streamRedux.filter(el => el.broadcast_id === streamId)[0]
	});

	useEffect(() => {
		if(currStream) {
		setStream(currStream)
		}
	}, [stream]);




	console.log(currStream, 'stream')
	console.log(urlForStream(stream), 'URL')


	return (
			<Wrapper>

			<ReactPlayer width={'80vw'} height={'80vh'}   url={urlForStream(stream.source)} playing controls config={{file:{forceFLV:true}}}/>
			</Wrapper>

	)
};

export default StreamPage;

const Wrapper = styled.div`
	width: 500px;
	height:100vh;
`
