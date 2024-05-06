async function query(data, updateProgress) {
    try{
    console.log("API call initiated");
    const response = await fetch(
      "http://localhost:8080/api/v1/dalle",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    updateProgress();
    return result.photo;
  }
 catch(error) {
    console.error(error);
    throw new Error('something went wrong');
}
}
  export default query;
  