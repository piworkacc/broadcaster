import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, Card } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useUxios from '../../hooks/useUxios';
import ErrorComponent from '../ErrorComponent/index';
import Loading from '../Loading/index';
import { loginAC } from '../../redux/sagas/sagasAC';
import './Login.css';
import Particle from "../Particles/Particles.component";

const Login = () => {
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
    <div className='container'>
      <Particle />
      <Row>
        <Col span={12} offset={6}>
          <Card
            className="login-form-card"
            style={{ marginTop: '100px' }}
          >
            <Form
              name="basic"
              className="login-form"
              wrapperCol={{
                span: 24,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <h2 className='loginFormText'>
                Войти в <span className='veshatel'>Veschatel</span>
              </h2>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Введите свой email!',
                  },
                ]}
              >
                <Input
                  placeholder="email"
                  className='login-input'
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Введите пароль',
                  },
                ]}
              >
                <Input
                  type="password"
                  placeholder="пароль"
                  className='login-input'
                />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 8,
                }}
              >
                <div className="subContainer">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Войти
                </Button>
                <div className='loginFormText'>
                  Или <Link to="/signup">зарегистрируйтесь сейчас!</Link>
                </div>

                </div>

              </Form.Item>
              <div className='errorText'>
                <ErrorComponent message={error} />
                <Loading loading={loading} />
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
