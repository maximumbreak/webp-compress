import * as functions from 'firebase-functions'
import { createOne, getImage } from './models/image'
import * as sharp from 'sharp'
import { uploadImage } from './helpers'
import axios from 'axios'

const urlPublic = `https://firebasestorage.googleapis.com/v0/b/webp-compress.appspot.com/o/`

export const webp = functions.https.onRequest(
  async (request: any, response) => {
    const originalUrl = request.query.img
    const input = (
      await axios({ url: originalUrl, responseType: 'arraybuffer' })
    ).data as Buffer

    response.setHeader('content-type', 'image/webp')
    const imageData = await getImage(originalUrl)
    if (!imageData) {
      const fileName = await createOne(originalUrl)
      const data = await sharp(input).webp({ lossless: true }).toBuffer()
      await uploadImage(data, fileName)
      response.redirect(`${urlPublic}${fileName}?alt=media`)
    } else {
      response.redirect(`${urlPublic}${imageData.fileName}?alt=media`)
    }
  }
)
