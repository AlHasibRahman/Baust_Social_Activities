import { useEffect, useState } from "react";
import type { Activity } from "./Lib/types/Activity";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";

const titles = "Activities";
function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  useEffect(() => {
   /* fetch('http://localhost:5179/api/activities')
      .then(response => response.json())
      .then(data => setActivities(data)) */

      axios.get<Activity[]>('http://localhost:5179/api/activities')
      .then(response => setActivities(response.data))
  }, []);
  return (
    <>
      <Typography variant='h3'>{titles}</Typography>
      <List>
        {activities.map((activity) => (
          <ListItem key={activity.id}>
            <ListItemText>
              {activity.title}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </>

  )
}

export default App
