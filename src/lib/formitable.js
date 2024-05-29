import { Writable } from 'stream'
import formidable from 'formidable'

export const formidableConfig = {
  maxFields: 7,
  multiples: false,
  keepExtensions: true,
  allowEmptyFiles: false,
  maxFileSize: 100_000_000,
  maxFieldsSize: 10_000_000,
}

export function formidablePromise(req, opts) {
  return new Promise((accept, reject) => {
    const form = formidable(opts)
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      return accept({ fields, files })
    })
  })
}

export const fileConsumer = (acc) => {
  const writable = new Writable({
    write: (chunk, _enc, next) => {
      acc.push(chunk)
      next()
    },
  })
  return writable
}
