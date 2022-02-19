import { ConsoleReportWriter } from './ConsoleReportWriter';
import { CsvFileReader } from './CsvFileReader';
import { MatchData } from './MatchData';
import { MatchReader, matchRowMapper } from './MatchReader';
import { MatchSummary } from './MatchSummary';
import { WinsPerTeamAnalyzer } from './WinsPerTeamAnalyzer';

const matchFileReader = new MatchReader(
    new CsvFileReader<MatchData>('data/football.csv', matchRowMapper));
    
// Returns match data as a MatchData[]
const matches = matchFileReader.read();

const matchSummary = new MatchSummary(new WinsPerTeamAnalyzer(), new ConsoleReportWriter());
matchSummary.run(matches);