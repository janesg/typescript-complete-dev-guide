import { CsvFileReader } from './CsvFileReader';
import { MatchResult } from './MatchResult';
import { dateStrToDate } from './utils';

type MatchData = [Date, string, string, number, number, MatchResult, string];

const matchRowMapper = (values: string[]): MatchData => {
    return [
        dateStrToDate(values[0]),
        values[1],
        values[2],
        parseInt(values[3]),
        parseInt(values[4]),
        values[5] as MatchResult,  // Type assertion
        values[6]
    ]
}

const csvFileReader = new CsvFileReader<MatchData>(
        'data/football.csv', matchRowMapper);

// Returns match data as a MatchData[]
const matches = csvFileReader.read();

let afcWins = 0;

for (let match of matches) {
    if ((match[1] === 'Arsenal' && match[5] === MatchResult.HomeWin) || 
        (match[2] === 'Arsenal' && match[5] === MatchResult.AwayWin)) {
        afcWins += 1;
    }
}

console.log(`Arsenal Wins: ${afcWins}`)