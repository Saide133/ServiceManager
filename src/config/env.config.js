import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: Number(process.env.PORT) || 8080,
    nodeEnv: process.env.NODE_ENV || 'development',
};

if (!config.port || isNaN(config.port)) {
    console.error('Error: PORT no es un número válido')
    process.exit(1);
}

export default config;