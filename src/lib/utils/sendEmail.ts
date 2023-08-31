import sgMail from '@sendgrid/mail'
import { EmailTemplateType } from 'src/context/types'
import fs from 'fs/promises'
import path from 'path'
import { render } from '@react-email/render'
import FollowedEmailTmp from './FollowedEmailTmp'

sgMail.setApiKey(process.env.SEND_GRID_API_KEY || '')

export const sendEmail = async (from: string, to: string, emailTemplate: EmailTemplateType, data: any) => {
  try {
    const filePath = path.resolve('src/lib/utils/emailTemplate.html')
    const templateHTML = await fs.readFile(filePath, 'utf-8')
    let email:
      | {
          to: string
          from: string
          subject: string
          text: string
          html: string
        }
      | undefined

    if (emailTemplate === EmailTemplateType.RECEIVE_MONEY) {
      const formattedHTML =
        templateHTML.replace('{{name}}', data.toUser.username) +
        `You've received <strong>$${data.amount}</strong> from <strong>${data.from.username}</strong>.<br>${data.text}`
      email = {
        to,
        from,
        subject: `You've received money`,
        text: `Hello ${data.toUser.name}.You've received ${data.symbol ? '' : '$'}${data.amount} ${
          data.symbol || ''
        } from ${data.from.name}.${data.text}`,
        html: formattedHTML
      }
    } else if (emailTemplate === EmailTemplateType.SEND_MONEY) {
      const formattedHTML =
        templateHTML.replace('{{name}}', data.from.username) +
        `You've successfully transferred <strong>$${data.amount}</strong> to <strong>${data.toUser.username}</strong>.<br>${data.text}`
      email = {
        to,
        from,
        subject: 'Money transfer succeed',
        text: `Hello ${data.from.username}.You've successfully transferred $ ${data.amount} to ${data.toUser.username}.${data.text}`,
        html: formattedHTML
      }
    } else if (emailTemplate === EmailTemplateType.FOLLOWED) {
      const formattedHTML = render(FollowedEmailTmp({ targetUser: data.toUser }), { pretty: true })
      email = {
        to,
        from,
        subject: 'You have a new follower',
        text: `Hello ${data.toUser.username}.`,
        html: formattedHTML
      }
    }

    if (email !== undefined) await sgMail.send(email)
    else throw new Error('EmailTemplateType Error')
  } catch (err) {
    console.log(err)
  }
}
