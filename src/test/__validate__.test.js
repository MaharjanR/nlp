import { validateInput } from "../client/js/validate";

describe("Testing the validate functionality", () => {
    test("Testing the validateInput() function", () => {
        expect(validateInput).toBeDefined();
    });

    test("Testing the validateInput(), is it function?", () => {
        expect(typeof validateInput).toBe("function");
    });

    test("Testing the URL validition, is the URL valid?", () => {
        const type = "url";
        const url = "www.google.com";

        const valid = validateInput(url, type);

        expect(valid).toBe(false);
    });

    test("Testing the URL validition, is the URL valid?", () => {
        const type = "url";
        const url = "google.com";

        const valid = validateInput(url, type);

        expect(valid).toBe(
            "Invalid url!!! URL should look similiar to www.example.com"
        );
    });
});
