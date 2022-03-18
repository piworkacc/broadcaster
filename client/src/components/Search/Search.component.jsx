import React from 'react';
import {Input} from 'antd';
import {SearchOutlined} from "@ant-design/icons";
import {searchContainer, searchInput, buttonSearch} from './Search'


const SearchInput = () => {

	return (
			<div>
				<div style={searchContainer}>
					<Input style={searchInput}/>
					<button style={buttonSearch}><SearchOutlined/> </button>
				</div>
			</div>
	)
};

export default SearchInput;
