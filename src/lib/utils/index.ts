import * as _ from 'lodash'

export const avatarOrPlaceholder = (avatar: string | undefined | null) => {
  return avatar ?? '/images/avatars/Avatar-light.png'
}

export const generateUID = () => {
  const firstPart = (Math.random() * 46656) | 0
  const secondPart = (Math.random() * 46656) | 0
  const res = ('000' + firstPart.toString(36)).slice(-3) + ('000' + secondPart.toString(36)).slice(-3)

  return res.toUpperCase()
}

export const excludeSecureFields = obj => {
  if (Array.isArray(obj)) return obj.map(u => _.omit(u, ['privateKey']))

  return _.omit(obj, ['privateKey'])
}
