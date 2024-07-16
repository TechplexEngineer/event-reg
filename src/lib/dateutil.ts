
// Note this is a JS timestamp, miliseconds since epoch, divide by 1000 to get Unix Timestamp
export const formatUnix2Long = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
}