const Vehicles = require("../../models/vehicles");

const addVehicle = async (req, res, next) => {
	const { number, owner_name, purchase_date, cost } = req.body;
	const vehicles = new Vehicles({
		number,
		owner_name,
		purchase_date,
		cost,
    });
    vehicles.save();
};
