// routes/bike.routes.js
const router = require("express").Router();

const Bike = require("../models/Bike.model.js");

router.get("/bikes/create", (req, res) => res.render("bikes/bike-create.hbs"));

router.post("/bikes/create", (req, res, next) => {
  const {
    make,
    model,
    modelFamily,
    year,
    color,
    engine,
    mileage,
    description,
    bikeCondition,
    price,
  } = req.body;
  Bike.create({
    make,
    model,
    modelFamily,
    year,
    color,
    engine,
    mileage,
    description,
    bikeCondition,
    price,
  })
    .then(() => res.redirect("/bikes"))
    .catch((error) => next(error));

  //console.log(req.body);
});

router.get("/bikes", (req, res, next) => {
  Bike.find()
    .then((allBikesFromDB) => {
      console.log("Retrieved bikes from DB", allBikesFromDB);
      res.render("bikes/bikes.hbs", { bikes: allBikesFromDB });
    })
    .catch((error) => {
      console.log("Error while getting the books from DB: ", error);
      next(error);
    });
});

router.get("/bikes/:bikeId", (req, res, next) => {
  const { bikeId } = req.params;

  Bike.findById(bikeId)
    .then((theBike) => res.render("bikes/bike-details.hbs", { bike: theBike }))
    .catch((error) => {
      console.log("Error while retrieving bike details", error);
      next(error);
    });
});

router.get("/bikes/:bikeId/edit", (req, res, next) => {
  const { bikeId } = req.params;

  Bike.findById(bikeId)
    .then((bikeToEdit) => {
      res.render("bikes/bike-edit.hbs", { bike: bikeToEdit });
    })
    .catch((error) => next(error));
});

router.post("/bikes/:bikeId/edit", (req, res, next) => {
  const { bikeId } = req.params;
  const {
    make,
    model,
    modelFamily,
    year,
    color,
    engine,
    mileage,
    description,
    bikeCondition,
    price,
  } = req.body;

  Bike.findByIdAndUpdate(
    bikeId,
    {
      make,
      model,
      modelFamily,
      year,
      color,
      engine,
      mileage,
      description,
      bikeCondition,
      price,
    },
    { new: true }
  )
    .then((updatedBike) => res.redirect(`/bikes/${updatedBike.id}`))
    .catch((error) => next(error));
});

router.post("/bikes/:bikeId/delete", (req, res, next) => {
  const { bikeId } = req.params;

  Bike.findByIdAndDelete(bikeId)
    .then(() => res.redirect("/bikes"))
    .catch((error) => next(error));
});

module.exports = router;
