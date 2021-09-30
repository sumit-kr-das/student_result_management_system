import { User } from "../../models";

const listUser = {
  async list(req, res) {
    const data = req.payload;
    res.json(data);   
  },
};

export default listUser;
