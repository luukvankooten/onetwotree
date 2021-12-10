# Server

## Scripts

### `npm run start`

Start the server for development purpose.

### `npm run build`

Build the to output

## ERD

![erd](./erd.drawio.svg)

## most used queries

```
1. tracks.findOne({ spotifyId: '27NovPIUIRrOZoCHxABJwK' }, { projection: {} })

2. tracks.createIndex({ spotifyId: 1 }, { unique: true, background: true })

3. ratings.createIndex({ id: 1 }, { unique: true, background: true })

4. tracks.insertOne({ spotifyId: '27NovPIUIRrOZoCHxABJwK', name: 'INDUSTRY BABY (feat. Jack Harlow)', artists: [ 'Lil Nas X', 'Jack Harlow' ], cover: 'https://i.scdn.co/image/ab67616d0000b273ba26678947112dff3c3158bf', comments: [], ratings: [], _id: new ObjectId("61b3a0f44c92155477bd854f"), createdAt: new Date("Fri, 10 Dec 2021 18:48:20 GMT"), updatedAt: new Date("Fri, 10 Dec 2021 18:48:20 GMT"), __v: 0}, { session: null })

5. tracks.findOne({ _id: new ObjectId("61b3a0f44c92155477bd854f") }, { projection: {} })

6. comments.insertOne({ user_id: '50f71be7-5916-4be0-b82b-efcdae15a3ed', comment: 'hello world', _id: new ObjectId("61b3a0f54c92155477bd8552"), createdAt: new Date("Fri, 10 Dec 2021 18:48:21 GMT"), updatedAt: new Date("Fri, 10 Dec 2021 18:48:21 GMT"), __v: 0}, { session: null })

7. tracks.updateOne({ _id: new ObjectId("61b3a0f44c92155477bd854f") }, { '$push': { comments: { '$each': [ new ObjectId("61b3a0f54c92155477bd8552") ] } }, '$set': { updatedAt: new Date("Fri, 10 Dec 2021 18:48:21 GMT") }, '$inc': { __v: 1 }}, { session: null })

8. comments.findOne({ _id: new ObjectId("61b3a0f54c92155477bd8552") }, { projection: {} })

9. tracks.findOne({ spotifyId: '27NovPIUIRrOZoCHxABJwK' }, { projection: {} })
10. tracks.createIndex({ spotifyId: 1 }, { unique: true, background: true })
11. ratings.createIndex({ id: 1 }, { unique: true, background: true })
12. tracks.findOne({ _id: new ObjectId("61b3a0f54c92155477bd855a") }, { projection: {} })
13. comments.insertOne({ user_id: '50f71be7-5916-4be0-b82b-efcdae15a3ed', comment: 'foo', _id: new ObjectId("61b3a0f54c92155477bd855d"), createdAt: new Date("Fri, 10 Dec 2021 18:48:21 GMT"), updatedAt: new Date("Fri, 10 Dec 2021 18:48:21 GMT"), __v: 0}, { session: null })

14. tracks.updateOne({ _id: new ObjectId("61b3a0f54c92155477bd855a") }, { '$push': { comments: { '$each': [ new ObjectId("61b3a0f54c92155477bd855d") ] } }, '$set': { updatedAt: new Date("Fri, 10 Dec 2021 18:48:21 GMT") }, '$inc': { __v: 1 }}, { session: null })

15. comments.findOneAndUpdate({ _id: new ObjectId("61b3a0f54c92155477bd855d") }, { '$setOnInsert': { createdAt: new Date("Fri, 10 Dec 2021 18:48:21 GMT") }, '$set': { updatedAt: new Date("Fri, 10 Dec 2021 18:48:21 GMT"), comment: 'baz' }}, { upsert: false, remove: false, projection: {}, returnDocument: 'after', returnOriginal: false})


16. tracks.createIndex({ spotifyId: 1 }, { unique: true, background: true })

17. ratings.createIndex({ id: 1 }, { unique: true, background: true })
```
