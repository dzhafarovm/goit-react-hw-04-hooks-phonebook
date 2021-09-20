import PropTypes from 'prop-types';

export const Filter = ({ value, onFilterInputValue }) => {
  return (
    <label>
      Find contacts by name
      <input type="text" value={value} onChange={onFilterInputValue} />
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onFilterInputValue: PropTypes.func.isRequired,
};
