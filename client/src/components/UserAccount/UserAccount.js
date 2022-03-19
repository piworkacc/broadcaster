import React from 'react';
import styled from 'styled-components';

const UserAccount = () => {
  return (
    <DivContainer>
      <p>Добрейшего вечерочка</p>
      <StartStreamButton>Получить ключ для стриминга</StartStreamButton>
    </DivContainer>
  );
}

export default UserAccount;

const StartStreamButton = styled.button`
    font-family: 'Robert Sans Medium', Arial, sans-serif;
    color: #fff;
    margin-right: 30px;
    margin-bottom: 30px;
    width: 300px;
    height: 40px;
    background-color: #ee4540;
    border-radius: 20px;
    border: none;
    transition: scale .4s ease;
    &hover: {
      transform:scale(1.1)
    }
`
const DivContainer = styled.div`
&:hover ${StartStreamButton} {
    transform: scale(1.1);
  }
color: white;
`
