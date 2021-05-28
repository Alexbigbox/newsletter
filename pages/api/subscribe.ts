import { VercelRequest, VercelResponse } from '@vercel/node'
import { MongoClient, Db } from 'mongodb'
import url from 'url';

let cachedDb: Db = null;

async function connectToDatabase(uri: string) {
    if (cachedDb) {
        return cachedDb;
    }
    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // const dbName = url.parse(uri).pathname.substr(1);
    const db = client.db('news');
    

    cachedDb = db;
}
export default async (request: VercelRequest, response: VercelResponse) => {
    const { email } = request.body;
    console.log(process.env.MONGODB_URI, "vishi")
    const db = await connectToDatabase("mongodb+srv://bigbox:bigbox@cluster0.wcnbf.mongodb.net/news?retryWrites=true&w=majority");
    console.log(db)
    const collection = db.collection('subscribers');

    // await collection.insertOne({
    //     email,
    //     subscribedAt: new Date(),
    // })

    return response.status(201).json({ ok: true });
}