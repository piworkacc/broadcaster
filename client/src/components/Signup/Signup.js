import { Form, Input, Button, Row, Col, Card } from 'antd';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import useUxios from "../../hooks/useUxios";
import ErrorComponent from '../ErrorComponent/index';
import Loading from '../Loading/index';
import { registerAC } from '../../redux/sagas/sagasAC';
import './Signup.css';
import Particle from "../Particles/Particles.component";

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
    <div className='container'>
      <Particle />
      <Row>
        <Col span={12} offset={6}>
          <Card
            className="signup-form-card"
            style={{ marginTop: '100px' }}
          >
            <Form
              name="basic"
              className="signup-form"
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
              <h2 className='signupFormText'>
                Зарегистрироваться в <span className='veshatel'>Veschatel</span>
              </h2>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Введите имя!',
                  },
                ]}
              >
                <Input
                  placeholder="Имя"
                  className='signup-input'
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Введите email!',
                  },
                ]}
              >
                <Input
                  placeholder="E-mail"
                  className='signup-input'
                />
              </Form.Item>

              <Form.Item
                // label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Введите пароль!',
                  },
                ]}
              >
                <Input
                  type="password"
                  placeholder="Придумайте пароль"
                  className='signup-input'
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
                    className="signup-form-button"
                  >
                    Отправить
                  </Button>
                  <div className='signupFormTextBottom'>
                    Или <Link to="/login">войдите в свой аккаунт</Link>
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

export default Signup;
