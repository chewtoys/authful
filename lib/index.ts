import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

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

export interface AuthfulTokenCreate {
  payload: string | Buffer | object
}

export default class Authful {
  secret: jwt.Secret
  expiresIn?: string | number

  constructor(options: AuthfulOptions) {
    this.secret = options.secret
    this.expiresIn = options.expiresIn
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
    create: async (config: AuthfulTokenCreate) => {
      const { payload } = config
      const { secret, expiresIn = '24hr' } = this
      return await jwt.sign(payload, secret, { expiresIn })
    },
    decode: async (token: string) => {
      const secret = this.secret as string | Buffer
      return await jwt.verify(token, secret)
    }
  }
}
