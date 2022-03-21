import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import ReactPlayer from 'react-player/lazy';
import styled from 'styled-components'
import {useSelector} from "react-redux";
import {urlForStream} from '../../utils/fetchPath'
import Chat from '../Chat'
import './StreamPage.css'

const StreamPage = ({socket}) => {
	const [stream, setStream] = useState('')
	const { streamId } = useParams();
	const currStream = useSelector(state => {
					const streamRedux = state.streams;
					return streamRedux.filter(el => el.broadcast_id === streamId)[0]
	});

  const auth  = useSelector(state => state.auth);
	useEffect(() => {
		if(currStream) {
		setStream(currStream)
		}
	}, [stream, currStream]);

	return (
      <div className='ChatPlayer'>
        <ReactPlayer height='80vh' width='70vw' url={urlForStream(stream.source)} playing controls config={{file:{forceFLV:true}}}/>
        <Chat socket={socket} user={auth.ok && auth} stream={currStream.id} />
      </div>
	)
};

export default StreamPage;
