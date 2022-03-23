import React from 'react';
import UserStreamCard from '../UserStreamCard/UserStreamCard';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const UserStreamsList = () => {
  console.log('UserStreamsList rendered');
  const auth = useSelector((state) => state.auth);
  const currUserId = auth.id;
  const userVideos = useSelector((state) => {
    return state.videos.filter((el) => el.user_id === currUserId);
  });

  return (
    <DivContainer>
      {userVideos?.map((el) => (
        <UserStreamCard
          key={el.id}
          id={el.id}
          title={el.title}
          preview={el.preview}
          start={el.start}
          broadcast_id={el.broadcast_id}
        />
      ))}
    </DivContainer>
  );
};

export default UserStreamsList;

const DivContainer = styled.div`
  margin: 0 auto;
  max-width: 1400px;
  height: 700px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 30px;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 1em;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  &::-webkit-scrollbar-thumb {
    background-color: #434343;
    outline: 1px solid #000;
  }
  &::-webkit-scrollbar-corner {
    background: rgba(0, 0, 0, 0);
  }
`;
