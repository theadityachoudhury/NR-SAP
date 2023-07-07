const { StoneValidator } = require("../Validators/Stone/stone-validator")
const Stone = require("../../models/stone-models");
const Joi = require("joi");

const add = async (req, res, next) => {
    try {
        const stoneReq = await StoneValidator.validateAsync(req.body); 
        const stone = new Stone({
            ...stoneReq
        })

        await stone.save();
        return res.status(201).json(
            "Created"
        )
        
    } catch (err) {
        if (err.isJoi===true) {
            return res.status(409).json(
                "not ok"
            )
        }

        return res.status(500).json(
            "Internal Server Error"
        )
    }
}

const getAll = async (req, res, next) => {
    try {
        const stones = await Stone.find();
        return res.status(200).json(stones);
    } catch (err) {
        return res.status(500).json(
            "Internal Server Error"
        )
    }
}

const getOne = async (req, res, next) => {
    try {
        const id = req.params.id;
        const stone = await Stone.findById(id);
        if (!stone) {
            return res.status(404).json({
                success: false,
                message: "Data not found"
            });
        }
        return res.status(200).json({
            success: true,
            data: stone
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    add,
    getAll,
    getOne
}


/* const getOne = async (req, res, next) => {
    try {
        const { id } = req.body;
        const stone = await Stone.findById(id);
        if (!stone) {
            return res.status(404).json({
                success: false,
                message: "Stone not found"
            });
        }
        return res.status(200).json({
            success: true,
            data: stone
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    add,
    getAll,
    getOne
}; */