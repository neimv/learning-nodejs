const { MongoClient, ObjectId, Logger } = require('mongodb');
const config = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}`;
// const MONGO_URI = 'mongodb://root:gocurso@localhost:27017/platzivideos_db?retryWrites=true&w=majority'
// https://stackoverflow.com/questions/37372684/mongodb-3-2-authentication-failed

console.error(MONGO_URI)

class MongoLib {
    constructor() {
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
        this.dbName = DB_NAME;
    }

    connect() {
        if (!MongoLib.connection) {
            MongoLib.connection = new Promise((resolve, reject) => {
                this.client.connect(err => {
                    if (err) {
                        reject(err);
                    }

                    console.log('Connected successfully to mongo');
                    resolve(this.client.db(this.dbName));
                });
            });
        }

        return MongoLib.connection;
    }

    getAll(collection, query) {
        return this.connect().then(db => {
            return db.collection(collection).find(query).toArray();
        })
    }

    get(collection, id) {
        return this.connect().then(db => {
            return db.collection(collection).findOne({ _id: ObjectId(id) });
        })
    }

    create(collection, data) {
        return this.connect().then(db => {
            return db.collection(collection).insertOne(data);
        }).then(result => result.insertedId);
    }

    update(collection, id, data) {
        return this.connect().then(db => {
            return db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
        }).then(result => result.upsertedId || id);
    }

    delete(collection, id) {
        return this.connect().then(db => {
            return db.collection(collection).deleteOne({ _id: ObjectId(id) });
        }).then(() => id);
    }
}

module.exports = MongoLib;