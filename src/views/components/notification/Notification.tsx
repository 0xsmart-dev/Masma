// ** React Imports
import { Fragment } from 'react'
import toast, { Toast } from 'react-hot-toast'
import { NotificationObj } from 'src/types/apps/notificationTypes'
import NotificationFollow from './NotificationFollow'
import NotificationUnfollow from './NotificationUnfollow'
import NotificationAcceptInvite from './NotificationAcceptInvite'
import NotificationMessage from './NotificationMessage'

const NotificationContainer = ({ content, t }: { content: NotificationObj; t: Toast }) => {
  if (content.type == 'FOLLOW') {
    return <NotificationFollow content={content} t={t} />
  } else if (content.type == 'UNFOLLOW') {
    return <NotificationUnfollow content={content} t={t} />
  } else if (content.type === 'ACCEPT_INVITE') {
    return <NotificationAcceptInvite content={content} t={t} />
  } else if (content.type === 'MESSAGE') {
    return <NotificationMessage content={content} t={t} />
  }

  return <Fragment></Fragment>
}

const notify = (content: NotificationObj) => {
  return toast(t => <NotificationContainer content={content} t={t} />, {
    style: {
      minWidth: '300px'
    }
  })
}
export default notify
