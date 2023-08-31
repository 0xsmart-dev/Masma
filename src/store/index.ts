// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import chat from 'src/store/apps/chat'
import user from 'src/store/apps/user'
import notification from 'src/store/apps/notification'

import { createLogger } from 'redux-logger'

// const logger = createLogger()

export const store = configureStore({
  reducer: { chat, user, notification },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })

  // }).concat(logger)
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
