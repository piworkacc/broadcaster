import React from 'react';
import UserStreamCard from '../UserStreamCard/UserStreamCard';
import styled from 'styled-components';

const UserStreamsList = () => {
  return (
    <DivContainer>
      <UserStreamCard />
      <UserStreamCard />
      <UserStreamCard />
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
