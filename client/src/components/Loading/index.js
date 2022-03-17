import { useEffect, useState } from 'react';

export default function Loading({ loading }) {
  const basicValue = 'loading';
  const [element, setElement] = useState(basicValue);

  useEffect(() => {
    if (loading) {
      const tmt = setTimeout(() => {
        setElement((prev) => {
          const buf = prev.replace(basicValue, '');
          if (buf.length / 2 < 5) return `${basicValue}${buf} .`;
          return basicValue;
        });
      }, 100);
      return () => clearTimeout(tmt);
    } else {
      setElement(basicValue);
    }
  }, [loading, element]);

  return loading ? <div className="position-fixed">{element}</div> : <></>;
}
