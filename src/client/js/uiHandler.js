export function updateUI(result, validation) {
    // selecting the result container from DOM
    const resultContainer = document.querySelector("#result");

    // runs if there is data in result and no errors otherwise displays error
    if (result && !validation) {
        resultContainer.innerHTML = `
        <div class="container">
            <div><h3>Agreement</h3>:${result.agreement
                .charAt(0)
                .toUpperCase()}${result.agreement.slice(1).toLowerCase()}</div>
            <div><h3>Confidence</h3>: ${result.confidence}</div>
            <div><h3>Irony</h3>: ${result.irony
                .charAt(0)
                .toUpperCase()}${result.irony.slice(1).toLowerCase()}</div>
            <div><h3>Score Tag</h3>: ${
                result.score_tag.charAt(0).toUpperCase() +
                result.score_tag.slice(1).toLowerCase()
            }</div>
            <div><h3>Subjectivity</h3>: ${result.subjectivity
                .charAt(0)
                .toUpperCase()}${result.subjectivity
            .slice(1)
            .toLowerCase()}</div>
        </div>
            `;
    } else {
        resultContainer.innerHTML = `
        <div class="container">
            <p class="error">${validation}</p>
        </div>
        `;
    }
}
