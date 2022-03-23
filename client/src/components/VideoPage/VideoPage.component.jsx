import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player/lazy';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { urlForStream } from '../../utils/fetchPath';
import CommentSection from '../CommentSection/CommentSection';

const VideoPage = () => {
  const [video, setVideo] = useState('');
  const { videoId } = useParams();
  const currVideo = useSelector((state) => {
    const videoRedux = state.videos;
    return videoRedux.filter((el) => el.broadcast_id === videoId)[0];
  });

  useEffect(() => {
    if (currVideo) {
      setVideo(currVideo);
    }
  }, [video]);

  return (
    <Wrapper>
      <ReactPlayer
        width={'80vw'}
        height={'80vh'}
        url={video.source}
        playing
        controls
      />
      {/* <CommentSection key={currVideo.id} stream_id={currVideo.id}/> */}
    </Wrapper>
  );
};

export default VideoPage;

const Wrapper = styled.div`
  // width: 500px;
  // height: 100vh;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 0px 5px 5px 5px;
  align-content: center;
  align-items: stretch;
  min-height: 100vh;
  // overflow: scroll;
  // align-content: center;
`;
