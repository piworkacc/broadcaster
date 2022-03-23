import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player/lazy';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { urlForStream } from '../../utils/fetchPath';
import Chat from '../Chat';
import './StreamPage.css';
import useUxios from '../../hooks/useUxios';
import likeStreamAC from '../../redux/actionCreators/likeStreamAC';
import { getStreamLikesAC } from '../../redux/actionCreators/getStreamLikesAC';
import { HeartOutlined } from '@ant-design/icons';

const StreamPage = ({ socket }) => {
  const [stream, setStream] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useDispatch();
  const { loading, error, uxios } = useUxios();

  const { streamId } = useParams();
  const currStream = useSelector((state) => {
    const streamRedux = state.streams;
    return streamRedux.filter((el) => el.broadcast_id === streamId)[0];
  });

  const [auth, likes] = useSelector((state) => [state.auth, state.likes]);
  useEffect(() => {
    if (currStream) {
      setStream(currStream);
    }
  }, [stream, currStream]);

  const LikeHandler = () => {
    dispatch(
      likeStreamAC({
        streamId: currStream.id,
        service: { loading, error, uxios },
      }),
    );
  };

  useEffect(() => {
    setIsLiked(likes.liked);
  }, [likes]);

  useEffect(() => {
    console.log(currStream);
    dispatch(
      getStreamLikesAC({
        streamId: currStream.id,
        service: { loading, error, uxios },
      }),
    );
  }, []);

  return (
    <div className="ChatPlayer">
      <div>
        <ReactPlayer
          height="80vh"
          width="70vw"
          url={urlForStream(stream.source)}
          playing
          controls
          config={{ file: { forceFLV: true } }}
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
      </div>
      <Chat socket={socket} user={auth.ok && auth} stream={currStream.id} />
    </div>
  );
};

export default StreamPage;

const StyledLikeBtn = styled(HeartOutlined)`
  width: 30px;
  height: 30px;
`;
const StyledLikeContainer = styled.div`
  margin-left: 2%;
  align-self: flex-start;
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
`;
