import React, { useState } from 'react';
import { Select, Form, Input, Modal } from 'antd';
import ErrorComponent from '../ErrorComponent/index';
import Loading from '../Loading/index';

const UserNewStreamModal = ({ visible, onCreate, onCancel, tags, error, loading }) => {
  console.log('Modal rendered');

  const [form] = Form.useForm();
  const [selectedTags, setselectedTags] = useState([]);

  function handleChange(selectedTags) {
    setselectedTags(selectedTags);
  }

  return (
    <Modal
      visible={visible}
      title="Создать новый стрим"
      okText="Сохранить"
      cancelText="Отмена"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="title"
          label="Название"
          rules={[
            {
              required: true,
              message: 'Введите название вашего стрима',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="preview"
          label="Обложка"
          rules={[
            {
              required: true,
              message: 'Введите ссылку на изображение для обложки',
            },
          ]}
        >
          <Input type="textarea" />
        </Form.Item>
        <Form.Item
          name="tags"
          label="Категория"
          rules={[
            {
              required: true,
              message: 'Выберите минимум одну категорию',
            },
          ]}
        >
          <Select
            mode="multiple"
            placeholder="Выберите категории"
            value={selectedTags}
            onChange={handleChange}
            style={{ width: '100%' }}
          >
            {tags.map(item => (
              <Select.Option key={item.id} value={item.id}>
                {item.tag}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <div className='errorText'>
          <ErrorComponent message={error} />
          <Loading loading={loading} />
        </div>
      </Form>
    </Modal >
  );
};

export default UserNewStreamModal;
