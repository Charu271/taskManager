// // const mongodb = require("mongodb");
// // const MongoClient = mongodb.MongoClient;
// // const ObjectID=mongodb.ObjectID;

// const { MongoClient, ObjectID } = require("mongodb");
// const id = new ObjectID();
// // console.log(id);
// // console.log(id.getTimestamp());
// // console.log(id.toHexString().length);
// // console.log(ObjectID(id.id));
// // console.log(id.id);
// // console.log(id.id.length);

// const connectionURL = "mongodb://localhost:27017";
// const databaseName = "task-manager";

// MongoClient.connect(
//   connectionURL,
//   { useUnifiedTopology: true },
//   (error, client) => {
//     if (error) {
//       return console.log("Unable to connect to the database");
//     }
//     const db = client.db(databaseName);
//     db.collection("tasks")
//       .deleteOne({ description: "Task2" })
//       .then((result) => console.log(result))
//       .catch((error) => console.log(error));
//     // db.collection("users")
//     //   .deleteMany({ age: 18 })
//     //   .then((result) => console.log(result))
//     //   .catch((error) => console.log(error));
//     // db.collection("tasks")
//     //   .updateMany({ completed: false }, { $set: { completed: true } })
//     //   .then((result) => console.log(result))
//     //   .catch((error) => console.log(error));
//     // db.collection("users")
//     //   .updateOne(
//     //     {
//     //       _id: new ObjectID("5f9e43ad3d4fc90324048f99"),
//     //     },
//     //     {
//     //       $inc: {
//     //         age: -1,
//     //       },
//     //     }
//     //   )
//     //   .then((result) => console.log(result))
//     //   .catch((error) => console.log(error));
//     // db.collection("tasks").findOne(
//     //   { _id: ObjectID("5f9e43ad3d4fc90324048f9d") },
//     //   (error, task) => {
//     //     if (error) return console.log(error);
//     //     console.log(task);
//     //   }
//     // );
//     // db.collection("tasks")
//     //   .find({ completed: false })
//     //   .toArray((error, tasks) => {
//     //     if (error) return console.log(error);
//     //     console.log(tasks);
//     //   });
//     // db.collection("users")
//     //   .find({ age: 18 })
//     //   .toArray((error, users) => {
//     //     if (error) return console.log(error);
//     //     console.log(users);
//     //   });
//     // db.collection("users")
//     //   .find({ age: 18 })
//     //   .count((error, count) => {
//     //     if (error) return console.log(error);
//     //     console.log(count);
//     //   });
//     // db.collection("users").findOne(
//     //   { name: "Charu Sachdeva", age: 16 },
//     //   (error, user) => {
//     //     if (error) {
//     //       return console.log("Unable to fetch");
//     //     }
//     //     console.log(user);
//     //   }
//     // );
//     // db.collection("users").findOne({ age: 18 }, (error, user) => {
//     //   if (error) {
//     //     return console.log("Unable to fetch");
//     //   }
//     //   console.log(user);
//     // });
//     // db.collection("users").insertOne(
//     //   {
//     //     _id: id,
//     //     name: "Charu Sachdeva",
//     //     age: 18,
//     //   },
//     //   (error, result) => {
//     //     if (error) {
//     //       return console.log(error);
//     //     }
//     //     console.log(result.ops);
//     //   }
//     // );
//     // db.collection("users").insertMany(
//     //   [
//     //     {
//     //       name: "harry",
//     //       age: 16,
//     //     },
//     //     {
//     //       name: "chavi",
//     //       age: 18,
//     //     },
//     //   ],
//     //   (error, result) => {
//     //     if (error) {
//     //       return console.log(error);
//     //     }
//     //     console.log(result.ops);
//     //   }
//     // );
//     // db.collection("tasks").insertMany(
//     //   [
//     //     { description: "Task1", completed: true },
//     //     { description: "Task2", completed: false },
//     //     { description: "Task3", completed: true },
//     //   ],
//     //   (error, result) => {
//     //     if (error) {
//     //       return console.oog(error);
//     //     }
//     //     console.log(result.ops);
//     //   }
//     // );
//     // console.log(db);
//   }
// );
