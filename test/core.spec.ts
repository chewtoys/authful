import Authful from '@lib/index'

let instance!: Authful
const secret = 'ffj3493$R#J@$f#$Jo3ofk'

beforeEach(() => {
  instance = new Authful({ secret })
})

test('new Authful()', () => {
  expect(instance.ready()).toEqual({ secret })
})
