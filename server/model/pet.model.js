const { Schema, model } = require("mongoose");

const petRescueSchema = new Schema(
  {
    id_pet: { type: Number, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    type: { type: String, required: true },
    breed: { type: String },
    status: { type: String, enum: ["Available", "Adopted"], required: true },
    certifications: { type: String },
    rescueDate: { type: Date, required: true },
    image: { type: String, required: true },
  },
  { collection: "CollPetRescue", versionKey: false }
);

module.exports = model("PetRescue", petRescueSchema);
