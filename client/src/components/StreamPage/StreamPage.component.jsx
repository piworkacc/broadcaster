import React from 'react';
import {useParams} from 'react-router-dom'
import ReactPlayer from 'react-player/lazy';
import styled from 'styled-components'
import {useSelector} from "react-redux";
import {urlForStream} from '../../utils/fetchPath'
import Chat from '../Chat';

const StreamPage = ({socket}) => {
	const { streamId } = useParams();
	const stream = useSelector(state => state.streams)
	const currStream = stream.filter(el => el.broadcast_id === streamId)[0]
	return (
			<Wrapper>
			<ReactPlayer url={ urlForStream(currStream.link)}/>
      <Chat stream_id={streamId} socket={socket}/>
			</Wrapper>
	)
};

export default StreamPage;

const Wrapper = styled.div`
	position: ;
`
