const fs = require('fs');

const getAllPosibleEnv = (dirName) => fs.readdirSync(dirName).map((fileName) => fileName.split('.').shift());

(() => {
    const { ENV } = process.env;

    const isCorrectEnvName = getAllPosibleEnv('./config').find((name) => name.toUpperCase() === ENV.toUpperCase());

    if (!isCorrectEnvName) {
        const erroMsg = `Incorrect ENV = ${ENV}`;
        throw new Error(erroMsg);
    }

    if (fs.existsSync('.env')) {
        fs.unlinkSync('.env');
    }

    fs.copyFileSync(`./config/${ENV}.env`, '.env');
})();
