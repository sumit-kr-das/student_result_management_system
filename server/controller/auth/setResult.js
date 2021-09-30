import { result } from '../../models';

const setResult = {
    async result(req,res){

        const saveSch = new result({     
        name: req.body.name,
        roll: req.body.roll,
        hindi: req.body.hindi,
        english: req.body.english,
        math: req.body.math,
        computer: req.body.computer,
        physics: req.body.physics,
        chemistry: req.body.chemistry,
        total: req.body.total,
        average: req.body.average 
        });

        const SaveRE = await saveSch.save();

        if(SaveRE){
            res.status(200).json({ msg: "result successfully registered" })
        }else{
            res.status(401).json({ msg: "error in saving result" })
        }
    }
}

export default setResult;