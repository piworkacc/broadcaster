import React from 'react';
import style from './Header.module.css';
import logo from '../../images/logo.png'
import SearchInput from "../Search/Search.component";
import { UserOutlined} from "@ant-design/icons";

const Header = () => {
	return (
			<header className={style.header}>
				<img  className={style.header__logo} src={logo} alt="logo"/>
				<SearchInput />
				<button className={style.header__signInBtn}><UserOutlined /> Войти</button>
			</header>
	)
};

export default Header;
