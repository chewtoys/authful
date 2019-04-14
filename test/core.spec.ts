import Authful from '@lib/index'

let authful!: Authful
const secret = 'ffj3493$R#J@$f#$Jo3ofk'
const plaintext = 'p4$$w@rd'
const input = { plaintext }

beforeEach(() => {
  authful = new Authful({ secret })
})

test('new Authful()', () => {
  expect(authful.ready()).toEqual({ secret })
})

test('hash()', async () => {
  const regex = /^\$2[ayb]\$.{56}$/
  const hash = await authful.pwd.hash(input)
  expect(hash).toEqual(expect.stringMatching(regex))
})

test('check()', async () => {
  const hash = await authful.pwd.hash(input)
  const match = await authful.pwd.check({ hash, plaintext })
  expect(match).toBeTruthy()
})
