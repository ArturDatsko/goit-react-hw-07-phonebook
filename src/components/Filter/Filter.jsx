import { useDispatch } from 'react-redux';
import { StyledFilter } from './Filter.styled';
import { changeFilter } from '../../redux/filter-slice';

export const Filter = () => {
  const dispatch = useDispatch();
  const handlerChange = e => {
    dispatch(changeFilter(e.target.value));
  };
  return <StyledFilter type="string" name="filter" onChange={handlerChange} />;
};
