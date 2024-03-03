const mongoose = require("mongoose");
const Path = require("path");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

module.exports = class MongoStorage {
  constructor(pet) {
    this.Model = require(Path.resolve(__dirname, `../model/${pet}.model.js`));
    this.connect();
  }
  connect() {
    const connectionUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`;
    mongoose
      .connect(connectionUrl)
      .then(() => {
        if (process.env.NODE_ENV !== "test") {
          console.log("Database connected");
        }
      })
      .catch((err) => console.log(`connection error: ${err}`));
  }
  find() {
    // return
    return this.Model.find();
  }
  retrieve(id) {
    if (!isValidObjectId(id)) {
      return null;
    }
    return this.Model.findById(id);
  }
  create(data) {
    const pet = new this.Model(data);
    pet.save();
    return pet;
  }
  delete(id) {
    if (!isValidObjectId(id)) {
      return null;
    }
    return this.Model.deleteOne({ _id: id });
  }
  update(id, data) {
    const { _id, ...updateData } = data;
    return this.Model.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }
};
