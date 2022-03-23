import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  CopyOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import './UserProfile.css';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UserStats from '../UserStats/UserStats';
import UserStreamList from '../UserStreamsList/UserStreamsList';
import UserAccount from '../UserAccount/UserAccount';
import { getAllTagsAC } from '../../redux/actionCreators/getAllTagsAC';
import { createNewStreamAC } from '../../redux/actionCreators/createNewStreamAC';
import { getLatestKeyAC } from '../../redux/actionCreators/getLatestKeyAC';
import { removeAuth } from '../../redux/actions/userAction';
import useUxios from '../../hooks/useUxios';
import UserNewStreamModal from '../UserNewStreamModal/UserNewStreamModal';

const { Header, Content, Footer, Sider } = Layout;

const UserProfile = () => {
  const [copied, setCopied] = useState(false)
  const [visible, setVisible] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState();
  const [keys, auth, tags, streams] = useSelector((store) => [
    store.keys,
    store.auth,
    store.tags,
    store.streams,
  ]);
  const { error, loading, uxios } = useUxios();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getTags = () => {
    dispatch(getAllTagsAC());
  };

  const getLatestKey = () => {
    dispatch(getLatestKeyAC({ error, loading, uxios }));
  };

  const onCreate = (values) => {
    dispatch(
      createNewStreamAC({
        user_id: auth.id,
        title: values.title,
        preview: values.preview,
        tags: values.tags,
        service: { error, loading, uxios },
      }),
    );
    setVisible(false);
  };

  useEffect(() => {
    if (error && error.status === 401) {
      dispatch(removeAuth());
    }
  }, [error]);

  useEffect(() => {
    getTags();
    getLatestKey();
    if (!auth.ok) {
      navigate('/login');
    }
  }, [auth, navigate]);

  const componentsSwitch = (key) => {
    switch (key) {
      case '1':
        return <UserStreamList />;
      case '2':
        return <UserAccount />;
      case '3':
        return <UserStats />;
      default:
        break;
    }
  };

  const copyClickHandler = () => {
    setCopied(!copied);
    navigator.clipboard.writeText(keys);
  }
  console.log(copied)

  return (
    <StyledContainer className="container">
      <Layout>
        <Sider breakpoint="lg" collapsedWidth="0">
          <HelloUserName className="logo">
            <span>Привет, Username!</span>
          </HelloUserName>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={selectedMenuItem}
            onClick={(e) => setSelectedMenuItem(e.key)}
          >
            <Menu.Item key="1" icon={<VideoCameraOutlined />}>
              <span>Стримы</span>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              <span>Аккаунт</span>
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              <span>Статистика</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header
            className="site-layout-sub-header-background"
            style={{ padding: 0 }}
          />
          <Content style={{ margin: '24px 16px 0' }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              {/* <DivContainer> */}
                <StartStreamButton
                  type="button"
                  onClick={() => {
                    setVisible(true);
                  }}
                >
                  Начать новый стрим
                </StartStreamButton>
                <StyledKeyContainer>
                <StyledKeyText>Последний stream key: <span style={{color:'#ee4540'}}>{keys}</span> </StyledKeyText>
                <StyledCopyButton  aria-label="Скопировать"
                                    onClick={() => {copyClickHandler()}} />
                </StyledKeyContainer>
                <div>
                  <UserNewStreamModal
                    visible={visible}
                    okText="Сохранить"
                    cancelText="Отмена"
                    onCreate={onCreate}
                    onCancel={() => {
                      setVisible(false);
                    }}
                    tags={tags}
                    user_id={auth.id}
                    error={error}
                    loading={loading}
                  />
                </div>
              <p style={{ color: 'white' }}>Последний stream key: {keys}</p>
              {!selectedMenuItem && <UserStreamList />}
              {componentsSwitch(selectedMenuItem)}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Veschatel ©2022</Footer>
        </Layout>
      </Layout>
    </StyledContainer>
  );
};

export default UserProfile;

const HelloUserName = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  justify-content: center;
  align-items: center;
  color: white;
`;

const StartStreamButton = styled.button`
  font-family: 'Robert Sans Medium', Arial, sans-serif;
  color: #fff;
  margin-bottom: 30px;
  width: 200px;
  height: 40px;
  background-color: #ee4540;
  border-radius: 20px;
  border: none;
  transition: scale 0.4s ease;
  &:hover {
    transform: scale(1.1);
  }
`;
const DivContainer = styled.div`
  // &:hover ${StartStreamButton} {
  //   transform: scale(1.1);
  // }
`;

const StyledContainer = styled.div`
  margin: 0 auto;
  max-width: 1920px;
  width: 100%;
`

const StyledCopyButton = styled(CopyOutlined)`
  border: 1px solid #49a84d;
  border-radius: 10px;
  padding: 10px;
  font-size: 16px;
  margin-left: 20px;
  transition: .2s transform ease;
  &:hover {
      transform: scale(1.1);
    }
  
`

const StyledKeyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`

const StyledKeyText = styled.p`
  color: white;
  font-size: 20px;
  font-weight: 700;
  margin: 0;
`
