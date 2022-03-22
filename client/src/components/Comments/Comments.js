import { Comment, Avatar } from 'antd';
import './Comments.css';

const Comments = ({ children, value }) => (
  <Comment className='videoPageComment'
    actions={[<span key="comment-nested-reply-to">Ответить</span>]}
    author={<a>Ёж</a>}
    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="hedgehog" />}
    content={
      <p>
        {value}
      </p>
    }
  >
    {children}
  </Comment>
);

export default Comments;
