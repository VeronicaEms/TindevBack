const Dev = require('../models/Dev');

module .exports = {
   async store(req,res) {
        const { devId } = req.params;
        const { user } = req.headers;

        //buncando o model deles(dos usuarios) no banco de dados
        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        //se ele ta dando like em um usuário que não existe:
        if(!targetDev){
            return res.status(400).json({ error: 'Usuário não existe' });
        }
        //Se encontrou o usuário:
        loggedDev.dislikes.push(targetDev._id);
        await loggedDev.save();

        return res.json( loggedDev );
    }
};
