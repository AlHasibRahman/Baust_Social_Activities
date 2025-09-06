import type { JSX } from "react/jsx-runtime"

type Activity = {
  map(arg0: (activity: Activity) => JSX.Element): React.ReactNode
  id: string
  title: string
  date: string
  description: string
  category: string
  isCancelled: boolean
  city: string
  venue: string
  latitude: number
  longitude: number
}