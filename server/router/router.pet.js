const { Router } = require("express");
const { petController } = require("../controller/pet.controller");
const { RequiredIdError, NotFoundCRUD } = require("../errors/errors");

const petRouter = new Router();

petRouter.get("/", petController.getAllPets);
petRouter.get("/:id", petController.getPet);

petRouter.post("/", petController.createPet);

petRouter.put("/", (req, res, next) => {
  next(new RequiredIdError("put"));
});
petRouter.put("/:id", petController.updatePet);

petRouter.delete("/:id", petController.deletePet);
petRouter.delete("/", (req, res, next) => {
  next(new RequiredIdError("delete"));
});

petRouter.all("*", (req, res, next) => {
  next(new NotFoundCRUD());
});

petRouter.use((err, req, res, next) => {
  if (err instanceof RequiredIdError || err instanceof NotFoundCRUD) {
    res.status(err?.status || 500).json(err.message);
  }
});

module.exports = { petRouter };
