import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player/lazy';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { HeartOutlined } from '@ant-design/icons';
import { getStreamLikesAC } from '../../redux/actionCreators/getStreamLikesAC';
import CommentSection from '../CommentSection/CommentSection';
import useUxios from '../../hooks/useUxios';
import likeStreamAC from '../../redux/actionCreators/likeStreamAC';

const VideoPage = () => {
  const [video, setVideo] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const { loading, error, uxios } = useUxios();

  const currVideo = useSelector((state) => {
    const videoRedux = state.videos;
    return videoRedux.filter((el) => el.broadcast_id === videoId)[0];
  });

  // const currUser = useSelector((state) => state?.auth.id);
  const likes = useSelector((state) => state.likes);
  // window.scrollTo(0, 0);
  const LikeHandler = () => {
    dispatch(
      likeStreamAC({
        streamId: currVideo.id,
        service: { loading, error, uxios },
      }),
    );
  };

  useEffect(() => {
    setIsLiked(likes.liked);
  }, [likes]);

  useEffect(() => {
    dispatch(
      getStreamLikesAC({
        streamId: currVideo.id,
        service: { loading, error, uxios },
      }),
    );
  }, []);

  useEffect(() => {
    if (currVideo) {
      setVideo(currVideo);
    }
  }, [video]);

  return (
    <Wrapper>
      <ReactPlayer
        width={'100vw'}
        height={'80vh'}
        url={video.source}
        playing
        controls
      />
      <StyledLikeContainer
        style={
          isLiked
            ? { backgroundColor: '#ee4540' }
            : { backgroundColor: 'transparent' }
        }
      >
        <StyledLikeBtn onClick={() => LikeHandler()} />
        <span>{likes.likesCount}</span>
      </StyledLikeContainer>
      <CommentSection key={currVideo.id} stream_id={currVideo.id} />
    </Wrapper>
  );
};

export default VideoPage;

const Wrapper = styled.div`
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  min-height: 100vh;
  padding-top: 75px;
  // overflow: auto;
`;

const StyledLikeBtn = styled(HeartOutlined)`
  width: 30px;
  height: 30px;
`;
const StyledLikeContainer = styled.div`
  margin-left: 2%;
  align-self: flex-start;
  margin-top: 20px;
  color: #fff;
  border: 1px solid #343434;
  width: 100px;
  height: 50px;
  font-size: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-radius: 20px;
  margin-right: 20px;
`;
