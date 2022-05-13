const copyToClipboard = (value: string): boolean => {
  try {
    navigator.clipboard.writeText(value);
    // Display success message
    return true;
  } catch (err) {
    console.error("Failed to copy to clipboard");
    process.env.NODE_ENV === "development" && console.error(err);
    // Display error message
    return false;
  }
};

export default copyToClipboard;
