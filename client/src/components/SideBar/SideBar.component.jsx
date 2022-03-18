import React from 'react';
import {menu_icon, sideBarContainer__list, subMenu, sideBarContainer} from "./SideBarStyle";
import {
	AliwangwangOutlined,
	FontSizeOutlined,
	HomeOutlined,
	LikeOutlined,
	PlayCircleOutlined, ShoppingCartOutlined,
	StarOutlined
} from "@ant-design/icons";

const SideBar = () => {
	return (
			<div style={sideBarContainer}>
				<ul style={sideBarContainer__list}>
					<li key="2" className='menu-item' style={subMenu}><HomeOutlined style={menu_icon}/><span>Home</span></li>
					<li key="3" style={subMenu} ><PlayCircleOutlined style={menu_icon} />Videos</li>
					<li key="4" style={subMenu} ><StarOutlined style={menu_icon} />Reviews</li>
					<li key="5" style={subMenu} ><LikeOutlined style={menu_icon} />Liked</li>
					<li key="6" style={subMenu} ><AliwangwangOutlined style={menu_icon} />Members</li>
					<li key="7" style={subMenu} ><FontSizeOutlined style={menu_icon} />Blog</li>
					<li key="8" style={subMenu} ><ShoppingCartOutlined style={menu_icon} />Shop</li>
				</ul>
			</div>
				)
};

export default SideBar;
