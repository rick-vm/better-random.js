import { createWriteStream } from 'fs';
export default class OutputFile {
    constructor(path, { log = true } = { log: true }) {
        this._outputCounter = 0;
        path = './test/' + path.toString().substring(2);
        this._writeStream = createWriteStream(path);
        this._log = log;
        console.log('\x1b[1m===============================================\n', '\x1b[0m');
        console.log(`\x1b[1mOutput: \x1b[36m${this._writeStream.path}\n`, '\x1b[0m');
        console.log('\x1b[1m===============================================\n', '\x1b[0m');
    }
    output(output) {
        if (this._log)
            console.log(output);
        output = new Date() + '\n' + output;
        if (this._outputCounter > 0)
            output = '\n\n' + output;
        this._writeStream.write(output);
        this._outputCounter++;
    }
    clearOutput(output) {
        if (this._log)
            console.log(output);
        output = new Date() + '\n' + output;
        if (this._outputCounter > 0)
            output = '\n\n' + output;
        this._writeStream = createWriteStream(this._writeStream.path);
        this._writeStream.write(output);
        this._outputCounter++;
    }
}
//# sourceMappingURL=OutputFile.js.map