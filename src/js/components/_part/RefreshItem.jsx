import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActionArea,
  CardContent,
  Collapse,
  Divider,
  Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { connect } from 'react-redux';
import Xarrow from 'react-xarrows';
import RefreshCard from './RefreshCard';
import TableCard from './TableCard';
import lightVariables from '../../../stylesheets/imports/_variable-light.scss';
import darkVariables from '../../../stylesheets/imports/_variable-dark.scss';
import colorVariables from '../../../stylesheets/imports/_variable.scss';

function RefreshItem(props) {
  const [expand, setExpand] = React.useState(false);
  const { dark, value, tables } = props;
  const unusedTables = tables.filter(
    (t) => !Object.keys(value.tables).includes(t)
  );

  return (
    <Card className="refresh-item">
      <CardActionArea onClick={() => setExpand(!expand)}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h7"
            component="div"
            sx={{ display: 'flex' }}
          >
            {value.id}
            <ExpandMore
              sx={{
                marginLeft: 'auto',
                transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
              }}
            />
          </Typography>
        </CardContent>
      </CardActionArea>
      <Collapse in={expand} timeout="auto" unmountOnExit>
        <Divider />
        <CardContent
          className="aaa"
          sx={{
            backgroundColor: dark
              ? lightVariables.tertiaryColor
              : darkVariables.tertiaryColor,
          }}
        >
          <div>
            <ul>
              {Object.entries(value.tables).map(([id, table]) => (
                <li key={id}>
                  <TableCard id={id} tableId={value.id} value={table} />
                </li>
              ))}
              {unusedTables.map((id) => (
                <li key={id}>
                  <TableCard id={id} tableId={value.id} />
                </li>
              ))}
            </ul>
          </div>
          <div>
            {Object.keys(value.tables).map((id) => (
              <Xarrow
                key={id}
                start={`table-${id}-${value.id}`}
                end={`refresh-${value.id}`}
                path="grid"
                color={dark ? colorVariables.white : colorVariables.black}
              />
            ))}
            {unusedTables.map((id) => (
              <Xarrow
                key={id}
                start={`table-${id}-${value.id}`}
                end={`refresh-${value.id}`}
                path="grid"
                color={dark ? colorVariables.white : colorVariables.black}
              />
            ))}
          </div>
          <div>
            <RefreshCard value={value} />
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  dark: state.theme.dark,
});

RefreshItem.propTypes = {
  dark: PropTypes.bool.isRequired,
  value: PropTypes.shape({
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
  }).isRequired,
  tables: PropTypes.arrayOf(PropTypes.string),
};

RefreshItem.defaultProps = {
  tables: [],
};

export default connect(mapStateToProps)(RefreshItem);
