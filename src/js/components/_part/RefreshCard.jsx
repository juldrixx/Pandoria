import {
  Card,
  CardActions,
  CardContent,
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
  Alarm,
  OpenInNew,
  HourglassTop,
  HourglassBottom,
  DesignServices,
} from '@mui/icons-material';

function RefreshCard(props) {
  const { value } = props;

  return (
    <Card
      sx={{ minWidth: '300px' }}
      id={`refresh-${value.id}`}
      className="refresh-card"
    >
      <CardContent>
        <Typography component="span" variant="body2" color="text.secondary">
          <List>
            <ListItem disableGutters>
              <ListItemIcon sx={{ minWidth: '35px' }}>
                <DesignServices />
              </ListItemIcon>
              <ListItemText>{value.revision}</ListItemText>
            </ListItem>
            <ListItem disableGutters>
              <ListItemIcon sx={{ minWidth: '35px' }}>
                <Alarm />
              </ListItemIcon>
              <ListItemText>
                {new Date(value.notify_start_date).toLocaleString()}
              </ListItemText>
            </ListItem>
            <ListItem disableGutters>
              <ListItemIcon sx={{ minWidth: '35px' }}>
                <HourglassTop />
              </ListItemIcon>
              <ListItemText>
                {new Date(value.refresh_start_date).toLocaleString()}
              </ListItemText>
            </ListItem>
            <ListItem disableGutters>
              <ListItemIcon sx={{ minWidth: '35px' }}>
                <HourglassBottom />
              </ListItemIcon>
              <ListItemText>
                {new Date(value.refresh_end_date).toLocaleString()}
              </ListItemText>
            </ListItem>
          </List>
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <IconButton target="_blank" href={value.run_url}>
          <OpenInNew />
        </IconButton>
      </CardActions>
    </Card>
  );
}

RefreshCard.propTypes = {
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
  }).isRequired,
};

export default RefreshCard;
