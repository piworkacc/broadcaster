import { Form, Button, Input } from 'antd';

const { TextArea } = Input;

const CommentEditor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Отправить
      </Button>
    </Form.Item>
  </>
);

export default CommentEditor;
