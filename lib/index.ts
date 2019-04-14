import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { omit } from 'lodash'
import dayjs from 'dayjs'

export interface AuthfulOptions {
  secret: jwt.Secret
  expiresIn?: string | number
}

export interface AuthfulPwdHash {
  plaintext: string
  salt?: string | number
}

export interface AuthfulPwdCheck {
  hash: string
  plaintext: string
}

export interface AuthfulTokenData {
  exp: number
}

export default class Authful {
  secret: jwt.Secret
  expiresIn?: string | number

  constructor(options: AuthfulOptions) {
    this.secret = options.secret
    this.expiresIn = options.expiresIn || '24hrs'
  }

  ready() {
    return {
      secret: this.secret
    }
  }

  pwd = {
    hash: async (input: AuthfulPwdHash) => {
      const { plaintext, salt = 10 } = input
      return await bcrypt.hash(plaintext, salt)
    },

    check: async (password: AuthfulPwdCheck) => {
      const { plaintext, hash } = password
      return await bcrypt.compare(plaintext, hash)
    }
  }

  token = {
    create: async (payload: string | Buffer | object) => {
      const { secret, expiresIn } = this
      return await jwt.sign(payload, secret, { expiresIn })
    },
    decode: async (token: string) => {
      const secret = this.secret as string | Buffer
      return (await jwt.verify(token, secret)) as AuthfulTokenData
    },
    refresh: async (token: string) => {
      const { secret, expiresIn } = this

      try {
        const decoded = (await this.token.decode(token)) as AuthfulTokenData
        const expired = this.isExpired(decoded.exp)

        if (expired) {
          tokenExpiredError()
        }

        const payload = omit(decoded, ['iat', 'exp'])
        return await this.token.create(payload)
      } catch (err) {
        throw err
      }
    }
  }

  isExpired(unix: number) {
    return dayjs().diff(unix, 'day') >= 1
  }
}

function tokenExpiredError() {
  return Object.assign(new Error(), {
    name: 'TokenExpired'
  })
}
