import * as admin from 'firebase-admin'
//import * as path from 'path'
//const serviceKey = path.join('./src/key.json')

// admin.initializeApp({
//   credential: admin.credential.cert(serviceKey),
//   databaseURL: '{{databseUrl}}',
// })

admin.initializeApp()

const db = admin.firestore()

export default db
