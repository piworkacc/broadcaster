import React from 'react';
import style from './Header.module.css';
import logo from '../../images/logo.png'
import SearchInput from "../Search/Search.component";
import {LogoutOutlined, UserOutlined} from "@ant-design/icons";
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';
import styled from 'styled-components';

const Header = () => {
	const auth = useSelector(state => state.auth)

	return (
			<header className={style.header}>
				<Link to='/'>
				<img  className={style.header__logo} src={logo} alt="logo"/>
				</Link>
				<SearchInput />
				<div className='signContainer'>
				{auth.ok
						? <Link to='/logout'><button className={style.header__signInBtn}><LogoutIcon />Выйти</button></Link>
						: <Link to='/login'><button className={style.header__signInBtn}><UserOutlined/> Войти</button>	</Link>
				}
				{auth.ok && <Link to='/profile'><button className={style.header__signInBtn}>Профиль</button></Link>}
				</div>

			</header>
	)
};

export default Header;

const LogoutIcon = styled(LogoutOutlined)`
	position: relative;
	top:-2px;
	left:-5px;
`
