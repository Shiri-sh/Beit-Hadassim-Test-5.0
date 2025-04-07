async function apiCall(navigateString, methodType = "GET", dataContent = null) {
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: methodType,
  };

  if (dataContent !== null) {
    options.body = JSON.stringify(dataContent);
  }

  try {
    const url = `https://localhost:7152/api/${navigateString}`;
    console.log("Fetching from:", url,"!!!!!!!!!!!!!!!!!!!!!!!!");
    const response = await fetch(url, options);
    console.log("Status:", response.status);

    const contentType = response.headers.get("content-type") || "";

    // אם הייתה שגיאה מהשרת – נטפל בזה
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    // אם התגובה ריקה או לא JSON – נחזיר טקסט
    if (!contentType.includes("application/json")) {
      const text = await response.text();
      return text;
    }

    // אחרת – נקרא כ-JSON
    const data = await response.json();
    console.log("Parsed data:", data);
    return data;

  } catch (error) {
    console.error("Full error:", error);
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    alert("fetching error: " + error.message);
    return null;
  }
}

export default apiCall;