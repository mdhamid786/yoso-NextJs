
const baseUrl = "https://tutorialhubs.com/ecommApp/api";

export async function postApiData(url, data) {
  const apiUrl = `${baseUrl}/${url}`;

  try {
    const result = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    if (result.ok) {
      const data = await result.json();
      return data;
    } else {
      const error = await result.json();
      return error;
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// post with token api call
export async function postWithToken(url, data) {
  // const token = localStorage.getItem("token");
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
  const apiUrl = `${baseUrl}/${url}`;
  try {
    const result = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    if (result.ok) {
      const data = await result.json();
      return data;
    } else {
      const error = await result.json();
      return error;
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export async function getApiData(url) {
  const apiUrl = `${baseUrl}/${url}`;
  try {
    const result = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result.ok) {
      const data = await result.json();
      return data;
    } else {
      const errorData = await result.json();
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export async function getWithToken(url) {
  const apiUrl = `${baseUrl}/${url}`;
  // const token = localStorage.getItem("token");
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
  try {
    const result = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (result.ok) {
      const data = await result.json();
      return data;
    } else {
      const errorData = await result.json();
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}




// post with token api call
export async function postwithcart(url, data1) {
  // const token = localStorage.getItem("token");
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
  const apiUrl = `${baseUrl}/${url}`;
  try {
    const result = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: data1,
    });

    if (result.ok) {
      const data = await result.json();
      return data;
    } else {
      const error = await result.json();
      return error;
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}