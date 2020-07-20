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

    const news = await fetch("http://localhost:8081/title");
    const newsJson = await news.json();

    newsJson.forEach((data) => {
        console.log(data);
        const fragment = document.createDocumentFragment();
        fragment.innerHTML = `<h3>${data}</h3>`;
        titleDiv.appendChild(fragment);
    });
}
