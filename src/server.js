import config from "./config/env.config.js"; 
import app from "./app.js";

app.listen(config.port, () => {
  console.log(`Servidor escuchando en el puerto ${config.port}`);
}) 

