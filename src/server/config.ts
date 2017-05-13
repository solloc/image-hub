import * as path from "path";
import * as fs from "fs";

export class Config {

    public get mongoHost():string {
        return this.config.mongodb.host;
    }

    public get mongoPort():string {
        return this.config.mongodb.port;
    }

    public get dataDirectory():string {
        if(process.env.NODE_ENV == 'development'){
            return this.config.dataDirectory;
        } else {
            return '/data/assets'
        }
    }

    protected get config():any {
        let filePath;
        if (process.env.NODE_ENV == 'development') {
            for (let argument of process.argv) {
                if (argument.search('--configFile') != -1) {
                    let configFileName = argument.split('=')[1];
                    filePath = path.join(process.cwd(), configFileName);
                }
            }
        } else {
            filePath = '/data/config/config.json';
        }
        let configFile = fs.readFileSync(filePath);
        return JSON.parse(configFile.toLocaleString());
    }
}