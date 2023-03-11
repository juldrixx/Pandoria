import React from 'react';
import PropTypes from 'prop-types';
import RefreshItem from './RefreshItem';

function RefreshList(props) {
  const { options, tables } = props;

  return (
    <ul className="refresh-list">
      {options.map((o) => (
        <li key={o.id}>
          <RefreshItem value={o} tables={tables} />
        </li>
      ))}
    </ul>
  );
}

RefreshList.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      revision: PropTypes.number.isRequired,
      data_source_id: PropTypes.string.isRequired,
      notify_start_date: PropTypes.string.isRequired,
      refresh_start_date: PropTypes.string.isRequired,
      refresh_end_date: PropTypes.string.isRequired,
      refresh_state: PropTypes.string.isRequired,
      refresh_trigger_id: PropTypes.string.isRequired,
      run_url: PropTypes.string.isRequired,
      tables: PropTypes.objectOf(
        PropTypes.shape({
          unique_refresh_id: PropTypes.string.isRequired,
          table: PropTypes.shape({
            schema: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
          }).isRequired,
          refresh_state: PropTypes.string.isRequired,
          updated_at: PropTypes.string.isRequired,
          dag_id: PropTypes.string.isRequired,
          task_id: PropTypes.string.isRequired,
          run_id: PropTypes.string.isRequired,
          run_url: PropTypes.string.isRequired,
        }).isRequired
      ).isRequired,
    })
  ).isRequired,
  tables: PropTypes.arrayOf(PropTypes.string),
};

RefreshList.defaultProps = {
  tables: [],
};

export default RefreshList;
