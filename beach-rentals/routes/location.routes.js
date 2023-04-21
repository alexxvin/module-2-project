const router = require("express").Router();

const { default: mongoose } = require("mongoose");
const Location = require("../models/Location.model");
const Rentals = require("../models/Rentals.model");

router.post("/location", (req, res, next) => {
  const { street, city, state, zip, name } = req.body;

  Location.create({ street, city, state, zip, name, rentals: [] })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.get("/location", (req, res, next) => {
  Location.find()
    .populate("rentals")
    .then((allLocations) => res.json(allLocations))
    .catch((err) => res.json(err));
});

router.get("/location/:locationId", (req, res, next) => {
  const { locationId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(locationId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Location.findById(locationId)
    .populate("rentals")
    .then((location) => res.status(200).json(location))
    .catch((error) => res.json(error));
});

router.put("/location/:locationId", (req, res, next) => {
  const { locationId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(locationId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Location.findByIdAndUpdate(locationId, req.body, { new: true })
    .then((updatedLocation) => res.json(updatedLocation))
    .catch((error) => res.json(error));
});

router.delete("/location/:locationId", (req, res, next) => {
  const { locationId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(locationId)) {
    res.status(400).json({ messsage: "Specified id is not valid" });
    return;
  }
  Location.findByIdAndRemove(locationId)
    .then(() =>
      res.json({
        message: `Location with ${locationId} is removed successfully`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
