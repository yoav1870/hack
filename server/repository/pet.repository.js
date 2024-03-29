const MongoStorage = require("../db/mongoStorage");
const mongo = new MongoStorage("pet");

exports.petRepository = {
  find() {
    return mongo.find();
  },
  retrieve(id) {
    return mongo.retrieve(id);
  },
  create(plan) {
    return mongo.create(plan);
  },
  update(id, plan) {
    return mongo.update(id, plan);
  },
  delete(id) {
    return mongo.delete(id);
  },
};
