import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import './UserProfile.css';

const { Header, Content, Footer, Sider } = Layout;

const UserProfile = () => {

  const [selectedMenuItem, setSelectedMenuItem] = useState('item1');

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
          <div className="logo" />
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
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
          <Content style={{ margin: '24px 16px 0' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              content
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
