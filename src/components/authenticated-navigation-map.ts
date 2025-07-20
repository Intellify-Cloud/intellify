import type { NavigationItem } from '@/types/app'
import Permissions from '../permissions'

const map: NavigationItem[] = [
  {
    to: '/dashboard',
    title: 'dashboard',
    permission: Permissions.Session,
  },
  {
    to: '/tenants',
    title: 'tenants',
    permission: Permissions.Tenants.View,
  },
]

export default map
