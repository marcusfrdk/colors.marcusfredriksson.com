const copyToClipboard = (text: string) => {
  try {
    navigator.clipboard.writeText(text);
    // Display success message
  } catch (err) {
    console.error("Failed to copy to clipboard");
    // Display error message
  }
};

export default copyToClipboard;
