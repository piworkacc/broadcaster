import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { searchContainer, searchInput, buttonSearch } from './Search';
import { searchAC } from '../../redux/sagas/sagasAC';
import { useSelector, useDispatch } from 'react-redux';
import useUxios from '../../hooks/useUxios';

const SearchInput = () => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const { error, loading, uxios } = useUxios();

  useEffect(() => {
    dispatch(searchAC({ value, service: { error, loading, uxios } }));
  }, [value]);

  return (
    <div>
      <div style={searchContainer}>
        <Input
          style={searchInput}
          onChange={({ target }) => setValue(target.value)}
        />
        <button style={buttonSearch}>
          <SearchOutlined />{' '}
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
