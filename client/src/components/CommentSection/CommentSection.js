import { Comment, Avatar, List } from 'antd';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import './CommentSection.css';
import CommentEditor from '../CommentEditor/CommentEditor';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCommentsAC } from '../../redux/actionCreators/getAllCommentsAC';
import useUxios from '../../hooks/useUxios';
import { createNewCommentAC } from '../../redux/actionCreators/createNewCommentAC';

const CommentList = ({ comments }) => (
  <List
    style={{ color: 'white' }}
    header={comments.length > 1 ? `Всего комментариев: ${comments.length}` : 'Ответить'}
    dataSource={comments}
    itemLayout="horizontal"
  />
);

const CommentSection = ({ stream_id }) => {
  const videoComments = useSelector((state) => state.comments);
  const auth = useSelector((state) => state.auth);
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  const { error, loading, uxios } = useUxios();
  const dispatch = useDispatch();
  const getAllComments = (stream_id) => {
    dispatch(getAllCommentsAC({
      stream_id: stream_id,
      service: { error, loading, uxios }
    }));
  };

  useEffect(() => {
    getAllComments(stream_id);
    setComments(videoComments);
  }, [comments]);

  const handleSubmit = () => {
    if (!value) {
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setValue('');
      dispatch(createNewCommentAC({
        user_id: auth.id,
        stream_id: stream_id,
        comment: value,
        service: { error, loading, uxios },
      }));
    }, 1000);
  };

  const handleChange = e => {
    setValue(e.target.value);
  };

  return (
    <CommentSectionWrapper>
      {videoComments.length > 0 && <CommentList comments={videoComments} />}
      <Comment
        className='commentSectionInput'
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt={auth.name} />}
        author={<span style={{ color: 'white' }}>{auth.name}</span>}
        content={
          <CommentEditor
            header={'Ответить'}
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
      {videoComments?.map((el) => (
        <Comment author={el.User.name} key={el.id} id={el.id} content={el.comment} datetime={<Moment format='YYYY-MM-DD HH:mm:ss'>{el.createdAt}</Moment>} />
      ))}
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
  overflow: auto;
  overflow-x: hidden;
`;
