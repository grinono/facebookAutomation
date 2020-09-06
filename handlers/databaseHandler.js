// Packages Imports
const Datastore = require("nedb");

// Type 3: Persistent Datastore with Automatic Loading
const db = new Datastore({ filename: "./database/users.db", autoload: true });

// Find Document
module.exports.findOne = (query) =>
  new Promise((resolve, reject) => {
    db.findOne(query, (err, doc) => {
      if (err) reject({ type: err.type, message: err.message });
      resolve(doc);
    });
  });

// Find All Documents
module.exports.findAll = () =>
  new Promise((resolve, reject) => {
    db.find({}, (err, docs) => {
      if (err) reject({ type: err.type, message: err.message });
      resolve(docs);
    });
  });

// Insert Document
module.exports.insert = (doc) =>
  new Promise((resolve, reject) => {
    db.insert(doc, (err, createdDoc) => {
      if (err) reject({ type: err.type, message: err.message });
      resolve(createdDoc);
    });
  });
