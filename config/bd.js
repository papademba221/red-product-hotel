const mongoose = require('mongoose');


const connectBD = async () => {
    try {
        const mongoURL = process.env.URL_BD
        await mongoose.connect(mongoURL);
        console.log('mongoDB connecté')
    } catch (error) {
        console.error('erreur mongoDB: ', error);
        process.exit(1);
    }
}
    

module.exports = connectBD;