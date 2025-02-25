// Add this function to your preview.js file or update the existing handlePublish function

const handlePublish = async (portfolioData) => {
  try {
    console.log("Publishing portfolio...");

    // If portfolioData doesn't have userId, add a fallback
    if (!portfolioData.userId) {
      portfolioData.userId = "anonymous-user"; // Or any other fallback logic
    }

    const response = await fetch("/api/portfolio/publish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(portfolioData),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API error:", data);
      throw new Error(data.error || "Failed to publish portfolio");
    }

    console.log("Publish success:", data);
    return data;
  } catch (error) {
    console.error("Publishing error:", error);
    throw error; // Re-throw to be handled by the caller
  }
};

// Export for usage in other components
export { handlePublish };
