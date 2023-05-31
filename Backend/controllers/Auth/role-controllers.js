const Role = require('../../models/roles');

const addRoles = async (req, res, next) => {
    const { endpoint, access } = req.body;
    const role = new Role({
        endpoint,
        access,
    })
    console.log(role);
    await role.save();
    return res.status(200).json("Successfully created");
}

module.exports = { addRoles };