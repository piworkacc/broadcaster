import React, { useEffect } from 'react';
import UserStreamCard from '../UserStreamCard/UserStreamCard';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import useUxios from '../../hooks/useUxios';
import { getUserVideos } from '../../redux/actions/videoAction';
import { getUserVideosAC } from '../../redux/sagas/sagasAC';

const UserStreamsList = () => {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videos);
  const auth = useSelector((state) => state.auth);
  const { error, loading, uxios } = useUxios();
  const currUserId = auth.id;

  useEffect(() => {
    dispatch(getUserVideosAC({ currUserId, services: { error, loading, uxios }}))
}, [currUserId, dispatch]);

return (
  <DivContainer>
    <UserStreamCard />
    {/* {videos?.map((el) => (
      <UserStreamCard key={el.id} id={el.id} title={el.title} preview={el.preview} />
    ))} */}
  </DivContainer>
);
}

export default UserStreamsList;

const DivContainer = styled.div`
display: flex;
flex-wrap: wrap;
flex-direction: row;
justify-content: space-around;
`
