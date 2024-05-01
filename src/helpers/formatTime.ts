export const formatTimestamp = (lapTime: number): string => {
    const hours = Math.floor(lapTime / (1000 * 60 * 60));
    const minutes = Math.floor((lapTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((lapTime % (1000 * 60)) / 1000);
    const ms = lapTime % 1000;
    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${ms < 10 ? '00' : ms < 100 ? '0' : ''}${ms}`;
};

export const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};