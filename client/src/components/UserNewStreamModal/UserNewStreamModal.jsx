import React, { useState, useEffect } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Select, Form, Input, Modal, Upload, Button } from 'antd';
import ErrorComponent from '../ErrorComponent/index';
import Loading from '../Loading/index';

const UserNewStreamModal = ({ visible, onCreate, onCancel, tags, error, loading }) => {
  // console.log('Modal rendered');

  const [form] = Form.useForm();
  const [selectedTags, setselectedTags] = useState([]);

  function handleChange(selectedTags) {
    setselectedTags(selectedTags);
  }

  const uploadProps =
  {
    action: "/upload",
    listType: "picture",
    maxCount: 1,
    beforeUpload: (file) => {
      return false;
    },
  };

  const normFile = (e) => {
    return e && e.fileList;
  };

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
        {/* <Form.Item
          name="preview"
          label="Обложка"
          rules={[
            {
              required: true,
              message: 'Введите ссылку на изображение для обложки',
            },
          ]}
        >
          <Input placeholder="Путь к изображению"
            value={patToFile}
            onChange={(e) => onChangeHandler(e)}
            type="textarea"
          />
        </Form.Item> */}
        <Form.Item
          name="upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Выбрать файл</Button>
          </Upload>
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
          <ErrorComponent error={error} />
          <Loading loading={loading} />
        </div>
      </Form>
    </Modal >
  );
};

export default UserNewStreamModal;
