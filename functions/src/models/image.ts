import { v4 as uuidv4 } from 'uuid'
import db from '../firestore'

const collectionName = 'image'

interface ImageData {
  fileName: string
  originalUrl: string
}

const createOne = async (originalUrl: string) => {
  const uid = uuidv4()
  const fileName = `${uid}.webp`
  const docRef = db.collection(collectionName).doc(uuidv4())
  const data: ImageData = {
    originalUrl,
    fileName,
  }
  await docRef.set(data)
  return fileName
}

const getImage = async (originalUrl: string) => {
  return new Promise<ImageData>(async (res: any, rej) => {
    const imageRef = db.collection(collectionName)
    const snapshot = await imageRef
      .where('originalUrl', '==', originalUrl)
      .get()
    if (snapshot.empty) {
      console.log('No matching documents.')
      res(null)
    } else {
      snapshot.forEach((doc) => {
        res(doc.data())
      })
    }
  })
}

export { createOne, getImage }
