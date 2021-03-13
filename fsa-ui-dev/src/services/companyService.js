export async function fetchCompanies() {
    const response = await fetch("/datasets/2018_Clusters_Ratios_AF_All.json", {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
    return await response.json();
}
