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
import ErrorComponent from '../ErrorComponent';
import Loading from '../Loading';
import { allComments } from '../../redux/actions/commentAction';

const CommentList = ({ comments }) => (
  <StyledList
    style={{ color: 'white' }}
    header={
      comments.length > 1
        ? `Всего комментариев: ${comments.length}`
        : 'Ответить'
    }
    dataSource={comments}
    itemLayout="horizontal"
  />
);

const CommentSection = ({ stream_id }) => {
  const videoComments = useSelector((state) => state.comments);
  const auth = useSelector((state) => state.auth);
  // const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  const { error, loading, uxios } = useUxios();
  const dispatch = useDispatch();
  const getAllComments = (stream_id) => {
    dispatch(
      getAllCommentsAC({
        stream_id: stream_id,
        service: { error, loading, uxios },
      }),
    );
  };

  useEffect(() => {
    getAllComments(stream_id);
    setShowComments(true);
    return () => {
      dispatch(allComments([]));
    };
  }, []);

  const handleSubmit = () => {
    if (!value) {
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setValue('');
      dispatch(
        createNewCommentAC({
          user_id: auth.id,
          stream_id: stream_id,
          comment: value,
          service: { error, loading, uxios },
        }),
      );
    }, 1000);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    showComments && (
      <>
        <ErrorComponent error={error} />
        <Loading loading={loading} />
        <CommentSectionWrapper>
          {videoComments.length > 0 && <CommentList comments={videoComments} />}
          {auth.ok && (
            <StyledComment
              className="commentSectionInput"
              avatar={
                <Avatar
                  src="https://joeschmoe.io/api/v1/random"
                  alt={auth.name}
                />
              }
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
          )}
          {videoComments?.map((el) => (
            <StyledComment
              author={el.User.name}
              key={el.id}
              id={el.id}
              content={el.comment}
              datetime={
                <Moment format="YYYY-MM-DD HH:mm:ss">{el.createdAt}</Moment>
              }
            />
          ))}
        </CommentSectionWrapper>
      </>
    )
  );
};

export default CommentSection;

const CommentSectionWrapper = styled.div`
  color: #fff;
  align-self: flex-start;
  max-width: 800px;
  width: 100%;
  margin-top: 1%;
  margin-left: 2%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  //width: 100%;
  //color: white;
  //display: flex;
  //justify-content: stretch;
  //flex-wrap: wrap;
  //flex-direction: column;
  //align-items: center;
  //overflow: auto;
  //overflow-x: hidden;
`;

// CommentList

const StyledList = styled(List)`
  font-weight: 700;
  font-size: 20px;
`;
const StyledComment = styled(Comment)`
  width: 100%;
  text-align: start;
  box-shadow: 2px 2px 10px #434343;
`;
