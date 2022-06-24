import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getInvestments } from '../redux/actions/data';

export const useInvestment = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInvestments());
  }, []);
  const { investments } = useSelector((state) => state.data);
  return investments;
};
