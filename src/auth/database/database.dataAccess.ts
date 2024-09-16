import {Db, MongoClient} from 'mongodb'
import {DatabaseCollection} from './database.collection'
import {HttpException} from '../../common/exceptions/HttpException';

export class DatabaseDataAccess {
    private static instance: DatabaseDataAccess;
    private client: MongoClient;
    protected db: Db;
    private mongoUri: string = process.env.MONGO_URI;
    private dbName: string = process.env.MONGO_DB_NAME;

    private constructor() {}

    public static async getInstance(): Promise<DatabaseDataAccess> {
        if (!DatabaseDataAccess.instance) {
            DatabaseDataAccess.instance = new DatabaseDataAccess();
            await DatabaseDataAccess.instance.connect()
        }
        return DatabaseDataAccess.instance;
    }

    async connect() {
        try {
            this.client = new MongoClient(this.mongoUri);
            this.client = await this.client.connect();

            this.db = this.client.db(this.dbName);
            console.log('MongoDB connected');
        } catch (e) {
            throw new HttpException(400, 'Database connection error' + JSON.stringify(e));
        }
    }

    async close() {
        await this.client.close();
    }

    // CRUD METHODS

    async filterOne(collectionName: DatabaseCollection, query: Record<string, any>) {
        const collection = this.db.collection(collectionName);
        return await collection.findOne(query);
    }

    async findAll(collectionName: DatabaseCollection, query: Record<string, any> = {}) {
        const collection = this.db.collection(collectionName);
        return await collection.find(query).toArray();
    }

    async createOne(collectionName: DatabaseCollection, document: Record<string, any>) {
        const collection = this.db.collection(collectionName);
        const result = await collection.insertOne(document);
        return result.insertedId;
    }

    async updateOne(collectionName: DatabaseCollection, query: Record<string, any>, update: Record<string, any>) {
        const collection = this.db.collection(collectionName);
        const result = await collection.updateOne(query, { $set: update });
        return result.matchedCount > 0 ? await this.filterOne(collectionName, query) : null;
    }
}
