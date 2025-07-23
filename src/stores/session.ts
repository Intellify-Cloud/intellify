import Permissions from '@/permissions'
import { defineStore } from 'pinia'
import axios from 'axios'
import configuration from '@/configuration'
import { i18n } from '@/i18n'
import type {
  Session,
  SessionStoreState,
  Credentials,
  OAuthData,
  SessionResponse,
} from '@/types/app'
import { Api } from '@/enums'

export const useSessionStore = defineStore('session', {
  state: (): SessionStoreState => {
    return {
      isAuthenticated: false,
      isInitialized: false,
      identityName: '',
      token: '',
      permissions: [],
    }
  },
  getters: {
    status(): string {
      return !this.token ? 'not-signed-in' : 'signed-in'
    },
  },
  actions: {
    async initialize() {
      if (this.isInitialized) {
        return
      }

      const identityName = localStorage.getItem('shuttle-access.identityName')
      const token = localStorage.getItem('shuttle-access.token')

      if (!!identityName && !!token) {
        try {
          return await this.signIn({
            identityName: identityName,
            token: token,
          })
        } finally {
          this.isInitialized = true
        }
      }

      return Promise.resolve()
    },
    addPermission(permission: string) {
      if (this.hasPermission(permission)) {
        return
      }

      this.permissions.push(permission)
    },
    register(session: Session) {
      if (
        !session ||
        !session.identityId ||
        !session.identityName ||
        !session.token ||
        !session.permissions
      ) {
        throw Error(i18n.global.t('messages.invalid-session'))
      }

      localStorage.setItem('shuttle-access.identityName', session.identityName)
      localStorage.setItem('shuttle-access.token', session.token)

      this.identityName = session.identityName
      this.token = session.token

      this.permissions = [Permissions.Session]

      session.permissions.forEach((item: string) => {
        this.addPermission(item)
      })

      this.isAuthenticated = true
    },
    async signIn(credentials: Credentials): Promise<SessionResponse> {
      if (
        !credentials ||
        !credentials.identityName ||
        !(!!credentials.password || !!credentials.token)
      ) {
        throw new Error(i18n.global.t('messages.missing-credentials'))
      }

      const response = await axios.post<SessionResponse>(
        configuration.getApiUrl(Api.Access, 'v1/sessions'),
        {
          identityName: credentials.identityName,
          password: credentials.password,
          token: credentials.token,
          applicationName: credentials.applicationName,
        },
      )

      if (!response) {
        throw new Error("Argument 'response' may not be undefined.")
      }

      if (!response.data) {
        throw new Error("Argument 'response.data' may not be undefined.")
      }

      const data = response.data

      switch (data.result) {
        case 'Registered': {
          if (data.sessionTokenExchangeUrl) {
            window.location.replace(data.sessionTokenExchangeUrl)
            break
          }

          this.register({
            identityId: data.identityId,
            identityName: credentials.identityName,
            token: data.token,
            permissions: data.permissions,
          })

          break
        }
        case 'UnknownIdentity': {
          break
        }
        default: {
          throw new Error(i18n.global.t('exceptions.invalid-credentials'))
        }
      }

      return response.data
    },
    async oauth(oauthData: OAuthData): Promise<SessionResponse> {
      if (!oauthData || !oauthData.state || !oauthData.code) {
        throw new Error(i18n.global.t('messages.oauth-missing-data'))
      }

      const response = await axios.get<SessionResponse>(
        configuration.getApiUrl(
          Api.Access,
          `v1/oauth/session/${oauthData.state}/${oauthData.code}`,
        ),
      )

      if (!response) {
        throw new Error("Argument 'response' may not be undefined.")
      }

      if (!response.data) {
        throw new Error("Argument 'response.data' may not be undefined.")
      }

      const data = response.data

      if (data.result == 'Registered') {
        this.register({
          identityId: data.identityId,
          identityName: data.identityName,
          token: data.token,
          permissions: data.permissions,
        })
      }

      this.isInitialized = true

      return response.data
    },
    signOut() {
      this.identityName = undefined
      this.token = undefined

      localStorage.removeItem('shuttle-access.identityName')
      localStorage.removeItem('shuttle-access.token')

      this.permissions = []

      this.isAuthenticated = false
    },
    hasSession() {
      return !!this.token
    },
    hasPermission(permission: string) {
      const requiredPermission = permission.toLowerCase()

      return this.permissions.some((candidate) => {
        if (candidate.includes('*')) {
          const regex = new RegExp(`^${candidate.replace('*', '.*')}$`)
          return regex.test(requiredPermission)
        } else {
          return candidate === requiredPermission
        }
      })
    },
  },
})
