import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useUxios from "../../hooks/useUxios";
import ErrorComponent from '../ErrorComponent/index';
import Loading from '../Loading/index';
import { removeAuth } from '../../redux/actions/userAction';

function Logout() {
  const { error, loading, uxios } = useUxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const data = await uxios('/api/users/logout');
      if (data) {
        dispatch(removeAuth());
        navigate('/');
      }
    })();
  }, []);
  return (
    <>
      <div>Logging out...</div>
      <Loading loading={loading} />
      <ErrorComponent error={error} />
    </>
  );
}

export default Logout;
