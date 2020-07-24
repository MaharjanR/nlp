export async function handleSubmit(e) {
    console.log("asdsadsad");
    e.preventDefault();

    const formText = document.querySelector("#word").value;
    const urlRadio = document.querySelector("#radio-url").checked;
    let text;
    let validation;

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

    await fetch("http://localhost:8081/title", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(text),
    });

    const sentiment = await fetch("http://localhost:8081/sentiment");
    const sentimentJson = await sentiment.json();

    Client.updateUI(sentimentJson, validation);
}
