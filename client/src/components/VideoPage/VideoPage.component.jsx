import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import ReactPlayer from 'react-player/lazy';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {addLikeAC} from "../../redux/actionCreators/addLikeAC";
import {HeartOutlined} from '@ant-design/icons';
import {getStreamLikesAC} from '../../redux/actionCreators/getStreamLikesAC';
import CommentSection from '../CommentSection/CommentSection';

const VideoPage = () => {
  const [video, setVideo] = useState('');
  const [streamLikes, setstreamLikes] = useState([])
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useDispatch();
  const {videoId} = useParams();
  const currVideo = useSelector((state) => {
    const videoRedux = state.videos;

    return videoRedux.filter((el) => el.broadcast_id === videoId)[0];
  });

  const currUser = useSelector(state => state?.auth.id)
  const likes = useSelector(state => state?.likes)


  const LikeHandler = () => {
    dispatch(addLikeAC({stream_id: currVideo.id, user_id: currUser}))
    setstreamLikes(likes)
    setIsLiked(!isLiked)
  }

  useEffect(() => {
    dispatch(getStreamLikesAC({stream_id: currVideo.id}))

  }, [likes])

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
        <StyledLikeContainer style={isLiked ? {backgroundColor: '#ee4540'} : {backgroundColor: 'transparent'} }>
          <StyledLikeBtn onClick={() => LikeHandler()}/>
          <span>{
            streamLikes?.length}
        </span>
        </StyledLikeContainer>
        <CommentSection key={currVideo.id} stream_id={currVideo.id}/>
      </Wrapper>
  );
};

export default VideoPage;

const Wrapper = styled.div`


  width: 100%;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 0 5px 5px 5px;
  align-content: center;
  align-items: stretch;
  min-height: 100vh;
  // overflow: scroll;
  // align-content: center;
`;

const StyledLikeBtn = styled(HeartOutlined)`
  width: 30px;
  height: 30px;
`
const StyledLikeContainer = styled.div`
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
`
