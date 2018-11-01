function* HelloGenerator () {
  yield 'Hello'
  yield 'World'
  yield {
    message: 'HelloWorld'
  }
}

let helloGen = HelloGenerator()

// { value: 'Hello', done: false }
// { value: 'World', done: false }
// { value: { message: 'HelloWorld' }, done: false }
// { value: undefined, done: true }
helloGen.next()
helloGen.next()
helloGen.next()
helloGen.next()

function* nextParams () {
  const a = yield Promise.resolve()
  // console.log(a)
  const b = yield Promise.resolve()
  // console.log(b)
}

let nextParamsGen = nextParams()

nextParamsGen.next(12)
nextParamsGen.next(12)
nextParamsGen.next(12)


function* foo () {
  yield 1
  yield 2
  yield 3
  yield 4
  return 5
}

console.log([...foo()])