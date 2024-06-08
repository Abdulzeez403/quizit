export const generateRequestID = () => {
    // Get the current date and time in the Africa/Lagos timezone
    const options = {
        timeZone: 'Africa/Lagos', year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', hour12: false
    };
    const formatter = new Intl.DateTimeFormat('en-GB', options);
    const parts = formatter.formatToParts(new Date());

    // Extract and format the date parts correctly
    const datePart = parts.filter(part => part.type !== 'literal').map(part => part.value).join('');

    // Ensure the correct format YYYYMMDDHHMM
    const formattedDate = `${datePart.slice(4, 8)}${datePart.slice(2, 4)}${datePart.slice(0, 2)}${datePart.slice(8, 10)}${datePart.slice(10, 12)}`;

    // Generate a random alphanumeric string (assuming 8 characters)
    const randomString = [...Array(8)].map(() => (Math.random() * 36 | 0).toString(36)).join('');

    // Concatenate the parts
    const generatedValue = `${formattedDate}${randomString}`;

    return generatedValue;
}

// Example usage
console.log(generateRequestID());
