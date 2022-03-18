import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, Card } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useUxios from '../../hooks/useUxios';
import ErrorComponent from '../ErrorComponent/index';
import Loading from '../Loading/index';
import { loginAC } from '../../redux/sagas/sagasAC';
import './Login.css';
import { searchInput } from '../Search/Search'

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
    <div className='container'>
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

              // style={{ width: '600px', marginTop: '100px' }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <div className='loginFormText'>
                Войти в Veschatel:
              </div>
              <Form.Item
                // label="Email"
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
                  style={searchInput}
                />
              </Form.Item>

              <Form.Item
                // label="Password"
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
                  style={searchInput}
                />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 8,
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Войти
                </Button>
                <div className='loginFormText'>
                  Или <Link to="/signin">зарегестрируйтесь сейчас!</Link>
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
