import gc from './config'
const bucket = gc.bucket('gs://webp-compress.appspot.com')

export const uploadImage = (file: any, fileName: string) =>
  new Promise((resolve, reject) => {
    const imageByteArray = new Uint8Array(file)
    const fileUp = bucket.file(fileName)
    return fileUp
      .save(imageByteArray)
      .then(() => {
        resolve(true)
      })
      .catch((err: any) => {
        reject(err)
        console.log(`Unable to upload encoded file ${err}`)
      })
  })
