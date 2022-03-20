import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player/lazy';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { urlForStream } from '../../utils/fetchPath';

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
      console.log(video.source);
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
    </Wrapper>
  );
};

export default VideoPage;

const Wrapper = styled.div`
  width: 500px;
  height: 100vh;
`;
