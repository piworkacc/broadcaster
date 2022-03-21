import React from 'react';
import styled from 'styled-components'
import Category from '../Category/Category.component';
import {useSelector} from "react-redux";



const CategoryList = () => {
	const tags = useSelector(state => state.tags)
	return (
			<ListContainer>
				{tags?.map((el) => (
						<Category key={el.id} title={el.tag} />
				))}
			</ListContainer>
	)
};

export default CategoryList;


const ListContainer = styled.ul`
		list-style-type: none;
		padding: 0;
		margin-top: 90px;
		`
