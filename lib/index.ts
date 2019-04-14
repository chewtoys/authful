export interface AuthfulOptions {
  secret: string
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
}
