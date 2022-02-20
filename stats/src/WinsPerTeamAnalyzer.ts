import { MatchData } from './MatchData';
import { MatchResult } from './MatchResult';
import { MatchAnalyzer} from './MatchSummary';

export class WinsPerTeamAnalyzer implements MatchAnalyzer {
    analyze(matches: MatchData[]): string {
        const teamWins = new Map<string, number>();

        for (let match of matches) {
            if (match[5] === MatchResult.HomeWin) {
                const currentValue = teamWins.get(match[1]) || 0;
                teamWins.set(match[1], currentValue + 1);    
            } else if (match[5] === MatchResult.AwayWin) {
                const currentValue = teamWins.get(match[2]) || 0;
                teamWins.set(match[2], currentValue + 1);    
            }
        }

        // Create an array from the map entries and then sort the array on:
        //  - (1) wins descending
        //  - (2) team name ascending
        const sortedTeamWins = [...teamWins.entries()]
                .sort((a, b) => a[1] !== b[1] ? b[1] - a[1] : String(a[0]).localeCompare(b[0]));

        return sortedTeamWins.map(stw => `${stw[0]}: ${stw[1]} wins`).join('\n');
    }
}