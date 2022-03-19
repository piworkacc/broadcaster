import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import './UserProfile.css';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { Header, Content, Footer, Sider } = Layout;

const UserProfile = () => {

  const [selectedMenuItem, setSelectedMenuItem] = useState('item1');
  const auth = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.ok) {
      navigate('/login');
    }
  }, [auth, navigate]);

  const componentsSwitch = (key) => {
    switch (key) {
      case '1':
        return (
          <h1>item1</h1>
        );
      case '2':
        return (
          <h1>item2</h1>
        );
      case '3':
        return (
          <h3>item3</h3>
        );
      default:
        break;
    }
  };

  return (
    <div className='container'>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <HelloUserName className="logo" >
            <span>Привет, Username!</span>
          </HelloUserName>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={selectedMenuItem}
            onClick={(e) =>
              setSelectedMenuItem(e.key)}
          >
            <Menu.Item
              key="1"
              icon={<UserOutlined />}
            >
              <span>Аккаунт</span>
              {/* <Link to="settings" /> */}
            </Menu.Item>
            <Menu.Item 
            key="2"
            icon={<VideoCameraOutlined/>}
            >
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          {/* <Header className="site-layout-sub-header-background" style={{ padding: 0 }} /> */}
          <Content style={{ margin: '24px 16px 0' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <DivContainer>
                <StartStreamButton>Начать стрим</StartStreamButton>
              </DivContainer>
              {componentsSwitch(selectedMenuItem)}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Veschatel ©2022</Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default UserProfile;

const HelloUserName = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  justify-content: center;
  align-items: center;
  color: white;
`
const StartStreamButton = styled.button`
    font-family: 'Robert Sans Medium', Arial, sans-serif;
    color: #fff;
    margin-right: 30px;
    width: 150px;
    height: 40px;
    background-color: #ee4540;
    border-radius: 20px;
    border: none;
    transition: scale .4s ease;
    &hover: {
      transform:scale(1.1)
    }
`
const DivContainer = styled.div`
&:hover ${StartStreamButton} {
    transform: scale(1.1);
  }
`
