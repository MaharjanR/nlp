export async function handleSubmit(e) {
    e.preventDefault();

    // getting the values of the input
    const formText = document.querySelector("#word").value;
    const urlRadio = document.querySelector("#radio-url").checked;
    let text;
    let validation;

    // checks if url is selected on radio and runs the validateInput function
    if (urlRadio) {
        text = {
            title: formText,
            type: "url",
        };
        validation = Client.validateInput(formText, "url");
    } else {
        text = {
            title: formText,
            type: "txt",
        };
        validation = Client.validateInput(formText, "word");
    }

    // fetching the post title from our server and passing the text object
    await fetch("http://localhost:8081/title", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(text),
    });

    // fetches the sentiment data from our server
    const sentiment = await fetch("http://localhost:8081/sentiment");
    const sentimentJson = await sentiment.json();

    // updates the UI according to the data
    Client.updateUI(sentimentJson, validation);
}
