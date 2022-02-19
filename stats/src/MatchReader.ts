import { MatchData } from './MatchData';
import { MatchResult } from './MatchResult';
import { dateStrToDate } from './utils';

interface MatchDataReader {
    read(): MatchData[];
}

export const matchRowMapper = (values: string[]): MatchData => {
    return [
        dateStrToDate(values[0]),
        values[1],
        values[2],
        parseInt(values[3]),
        parseInt(values[4]),
        values[5] as MatchResult,  // Type assertion
        values[6]
    ];
}

export class MatchReader implements MatchDataReader {
    private reader: MatchDataReader;

    constructor(reader: MatchDataReader) {
        this.reader = reader;
    }

    read(): MatchData[] {
        return this.reader.read();
    }
}