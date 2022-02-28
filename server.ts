import fs from 'fs';
import csvParser from "csv-parser";
const results:string[] = [];
const pattern = /([0-9]+(\.[0-9]+)+) [0-9]+/g;
try {
    fs.createReadStream('www.vpngate.net.csv').pipe(csvParser()).on('data',({OpenVPN_ConfigData_Base64:base64_config})=>{
        //convert the config to string
        const buff = Buffer.from(base64_config, 'base64');
        const config = buff.toString('utf-8')
        const string = config.match(pattern);
        if(!string) return
        results.push(string[0])
    }).on('end',()=>{
        fs.writeFileSync('results.txt', JSON.stringify(results))
    })
} catch (error) {
    console.log('%c 🍚 error: ', 'font-size:20px;background-color: #FCA650;color:#fff;', error);
}

csvParser({ separator: '\t' });