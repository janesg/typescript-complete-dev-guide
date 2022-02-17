import fs from 'fs';

export class CsvFileReader<T> {
    constructor(
        public filePath: string, 
        public rowMapper: (values: string[]) => T) {}

    read(): T[] {
        return fs.readFileSync(this.filePath, {
            encoding: 'utf-8',
        })
        .split('\n')
        .map((row: string): string[] => {
            return row.split(',');
        })
        .map(this.rowMapper);
    }
}