export const formatControl = (amt: number) => {
    const absAmt = Math.abs(amt);
    const minutes = Math.floor(absAmt / 60);
    const remainingSeconds = absAmt % 60;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${minutes}:${formattedSeconds}`;
};

export const formatTime = (amt: number | undefined) => {
    if (typeof amt == "undefined") return "";
    const absAmt = Math.abs(amt);
    const minutes = Math.floor(absAmt / 60);
    const remainingSeconds = Math.round(absAmt % 60);
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${minutes}:${formattedSeconds}`;
};
