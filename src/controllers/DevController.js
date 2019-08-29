const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
 async index (req,res) {
     const { user } = req.headers;
     const loggedDev = await Dev.findById(user);
    //buscar todos os usuarios que não estão logados e que também ja deram like/dislike
    //Linha 14 diz: me trás todos os usuários que o _id não seja igual ao usuário que está passando
    //Linha 15 diz: exclua todos que estiverem dentro da listagem "loggedDev.likes" que o _id que o usuário já deu like
    //Linha 16 diz: exclua todos que estiverem dentro da listagem "loggedDev.likes" que o _id que o usuário já deu dislike
     const users = await Dev.find({
         $and: [
            { _id: { $ne: user } },
            { _id: { $nin: loggedDev.likes } },
            { _id: { $nin: loggedDev.dislikes } },
         ],
     })
     return res.json(users);
 },

 async store(req,res) {
    const { username } = req.body;

    const userExists = await Dev.findOne({ user: username });
    if(userExists) {
        return res.json(userExists);
    }
    
    const response = await axios.get(`https://api.github.com/users/${username}`);

    const {name, bio, avatar_url : avatar} = response.data;
    const dev = await Dev.create({
        name,
        user: username,
        bio,
        avatar
    })

    return res.json(dev);
 }
};
