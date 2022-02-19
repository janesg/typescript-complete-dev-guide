import { MatchData } from './MatchData';
import { ReportWriter } from './ReportWriter';

export interface MatchAnalyzer {
    analyze(matches: MatchData[]): string;
}

export class MatchSummary {
    private analyzer: MatchAnalyzer;
    private writer: ReportWriter;

    constructor(analyzer: MatchAnalyzer, writer: ReportWriter) {
        this.analyzer = analyzer;
        this.writer = writer;
    }

    run(data: MatchData[]): void {
        this.writer.write(this.analyzer.analyze(data));
    }
}