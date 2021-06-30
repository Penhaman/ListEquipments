const Equip = require('../models/equips.model');

module.exports = {
    async index(req,res){
        const listEquip = await Equip.find();
        res.json(listEquip);
    },
    async create(req, res){
        const {brand, model, client, quantity, observations} = req.body;
        let data = {};
        data = {brand, model, client, quantity, observations};
        let equipFind = await Equip.create(data);
        return res.status(200).json(equipFind);
    },
    async details(req,res){
        const {_id} = req.params;
        const detailEquip = await Equip.findOne({_id});
        res.json(detailEquip);
    },
    async delete(req, res) {
        const {_id} = req.parms;
        const deleteEquip = await Equip.findByIdAndDelete({_id});
        return res.json(deleteEquip);
    },
    async update(req,res) {
        const {_id, brand, model, orderNo, client, quantity, observations} = req.body;
        const data = {brand, model, orderNo, client, quantity, observations};
        const updateEquip = await Equip.findOneAndUpdate({_id}, data, {new:true});

        return res.json(updateEquip);
    }
}