import type { Activity } from "../../Lib/types/Activity";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useState } from "react";
import { useActivities } from "../../Lib/hooks/useActivities";
function App() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const {activities, isLoading} = useActivities();
  

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  const handleCancleSelectActivity = () => {
    setSelectedActivity(undefined);
  }

  const handleOpenForm = (id?: string) => {
    if (id) handleSelectActivity(id);
    else handleCancleSelectActivity();
    setEditMode(true);
  }

  const handleFormClose = () => {
    setEditMode(false);
  }


  
  return (
    <Box sx={{ bgcolor: '#eeeeeeff', minHeight:"100vh" }}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth='xl' sx={{ mt: 3 }}>
        {!activities || isLoading ?
          (<Typography>Loading...</Typography>)
          :
          (<ActivityDashboard
            activities={activities}
            selectActivity={handleSelectActivity}
            cancleSelectedActivity={handleCancleSelectActivity}
            selectedActivity={selectedActivity}
            editMode={editMode}
            openForm={handleOpenForm}
            closeForm={handleFormClose}
          />)
        }

      </Container>

    </Box>

  )
}

export default App
