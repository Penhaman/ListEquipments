const Equips = require('../models/equips.model');

module.exports = {
    async index(req,res){
        const listEquip = await Equips.find();
        res.json(listEquip);
    },
    async create(req, res){
        const {brand, model, client, quantity, observations, salesman} = req.body;
        let data = {};
        data = {brand, model, client, quantity, observations,salesman};
        let equipFind = await Equips.create(data);
        return res.status(200).json(equipFind);
    },
    async details(req,res){
        const {_id} = req.params;
        const detailEquip = await Equips.findOne({_id});
        res.json(detailEquip);
    },
    async delete(req, res) {
        const {_id} = req.parms;
        const deleteEquip = await Equips.findByIdAndDelete({_id});
        return res.json(deleteEquip);
    },
    async update(req,res) {
        const {_id, brand, model, client, quantity, observations} = req.body;
        const data = {brand, model, client, quantity, observations};
        const updateEquip = await Equips.findOneAndUpdate({_id}, data, {new:true});

        return res.json(updateEquip);
    }
}