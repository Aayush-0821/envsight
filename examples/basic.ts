import { checkEnv } from "../src/index.js";

checkEnv({

    required:[
        "DATABASE_URL",
        "JWT_SECRET",
        "PORT",
        "API_KEY",
    ],

    optional:[
        "REDIS_URL"
    ],

});