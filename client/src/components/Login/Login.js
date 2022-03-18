import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useUxios from '../../hooks/useUxios';
import ErrorComponent from '../ErrorComponent/index';
import Loading from '../Loading/index';
import { loginAC } from '../../redux/sagas/sagasAC';

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const { error, loading, uxios } = useUxios();
  console.log('kukech');
  useEffect(() => {
    if (auth.ok) {
      navigate('/');
    }
  }, [auth, navigate]);

  const onFinish = (values) => {
    console.log('OnFinish success:', values);
    setInputs({
      ...inputs,
      values,
    });
    dispatch(loginAC({ user: values, service: { error, loading, uxios } }));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Введите свой email!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Введите пароль',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
      <ErrorComponent message={error} />
      <Loading loading={loading} />
    </Form>
  );
};

export default Login;
