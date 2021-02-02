export async function fetchFakeCompanies() {
    const response = await fetch("/mockCompanies.json", {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
    return await response.json();
}
