const bcrypt = require('bcrypt')
const fs = require('fs');
if (!process.argv.slice(2)) {
    console.log("please supply a password afer the run file e.g. node set-password.js PaSSword")
} else {
    try {
        let conf = JSON.parse(fs.readFileSync('conf.json', 'utf8'));
        console.log("encypting your password...")
        conf.password = bcrypt.hashSync(`${process.argv.slice(2)}`, 10);
        console.log("done.")
        console.log("writing your password to the ./conf.json file...")
        fs.writeFileSync('conf.json', JSON.stringify(conf, null, 2));
        console.log("done your password has changed.")
    } catch (err) {
        console.log("there has been an error: " + err)
    }
}