const router = require("express").Router();

const Rentals = require("../models/Rentals.model");
const Location = require("../models/Location.model");
const fileUploader = require("../config/cloudinary.setup");
const { default: mongoose } = require("mongoose");

router.post("/rentals", (req, res, next) => {
  const { title, description, price, locationId } = req.body;

  Rentals.create({ title, description, price, location: locationId })
    .then((newRental) => {
      return Location.findByIdAndUpdate(locationId, {
        $push: { rentals: newRental._id },
      });
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.post(
  "/rentalsImage/:rentalId",
  fileUploader.single("rentalPic"),
  (req, res, next) => {
    const rentalPic = req.file.path;
    const { rentalId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(rentalId)) {
      res.status(400).json({ message: "Specified id is not valid" });
    }
    Rentals.findByIdAndUpdate(rentalId, { rentalPic }, { new: true })
      .then((rentalWithPictureAdded) => {
        res.status(200).json(rentalWithPictureAdded);
      })
      .catch((error) => res.json(error));
  }
);

router.get("/rentals", (req, res, next) => {
  Rentals.find()
    .then((allRentals) => res.json(allRentals))
    .catch((error) => res.json(error));
});

router.get("/rentals/:rentalId", (req, res, next) => {
  const { rentalId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(rentalId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Rentals.findById(rentalId).then((rental) => {
    res
      .status(200)
      .json(rental)
      .catch((error) => res.json(error));
  });
});

router.put("/rentals/:rentalId", (req, res, next) => {
  const { rentalId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(rentalId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Rentals.findByIdAndUpdate(rentalId, req.body, { new: true }).then(
    (updatedRental) => {
      res.json(updatedRental).catch((error) => res.json(error));
    }
  );
});

router.delete("/rentals/:rentalId", (req, res, next) => {
  const { rentalId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(rentalId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Rentals.findByIdAndRemove(rentalId).then(() =>
    res.json({ message: `Rental with ${rentalId} is removed sucessfully` })
  );
});

module.exports = router;
