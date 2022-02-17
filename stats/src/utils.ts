export const dateStrToDate = (dateStr: string): Date => {
    const dateParts = dateStr.split('/').map((str: string) => parseInt(str));
    return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
}