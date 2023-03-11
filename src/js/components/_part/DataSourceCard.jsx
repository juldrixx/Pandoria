import {
  capitalize,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import {
  BroadcastOnPersonal,
  Fingerprint,
  OpenInNew,
  Sensors,
  Star,
} from '@mui/icons-material';

function DataSourceCard(props) {
  const { value, onClick, selected } = props;

  return (
    <Card sx={{ minWidth: '300px' }} className="datasource-card">
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ display: 'flex' }}
          >
            {value.name}
            {selected && (
              <Star
                sx={{ marginLeft: 'auto' }}
                className="datasource-card-selected-icon"
              />
            )}
          </Typography>
          <Divider />
          <Typography component="span" variant="body2" color="text.secondary">
            <List>
              <ListItem disableGutters>
                <ListItemIcon sx={{ minWidth: '35px' }}>
                  <Fingerprint />
                </ListItemIcon>
                <ListItemText>{value.data_source_id}</ListItemText>
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon sx={{ minWidth: '35px' }}>
                  <Sensors />
                </ListItemIcon>
                <ListItemText>{capitalize(value.connection_type)}</ListItemText>
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon sx={{ minWidth: '35px' }}>
                  <BroadcastOnPersonal />
                </ListItemIcon>
                <ListItemText>{value.connection_hostname}</ListItemText>
              </ListItem>
            </List>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        disableSpacing
        sx={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <IconButton target="_blank" href={value.webpage_url}>
          <OpenInNew />
        </IconButton>
      </CardActions>
    </Card>
  );
}

DataSourceCard.propTypes = {
  value: PropTypes.shape({
    data_source_id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    webpage_url: PropTypes.string.isRequired,
    connection_hostname: PropTypes.string.isRequired,
    connection_type: PropTypes.string.isRequired,
    tables: PropTypes.arrayOf(PropTypes.string).isRequired,
    sql_queries: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

DataSourceCard.defaultProps = {
  selected: false,
};

export default DataSourceCard;
