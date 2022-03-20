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
		if(currStream.length === 1) {
			setStream(currStream[0].stream)
		}
	}, [currStream.length && currStream[0].stream]);

	return (
			<Wrapper>
				{/*<ReactPlayer  url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />*/}
			<ReactPlayer  url={urlForStream(stream.source)} playing controls config={{file:{forceFLV:true}}}/>
			</Wrapper>

	)
};

export default StreamPage;

const Wrapper = styled.div`

`


//config={{
// 				file:{
// 					forceFLV: true,
// 				}
// 			}}
