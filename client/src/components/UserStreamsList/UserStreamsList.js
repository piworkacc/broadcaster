import React from 'react';
import UserStreamCard from '../UserStreamCard/UserStreamCard';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const UserStreamsList = () => {
  console.log('UserStreamsList rendered');
  const auth = useSelector((state) => state.auth);
  const currUserId = auth.id;
  const userVideos = useSelector((state) => {
    return state.videos.filter(el => el.user_id === currUserId)
  });

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
