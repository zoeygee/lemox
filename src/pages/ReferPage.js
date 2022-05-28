import { useSearchParams, Navigate } from 'react-router-dom';

export default function ReferPage() {
  const [paramsQuery, setParamsQuery] = useSearchParams({});
  const ref = paramsQuery.get('ref');
  localStorage.setItem('referrerId', JSON.stringify(ref));
  //   navigate('/', { replace: true });
  return <Navigate to="/" replace />;
}
