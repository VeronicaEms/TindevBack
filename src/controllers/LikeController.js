const Dev = require('../models/Dev');

module .exports = {
   async store(req,res) {
        const { user } = req.headers;
        const { devId } = req.params;

        //buncando o model deles(dos usuarios) no banco de dados
        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        //se ele ta dando like em um usuário que não existe:
        if(!targetDev){
            return res.status(400).json({ error: 'Usuário não existe' });
        }

        if( targetDev.likes.includes(loggedDev._id)) {
            console.log('Deu Match!!!');
        }
        //Se encontrou o usuário:
        loggedDev.likes.push(targetDev._id);
        await loggedDev.save();

        return res.json( loggedDev );
    }
};
