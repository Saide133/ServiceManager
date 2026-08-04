import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: Number(process.env.PORT) || 8080,
    nodeEnv: process.env.NODE_ENV || 'development',
    mongoUri: process.env.MONGO_URI
};

if (!config.port || isNaN(config.port)) {
    console.error('Error: PORT no es un número válido')
    process.exit(1);
}

if (!config.mongoUri) {
    console.error('Error: MONGO_URI no está definido en el archivo .env')
    process.exit(1);
}

export default config;