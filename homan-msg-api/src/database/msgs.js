// ./src/database/msgs.js
const {getDatabase} = require('./mongo');

const collectionName = 'msgs';
// get id
const {ObjectID} = require('mongodb');

// POST
async function insertMsg( msg ) {
  const database = await getDatabase();
  const {insertedId} = await database.collection(collectionName).insertOne( msg );
  return insertedId;
}

// GET
async function getMsgs() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}

// DELETE
async function deleteMsg( id ) {
  const database = await getDatabase();
  await database.collection(collectionName).deleteOne({
    _id: new ObjectID( id ),
  });
}

// PUT
async function updateMsg( id, msg ) {
  const database = await getDatabase();
  delete msg._id;
  await database.collection(collectionName).updateOne(
    { _id: new ObjectID( id ), },
    {
      $set: {
		...msg,
      },
    },
  );
}

module.exports = {
  insertMsg,
  getMsgs,
  deleteMsg,
  updateMsg
};