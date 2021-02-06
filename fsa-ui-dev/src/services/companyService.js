export async function fetchCompanies() {
    const response = await fetch("/2018_Clusters_Ratios.json", {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
    return await response.json();
}
