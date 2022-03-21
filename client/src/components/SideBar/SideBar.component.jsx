import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import styled from "styled-components";
import { Link } from 'react-router-dom'

const { Sider } = Layout;

 const SideBar = () => {

	return (
				<StyledSider
						breakpoint="lg"
						collapsedWidth="0"
						onBreakpoint={broken => {
						}}
						onCollapse={(collapsed, type) => {
						}}
				>
					<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
						<Menu.Item key="1" icon={<UserOutlined/>}>
							<Link to='/'> На Главную </Link>
						</Menu.Item>
						<Menu.Item key="2" icon={<VideoCameraOutlined/>}>
							<Link to='/profile'>Начать стрим</Link>
						</Menu.Item>
						<Menu.Item key="3" icon={<UploadOutlined/>}>
							<Link to='/profile'> Загрузить ролик </Link>
						</Menu.Item>
						<Menu.Item key="4" icon={<UserOutlined/>}>
							<Link to='/profile'> Личный кабинет</Link>
						</Menu.Item>
					</Menu>
				</StyledSider>
	);
}

export default SideBar;

 const StyledSider = styled(Sider)`
	 position: fixed;
   font-weight: 700;
   font-size: 15px;
   text-align: start;
   left: 0;
   top: 70px;
 `
