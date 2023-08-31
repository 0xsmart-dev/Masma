// ** React Imports
import { ReactNode, ComponentType } from 'react'

export type RepeaterProps = {
  count: number
  children(i: number): ReactNode
  // eslint-disable-next-line no-undef
  tag?: ComponentType | keyof JSX.IntrinsicElements
}
