import { Comment, Avatar, List, Tooltip } from 'antd';
import React, { useState, createElement } from 'react';
// import { LikeOutlined, LikeFilled, DislikeFilled, DislikeOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import moment from 'moment';
import './CommentSection.css';
import CommentEditor from '../CommentEditor/CommentEditor';

const CommentList = ({ comments }) => (
  <List
    header={comments.length > 1 ? `Всего комментариев: ${comments.length}` : 'Ответить'}
    dataSource={comments}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const CommentSection = () => {
  // const [likesCount, setLikesCount] = useState(0);
  // const [dislikesCount, setDislikesCount] = useState(0);
  // const [action, setAction] = useState(null);
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (!value) {
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setValue('');
      setComments([
        ...comments,
        {
          author: 'Han Solo',
          avatar: 'https://joeschmoe.io/api/v1/random',
          content: <p style={{ color: 'white' }}>{value}</p>,
          datetime: moment().fromNow(),
        },
      ]);
    }, 1000);
  };

  const handleChange = e => {
    setValue(e.target.value);
  };

  return (
    <CommentSectionWrapper>
      {/* <h4 style={{ color: 'white' }}>Оставьте комментарий:</h4> */}
      {comments.length > 0 && <CommentList comments={comments} />}
      <Comment
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
          author={<a style={{ color: 'white' }}>UserName</a>}
          content={
            <CommentEditor
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />

      {/* <div style={{ display: 'block', width: 700, padding: 30 }}>
        <h4 style={{ color: 'white' }}>Оставьте комментарий (версия с лайками/дислайками):</h4>

        <Comment
          author={<a style={{ color: 'white' }}>UserName</a>}
          avatar={<Avatar style={{ backgroundColor: 'green' }}>G</Avatar>}
          content={
            <p>I am sample comment. I am good, what about you? </p>
          }
          actions={[
            <Tooltip title="Like">
              <span onClick={() => {
                setLikesCount(prev => prev + 1);
                setAction('liked');
              }}>
                {React.createElement(action === 'liked' ?
                  LikeFilled : LikeOutlined)}
                <div style={{ color: 'white' }}>{likesCount}</div>
              </span>
            </Tooltip>,
            <Tooltip title="Dislike" style={{ color: 'white' }}>
              <span onClick={() => {
                setDislikesCount(prev => prev + 1);
                setAction('disliked');
              }}>
                {React.createElement(action === 'disliked' ?
                  DislikeFilled : DislikeOutlined)}
                <div style={{ color: 'white' }}>{dislikesCount}</div>
              </span>
            </Tooltip>
          ]}
          datetime={
            <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
              <span>{moment().fromNow()}</span>
            </Tooltip>
          }
        />
      </div> */}
    </CommentSectionWrapper>
  );
}

export default CommentSection;

const CommentSectionWrapper = styled.div`
color: white;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 0px 5px 5px 5px;
  // overflow: scroll;
  // align-items: stretch;
  // height: 40vh;
  overflow: auto;
  overflow-x: hidden;
`;
