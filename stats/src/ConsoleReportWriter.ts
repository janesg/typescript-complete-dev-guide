import { ReportWriter } from './ReportWriter';

export class ConsoleReportWriter implements ReportWriter {
    write(report: string): void {
        console.log(report);
    }
}