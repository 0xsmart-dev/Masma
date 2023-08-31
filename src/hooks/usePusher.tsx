import { useContext } from 'react'
import { PusherContext } from 'src/context/PusherContext'

export const usePusher = () => useContext(PusherContext)