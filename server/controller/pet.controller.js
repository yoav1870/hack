const { petRepository } = require("../repository/pet.repository");
const {
  NoDataError,
  petAlreadyExists,
  petDoesntExist,
  formErorr,
} = require("../errors/errors");

const exist = async (id) => {
  const pets = await petRepository.find();
  const petsExists = pets.find((pet) => pet.id == id);
  if (!petsExists) {
    throw new petDoesntExist(id);
  }
};

exports.petController = {
  async getAllPets(req, res) {
    try {
      const result = {
        status: 200,
        data: await petRepository.find(),
      };

      // console.log(result.data);
      if (result.data.length === 0) {
        throw new NoDataError();
      }
      res.status(result.status);
      res.json(result.data);
    } catch (error) {
      res.status(error?.status || 500).json(error.message);
    }
  },
  async getPet(req, res) {
    try {
      const { id } = req.params;
      const result = {
        status: 200,
        data: await petRepository.retrieve(id),
      };
      if (result.data === null) {
        throw new petDoesntExist(id);
      }
      res.status(result.status);
      res.json(result.data);
    } catch (error) {
      res.status(error?.status || 500).json(error.message);
    }
  },

  async createPet(req, res) {
    try {
      const { body } = req;
      if (!body.name || !body.age || !body.type || !body.status) {
        throw new formErorr();
      }
      const pets = await petRepository.find();
      const petsExists = pets.find(
        (pet) =>
          pet.name === body.name &&
          pet.age === body.age &&
          pet.type === body.type &&
          pet.status === body.status
      );
      if (petsExists) {
        throw new petAlreadyExists(body.name, body.age);
      }
      const result = {
        status: 201,
        data: await petRepository.create(body),
      };
      res.status(result.status);
      res.json(result.data);
    } catch (error) {
      res.status(error?.status || 500).json(error.message);
    }
  },
  async updatePet(req, res) {
    try {
      const {
        body: pet,
        params: { id },
      } = req;
      await exist(id);
      const result = {
        status: 200,
        message: "updeated successfully pet with id: " + id + ".",
        data: await petRepository.update(id, pet),
      };
      res.status(result.status);
      res.json(result.message);
    } catch (error) {
      res.status(error?.status || 500).json(error.message);
    }
  },
  async deletePet(req, res) {
    try {
      const { id } = req.params;
      await exist(id);
      const result = {
        status: 200,
        message: "pet with id: " + id + " deleted successfully.",
        data: await petRepository.delete(id),
      };
      if (result.data === null) {
        throw new petDoesntExist(id);
      }
      res.status(result.status);
      res.json(result.message);
    } catch (error) {
      res.status(error?.status || 500).json(error.message);
    }
  },
};
