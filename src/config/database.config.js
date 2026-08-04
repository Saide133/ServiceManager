import mongoose from 'mongoose';
import config  from './env.config.js';
import dns from 'dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);

export const connectDB = async () => {
 try {
 await mongoose.connect(config.mongoUri);
 console.log('Conexión a MongoDB exitosa');
 } catch (error) {
 console.error('Error al conectar con MongoDB:', error.message);
 process.exit(1);
 }
 };
