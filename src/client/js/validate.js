export function validateInput(word, type) {
    let regex = new RegExp(
        "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
    );

    if (type === "url") {
        if (regex.test(word)) {
            console.log("asd");
            return false;
        } else {
            return "Invalid url!!! URL should look similiar to www.example.com";
        }
    } else {
        if (word.length < 3) {
            return "Word should be greater than 3 length!!!";
        }
        return false;
    }
}
