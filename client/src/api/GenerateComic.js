async function query(data, updateProgress) {
    try{
    console.log("API call initiated");
    const response = await fetch(
      "https://comic-ai-verse-server.vercel.app/api/v1/dalle",
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
  