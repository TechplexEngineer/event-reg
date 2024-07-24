import { type VideoEvent } from './events.db';

export const arrayToCsv = (data: any[]) => {
    if (!data || !data.length) {
        return '';
    }

    const headers = Object.keys(data[0]);
    const csvRows = [];

    // Add the headers to the first row
    csvRows.push(headers.join(','));

    // Map the data to rows
    data.forEach((row) => {
        const values = headers.map((header) => {
            const escaped = ('' + row[header]).replace(/"/g, '\\"');
            return `"${escaped}"`;
        });
        csvRows.push(values.join(','));
    });

    // Join rows with new lines
    return csvRows.join('\n');
};

export const arrayToJSON = (events: VideoEvent[]) => {
    return JSON.stringify(events ?? [], null, 2);
};

export const downloadData = (data: Blob, fileName: string) => {
    const url = URL.createObjectURL(data);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
};

export const saveDbCSV = async (events: VideoEvent[], fileName: string) => {
    const csvData = arrayToCsv(events);
    const blob = new Blob([csvData], { type: 'text/csv' });

    downloadData(blob, `events-${fileName}.csv`);
};

export const saveDbJSON = async (events: VideoEvent[], fileName: string) => {
    const jsonData = arrayToJSON(events);
    const blob = new Blob([jsonData], { type: 'application/json' });

    downloadData(blob, `events-${fileName}.json`);
};