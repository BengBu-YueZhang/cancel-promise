const cancelPromise = require('../index')


function getUserData () {
  return new Promise ((resolve, reject) => {
    setTimeout(() => {
      return resolve({ msg: 'success' })
    }, 100)
  })
}

function* get () {
  let data = yield getUserData()
  return data
}

let resulte = cancelPromise(get)

resulte.promise.then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})

// resulte.cancel()

