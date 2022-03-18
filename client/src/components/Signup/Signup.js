import { Form, Input, Button } from 'antd';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useUxios from "../../hooks/useUxios";
import ErrorComponent from '../ErrorComponent/index';
import Loading from '../Loading/index';
import { registerAC } from '../../redux/sagas/sagasAC';

const Signup = () => {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const { error, loading, uxios } = useUxios();
  
  useEffect(() => {
    if (auth.ok) {
      navigate('/');
    }
  }, [auth, navigate]);

  const onFinish = (values) => {
    console.log('Success:', values);
    setInputs({
      ...inputs,
      values,
    });
    dispatch(registerAC({ user: values, service: { error, loading, uxios } })); 
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
        label="Username"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Useremail"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
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
            message: 'Please input your password!',
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
          Submit
        </Button>
      </Form.Item>
      <ErrorComponent message={error} />
      <Loading loading={loading} />
    </Form>
  );
};

export default Signup;
