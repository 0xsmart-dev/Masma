import mock from './mock'

import './cards'
import './table'
import './pages/faq'
import './apps/email'
import './apps/invoice'
import './autocomplete'
import './apps/userList'
import './apps/calendar'
import './pages/pricing'
import './app-bar-search'
import './apps/permissions'
import './pages/knowledge-base'
import './server-side-menu/vertical'
import './server-side-menu/horizontal'

mock.onAny().passThrough()
