import { useActivities } from "../../../Lib/hooks/useActivities";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsinfo from "./ActivityDetailsinfo";
import ActivityDetailsChat from "./ActivityDetailsChat";
import { Grid2, Typography } from "@mui/material";
import { useParams } from "react-router";



export default function ActivityDetailPage() {

  const {id} = useParams();
  const {activity, isLoadingActivity} = useActivities(id);
  if(isLoadingActivity) return <Typography>Loading...</Typography>
  if(!activity) return <Typography>Activity Not Found</Typography>
  return (
    <Grid2 container spacing={3}>
      <Grid2 size={8}>
        <ActivityDetailsHeader activity={activity} />
        <ActivityDetailsinfo activity={activity}/>
        <ActivityDetailsChat />
      </Grid2>

      <Grid2 size={4}>
      </Grid2>
      
    </Grid2>
  )
}
