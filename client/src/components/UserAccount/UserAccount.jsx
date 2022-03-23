import React, {useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import Gravatar from 'react-gravatar'
import './UserAccount.css'

const UserAccount = () => {

  const [userName, setUserName] = useState('anonymous');
  const user = useSelector(state => state.auth);

  useEffect(() => {
    if (user.name) {
      setUserName(user.name);
    }
  }, [user])
  

  return (
    <DivContainer>
      <div style={{display:'flex', 'flex-direction': 'column' }}>
        <Gravatar email="mathews.kyle@gmail.com" size={250} rating="x" default="404" className='avatar'/>
        <p>Добрейшего вечерочка {userName} !</p>
      </div>
    </DivContainer>
  );
}

export default UserAccount;

const DivContainer = styled.div`
color: white;
display: flex;
justify-content: center;
`
