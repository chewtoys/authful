import * as bcrypt from 'bcrypt'

export interface AuthfulOptions {
  secret: string
}

export interface AuthfulHashParams {
  plaintext: string
  salt?: string | number
}

export interface AuthfulCheckParams {
  hash: string
  plaintext: string
}

export default class Authful {
  secret: string

  constructor(options: AuthfulOptions) {
    this.secret = options.secret
  }

  ready() {
    return {
      secret: this.secret
    }
  }

  pwd = {
    async hash(input: AuthfulHashParams) {
      const { plaintext, salt = 10 } = input
      return await bcrypt.hash(plaintext, salt)
    },

    async check(password: AuthfulCheckParams) {
      const { plaintext, hash } = password
      return await bcrypt.compare(plaintext, hash)
    }
  }
}
