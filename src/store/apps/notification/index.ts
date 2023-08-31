// ** Redux Imports
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

// ** Axios Imports
import {
  getNotifications,
  readNotification as readNotification_,
  readAllNotification as readAllNotification_
} from 'src/lib/api'

// ** Types
import { NotificationObj } from 'src/types/apps/notificationTypes'

// ** Fetch User Notifications
export const fetchNotifications = createAsyncThunk('appNotification/fetch', async () => {
  const response = await getNotifications()

  return response.notifications
})

export const readNotification = createAsyncThunk('appNotification/read', async (id: number) => {
  const response = await readNotification_(id)

  return response.notification
})

export const readAllNotification = createAsyncThunk('appNotification/readAll', async () => {
  const response = await readAllNotification_()

  return response.notification
})

type NotificationAppState = {
  notifications: NotificationObj[]
}

const initialState: NotificationAppState = {
  notifications: []
}

export const appNotificationSlice = createSlice({
  name: 'appNotification',
  initialState,
  reducers: {
    pushNotification: (state, action: PayloadAction<NotificationObj>) => {
      state.notifications = [...state.notifications, action.payload]
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.notifications = action.payload as NotificationObj[]
    })
    builder.addCase(readNotification.fulfilled, (state, action) => {
      const index = state.notifications.findIndex(e => e.id === action.payload.id)
      state.notifications.splice(index, 1)
    })
    builder.addCase(readAllNotification.fulfilled, state => {
      state.notifications = []
    })
  }
})

export const { pushNotification } = appNotificationSlice.actions

export default appNotificationSlice.reducer
