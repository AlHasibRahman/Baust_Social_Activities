import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import type { Activity } from "../../../Lib/types/Activity"
import { useActivities } from "../../../Lib/hooks/useActivities";

type Props = {
  selectedActivity: Activity
  cancleSelectedActivity : () => void;
  openForm : (id:string) => void;
}

export default function ActivityDetail({selectedActivity, cancleSelectedActivity, openForm}: Props) {
  
  const {activities} = useActivities();
  const activity = activities?.find(x=>x.id === selectedActivity.id);
  if(!activity) return <Typography>Loading...</Typography>
  return (
    <Card>
      <CardMedia
        component = 'img'
        src={`/images/categoryImages/${activity.category}.jpg`}
      />
      <CardContent>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography variant="subtitle1" fontWeight='light'>{activity.date}</Typography>
        <Typography variant="body1">{activity.description}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => openForm(activity.id)} color="primary">Edit</Button>
        <Button onClick={cancleSelectedActivity } color="inherit">Cancle</Button>
      </CardActions>
    </Card>
  )
}
