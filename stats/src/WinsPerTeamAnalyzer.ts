import { MatchData } from './MatchData';
import { MatchResult } from './MatchResult';
import { MatchAnalyzer} from './MatchSummary';

export class WinsPerTeamAnalyzer implements MatchAnalyzer {
    analyze(matches: MatchData[]): string {
        const teamWins = new Map<string, number>();

        for (let match of matches) {
            if (match[5] === MatchResult.HomeWin) {
                if (teamWins.has(match[1])) {
                    const currentValue = teamWins.get(match[1]);
                    teamWins.set(match[1], currentValue ? currentValue + 1 : 0);    
                } else {
                    teamWins.set(match[1], 1);    
                }
            } else if (match[5] === MatchResult.AwayWin) {
                if (teamWins.has(match[2])) {
                    const currentValue = teamWins.get(match[2]);
                    teamWins.set(match[2], currentValue ? currentValue + 1 : 0);    
                } else {
                    teamWins.set(match[2], 1);    
                }
            }
        }

        // Create an array from the map entries and then sort the array on:
        //  - (1) wins descending
        //  - (2) team name ascending
        const sortedTeamWins = [...teamWins.entries()]
                .sort((a, b) => { 
                        if (a[1] === b[1]) {
                            return String(a[0]).localeCompare(b[0]);
                        } else {
                            return b[1] - a[1]; 
                        }
                    }
                );

        let output = '';
        sortedTeamWins.forEach(stw => output = output.concat(`${stw[0]}: ${stw[1]} wins\n`));

        return output;
    }
}