export async function fetchFactors() {
    const response = await fetch("/datasets/2018_Clusters_All_Factors.json", {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
    return await response.json();
}
