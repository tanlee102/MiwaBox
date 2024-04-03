export const shortenAddress = (address) => {
    const prefix = address.slice(0, 5);
    const suffix = address.slice(-5);
    const shortenedAddress = prefix + ".." + suffix;
    return shortenedAddress;
}