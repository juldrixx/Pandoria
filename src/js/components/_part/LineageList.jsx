import React from 'react';
import PropTypes from 'prop-types';
import DataSourceCard from './DataSourceCard';

function LineageList(props) {
  const { options, value, onSelect } = props;

  return (
    <nav className="lineage-list">
      <ul>
        {options.map((o, i) => (
          <li key={o.data_source.data_source_id}>
            <DataSourceCard
              value={o.data_source}
              onClick={() => onSelect(i !== value ? i : null)}
              selected={value === i}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}

LineageList.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      data_source: PropTypes.shape({
        data_source_id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        webpage_url: PropTypes.string.isRequired,
        connection_hostname: PropTypes.string.isRequired,
        connection_type: PropTypes.string.isRequired,
        tables: PropTypes.arrayOf(PropTypes.string).isRequired,
        sql_queries: PropTypes.arrayOf(PropTypes.string).isRequired,
      }).isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  value: PropTypes.number,
};

LineageList.defaultProps = {
  value: -1,
};

export default LineageList;
