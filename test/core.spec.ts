import Authful from '@lib/index'

let authful!: Authful
const secret = 'ffj3493$R#J@$f#$Jo3ofk'
const plaintext = 'p4$$w@rd'

beforeEach(() => {
  authful = new Authful({ secret })
})

test('instance', () => {
  expect(authful.ready()).toEqual({ secret })
})

describe('pwd', () => {
  test('hash', async () => {
    const regex = /^\$2[ayb]\$.{56}$/
    const hash = await authful.pwd.hash({ plaintext })
    expect(hash).toEqual(expect.stringMatching(regex))
  })

  test('check', async () => {
    const hash = await authful.pwd.hash({ plaintext })
    const match = await authful.pwd.check({ hash, plaintext })
    expect(match).toBeTruthy()
  })
})

describe('token', () => {
  test('create', async () => {
    const payload = { id: 1 }
    const token = await authful.token.create({ payload })
  })
})
