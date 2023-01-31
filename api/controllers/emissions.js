const EmissionsController = {
  GetPlaneEmissions: (req, res) => {
    res.status(200).json({ message: "ok" });
  },
};

module.exports = EmissionsController;
