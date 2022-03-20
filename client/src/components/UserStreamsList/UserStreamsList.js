import React, { useEffect } from 'react';
import UserStreamCard from '../UserStreamCard/UserStreamCard';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import useUxios from '../../hooks/useUxios';
import { getUserVideos } from '../../redux/actions/videoAction';
import { getUserVideosAC } from '../../redux/sagas/sagasAC';

const UserStreamsList = () => {
  console.log('UserStreamsList');
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const currUserId = auth.id;
  const userVideos = useSelector((state) => {
    return state.videos.filter(el => el.user_id === currUserId)
  });
  console.log(userVideos);
  // const { error, loading, uxios } = useUxios();

//   useEffect(() => {
//     dispatch(getUserVideosAC({ currUserId: currUserId, services: { error, loading, uxios }}))
// }, []);

return (
  <DivContainer>
    {userVideos?.map((el) => (
      <UserStreamCard key={el.id} id={el.id} title={el.title} preview={el.preview} stream_key={el.stream_key}/>
    ))}
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
