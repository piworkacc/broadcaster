import React from 'react';
import UserStreamCard from '../UserStreamCard/UserStreamCard';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Card, Col, Row } from 'antd';

const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

const UserStreamsList = () => {
  console.log('UserStreamsList rendered');
  const auth = useSelector((state) => state.auth);
  const currUserId = auth.id;
  const userVideos = useSelector((state) => {
    return state.videos.filter(el => el.user_id === currUserId)
  });
  const navigate = useNavigate();

  return (
    <>

      <Card title="Card Title">
        {userVideos?.map((el) => (
             <Card.Grid style={gridStyle}>
              <Card title="Card title" bordered={false}>
                Card content
                <Img key={el?.id} id={el?.id} title={el?.title} src={el?.preview} start={el?.start} broadcast_id={el?.broadcast_id}
                  onClick={() => navigate(`/streams/${el.broadcast_id}`)} />
              </Card>
             </Card.Grid>
             ))}
              
    {/* // <Card.Grid style={gridStyle}>Content</Card.Grid>
    // <Card.Grid style={gridStyle}>
    //   Content
    // </Card.Grid>
    // <Card.Grid style={gridStyle}>Content</Card.Grid>
    // <Card.Grid style={gridStyle}>Content</Card.Grid>
    // <Card.Grid style={gridStyle}>Content</Card.Grid>
    // <Card.Grid style={gridStyle}>Content</Card.Grid>
    // <Card.Grid style={gridStyle}>Content</Card.Grid> */}
  </Card>
    </>
    // <DivContainer>
    // <div className="site-card-wrapper">
    //   {/* <Row >
    //     <Col> */}
    //       {userVideos?.map((el) => (
    //         <Card title="Card title" bordered={false}>
    //           Card content
    //           <Img key={el?.id} id={el?.id} title={el?.title} src={el?.preview} start={el?.start} broadcast_id={el?.broadcast_id}
    //             onClick={() => navigate(`/streams/${el.broadcast_id}`)} />
    //         </Card>
    //       ))}
    //     {/* </Col>
    //   </Row> */}
    // </div>
    // </>
    /* {userVideos?.map((el) => (
   //   <UserStreamCard key={el.id} id={el.id} title={el.title} preview={el.preview} start={el.start}/>
   // ))} */
    // </DivContainer>
  );
}

export default UserStreamsList;

const DivContainer = styled.div`
display: flex;
flex-wrap: wrap;
flex-direction: row;
justify-content: space-around;
`
const Img = styled.img`
object-fit: cover;
width: 100%;
height: 100%;
cursor: pointer;

&:hover {
  transition: .4s ease-in-out;
  opacity: .3;
}
;

&:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: .7;
  z-index: 2;
}
`
