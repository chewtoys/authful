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
    async hash(input: AuthfulPwdHash) {
      const { plaintext, salt = 10 } = input
      return await bcrypt.hash(plaintext, salt)
    },

    async check(password: AuthfulPwdCheck) {
      const { plaintext, hash } = password
      return await bcrypt.compare(plaintext, hash)
    }
  }

  token = {
    create: async (config: AuthfulTokenCreate) => {
      const { secret, expiresIn = '24hr' } = this
      const { payload } = config
      return await jwt.sign(payload, secret, { expiresIn })
    }
  }
}
