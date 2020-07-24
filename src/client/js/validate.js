export function validateInput(word, type) {
    // setting up the regex for url
    let regex = new RegExp(
        "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
    );

    // runs if the user input is url
    if (type === "url") {
        // returs false if url is correct and message if url is wrong
        if (regex.test(word)) {
            return false;
        } else {
            return "Invalid url!!! URL should look similiar to www.example.com";
        }
    } else {
        // checks if word length is greater than 3 and gives error if not
        if (word.length < 3) {
            return "Word should be greater than 3 length!!!";
        }
        return false;
    }
}
