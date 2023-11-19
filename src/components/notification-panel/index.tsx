import { Popover } from '../ui/popover'
import { Trigger } from './trigger'
import { List } from './list'

export function NotificationPanel() {
  return (
    <Popover>
      <Trigger />

      <List />
    </Popover>
  )
}
