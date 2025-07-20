export type Alert = {
  message: string
  name: string
  type?: 'error' | 'success' | 'warning' | 'info' | undefined
  expire?: boolean
  expirySeconds?: number
  dismissable?: boolean
  key?: string
  variant?: string
}

export type AlertStoreState = {
  alerts: Alert[]
}

export type ApplicationRef = {
  name: string
  ref: Ref<HTMLElement | null>
}

export type Configuration = {
  isOk: () => boolean
  getErrorMessage: () => string
  getAccessUrl: () => string
  getBroadsheetUrl: () => string
  isDebugging: () => boolean
  getApiUrl: (api: Api, path: string) => string
}

export type ConfirmationOptions<T> = {
  item?: T
  onConfirm: (item?: T) => void
  message?: string
  title?: string
}

export type ConfirmationStoreState = {
  isOpen: boolean
  options?: ConfirmationOptions
}

export type Credentials = {
  identityName: string
  token?: string
  password?: string
  applicationName?: string
}

export type DrawerOptions = {
  parentPath: string
  refresh: () => Promise<void>
}

export interface EnumDefinition<T extends Record<string, number> = Record<string, number>> {
  name: string
  values: T
}

export type Env = {
  VITE_ACCESS_API_URL: string
  VITE_BROADSHEET_API_URL: string
}

export type FormTitle = {
  title: string
  closeDrawer?: boolean
  closePath?: string
  icon?: IconValue
}

export type NavigationItem = {
  permission?: string
  title: string
  to?: string
  ref?: string
  props?: unknown
}

export type OAuthData = {
  code: string
  state: string
}

export type Permission = {
  id: string
  name: string
  status: number
}

export type Session = {
  identityId: string
  identityName: string
  token: string
  permissions: string[]
  expiryDate?: Date
  dateRegistered?: Date
}

export type SessionResponse = {
  identityId: string
  identityName: string
  permissions: string[]
  registrationRequested: boolean
  result: string
  token: string
  tokenExpiryDate: string
  sessionTokenExchangeUrl?: string
}

export type SessionStoreState = {
  isAuthenticated: boolean
  isInitialized: boolean
  identityName?: string
  token?: string
  permissions: string[]
}

export type SnackbarStoreState = {
  visible: boolean
  text: string
  timeout: number
}
