import { CsvFileReader } from './CsvFileReader';
import { MatchData, MatchReader, matchRowMapper } from './MatchReader';
import { MatchResult } from './MatchResult';

const matchFileReader = new MatchReader(
    new CsvFileReader<MatchData>('data/football.csv', matchRowMapper));
    
// Returns match data as a MatchData[]
const matches = matchFileReader.read();

let afcWins = 0;

for (let match of matches) {
    if ((match[1] === 'Arsenal' && match[5] === MatchResult.HomeWin) || 
        (match[2] === 'Arsenal' && match[5] === MatchResult.AwayWin)) {
        afcWins += 1;
    }
}

console.log(`Arsenal Wins: ${afcWins}`)