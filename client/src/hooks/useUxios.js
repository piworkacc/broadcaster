import { useState } from 'react';
import { removeAuth } from '../redux/actions/userAction';

function useUxios() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const uxios = async (path, method = 'GET', body = null, headers = {}) => {
    setError(null);
    setLoading(true);
    let _body;
    let _headers = { ...headers };
    if (body) {
      _body = JSON.stringify(body);
    }

    if (body && !Object.entries(_headers).length) {
      _headers['Content-Type'] = 'application/json';
    }

    try {
      const resp = await fetch(path, {
        method,
        headers: _headers,
        body: _body,
      });
      if (!resp.ok) {
        throw await resp.json();
      }
      return await resp.json();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, uxios };
}

export default useUxios;
