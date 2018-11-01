function cancelPromise (fn, ...args) {
  let cancel
  let isCancel
  let gn = fn(...args)

  const promise = new Promise((resolve, reject) => {
    cancel = () => {
      isCancel = true
      reject({ reason: 'cancel' })
    }

    let onSuccess = (res) => {
      if (!isCancel) {
        let result = null
        try {
          let result = gn.next(res)
          next(result)
        } catch (error) {
          reject(error)
        }
      }
    }

    let onError = (err) => {
      try {
        gn.throw(err)
      } catch (error) {
        reject(error)
      }
    }

    let next = ({ value, done }) => {
      if (done) {
        return resolve(value)
      }
      return value.then(onSuccess, onError)
    }

    onSuccess()
  })


  return { cancel, promise }
}

module.exports = cancelPromise