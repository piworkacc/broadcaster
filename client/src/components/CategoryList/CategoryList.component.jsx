import React from 'react';
import styled from 'styled-components'
import Category from '../Category/Category.component';


const CategoryList = () => {
	return (
			<ListContainer>
				<Category key={1} title={'Игры'}/>
				<Category key={2} title={'Музыка'}/>
				<Category key={3} title={'Образование'}/>
				<Category key={4} title={'Путешествия'}/>

			</ListContainer>
	)
};

export default CategoryList;


const ListContainer = styled.ul`
		list-style-type: none;
		padding: 0;
		margin-top: 90px;
		`
const StyledCategory = styled(Category)`
	margin-top: 50px;
`
