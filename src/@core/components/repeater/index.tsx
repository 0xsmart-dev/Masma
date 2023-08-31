// ** Types
import { ReactNode } from 'react'
import { RepeaterProps } from './types'

const Repeater = (props: RepeaterProps) => {
  // ** Props
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { count, tag, children } = props

  // ** Custom Tag
  const Tag = tag || 'div'

  // ** Default Items
  const items: ReactNode[] = []

  // ** Loop passed count times and push it in items Array
  for (let i = 0; i < count; i++) {
    items.push(children(i))
  }

  return <Tag {...props}>{items}</Tag>
}

export default Repeater
