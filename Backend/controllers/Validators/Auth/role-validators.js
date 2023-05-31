const Role = require('../../../models/roles');

async function fetchRoles(endpoint) {
	return await Role.findOne({ endpoint });
}

async function roleValidator(endpoint, req, res, next) {
    const { access } = await fetchRoles(endpoint);
	const userRoles = req.body.role;
	const hasAccess = access.some((role) => userRoles.includes(role));

	if (hasAccess) {
		next();
	} else {
		res.status(403).json({ error: "Access denied.", success:false });
	}
}



module.exports = { roleValidator };