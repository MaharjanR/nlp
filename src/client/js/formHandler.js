export async function handleSubmit(e) {
    e.preventDefault();

    const formText = document.querySelector("#word").value;
    const titleDiv = document.querySelector("#title");

    const text = {
        title: formText,
    };

    console.log(text);

    await fetch("http://localhost:8081/title", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(text),
    });

    console.log("post finished");

    const sentiment = await fetch("http://localhost:8081/sentiment");
    const sentimentJson = await sentiment.json();

    console.log(sentimentJson);
}
