import { result } from "../../models";

const getResult = {
    async result(req,res){
        const resu = await result.find({ roll:"sumit" });
        res.json({resu});
    }
}

export default getResult;