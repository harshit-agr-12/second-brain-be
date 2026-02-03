import {app} from "./app";

import { connectDb } from "./config/db";
import {config} from "./config/env";

const startServer = async ()=>{
 await connectDb();
 app.listen(config.port, () => {
  console.log(`🚀 Server is running on http://localhost:${config.port}`);
});
}

startServer();