const copyToClipboard = (text: string): boolean => {
  try {
    navigator.clipboard.writeText(text);
    // Display success message
    return true;
  } catch (err) {
    console.error("Failed to copy to clipboard");
    // Display error message
    return false;
  }
};

export default copyToClipboard;
