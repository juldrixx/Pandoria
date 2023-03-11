import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import React from 'react';
import { LineageList, RefreshList, UploadButton } from '../../components';

function HomePage() {
  const [value, setValue] = React.useState(null);
  const [selectedLineage, setSelectedLineage] = React.useState(null);
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleUpload = (val) => {
    setValue(val);
  };

  const handleSelectLineage = (val) => {
    setSelectedLineage(val);
  };

  const handleSelectTab = (e, val) => {
    setSelectedTab(val);
  };

  if (value) {
    return (
      <>
        <LineageList
          options={value.lineages}
          value={selectedLineage}
          onSelect={handleSelectLineage}
        />
        {selectedLineage !== null && (
          <>
            <Tabs value={selectedTab} onChange={handleSelectTab}>
              <Tab id={0} label="Graph" />
              <Tab id={1} label="SQL queries" />
            </Tabs>
            {selectedTab === 0 && (
              <RefreshList
                options={value.lineages[selectedLineage].refreshes_history}
                tables={value.lineages[selectedLineage].data_source.tables}
              />
            )}
            {selectedTab === 1 && (
              <Card>
                <CardContent color="error">
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    <List>
                      {value.lineages[
                        selectedLineage
                      ].data_source.sql_queries.map((s) => (
                        <ListItem key={s} disableGutters>
                          <ListItemText>{s}</ListItemText>
                        </ListItem>
                      ))}
                    </List>
                  </Typography>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </>
    );
  }
  return <UploadButton onUpload={handleUpload} />;
}

export default HomePage;
