export function extractNames(combinedName: string): { shortName: string, readableName: string } {
    let shortName = '';
    let readableName = '';

    // Check if the combined name is already all uppercase
    if (combinedName === combinedName.toUpperCase()) {
        shortName = combinedName;
        readableName = combinedName;
    } else {
        // Regular expression to extract the uppercase short name and the preceding readable name
        const match = combinedName.match(/^(.*?)([A-Z]+)$/);
        if (match) {
            readableName = match[1].trim();
            shortName = match[2].trim(); // This will capture all uppercase letters at the end
        } else {
            console.log(`Failed to extract names from: ${combinedName}`);
        }
    }

    return { shortName, readableName };
}
