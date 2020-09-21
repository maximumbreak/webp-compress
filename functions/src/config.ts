import * as Cloud from '@google-cloud/storage'
//* สำหรับรัน local *//
//import * as path from 'path'
//const serviceKey = path.join('./src/key.json')
// const storage = new Storage({
//   keyFilename: serviceKey,
//   projectId: 'webp-compress',
// })

const { Storage } = Cloud

const storage = new Storage()

export default storage
