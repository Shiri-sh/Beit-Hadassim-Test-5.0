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
    const response = await fetch(url, options);

    const textResponse = await response.text();

    if (!response.ok) {
      throw new Error(`${response.status}: ${textResponse}`);
    }
    try {
      const data = JSON.parse(textResponse);
      return data;
    } catch (jsonError) {
      return textResponse;
    }

  } catch (error) {
    alert("Fetching error: " + error.message);
    return null;
  }
}

export default apiCall;
