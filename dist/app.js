"use strict";
// Get elements
const form = document.getElementById("job-form");
const applicationsTable = document.getElementById("applications-table").querySelector("tbody");
const exportBtn = document.getElementById("export-csv");
// Load applications from localStorage
let applications = JSON.parse(localStorage.getItem("jobApplications") || "[]");
// Save applications to localStorage
const saveApplications = () => {
    localStorage.setItem("jobApplications", JSON.stringify(applications));
};
// Render applications in the table
const renderApplications = () => {
    const applicationsTable = document.getElementById("applications-table").querySelector("tbody");
    const emptyMessage = document.getElementById("empty-message");
    applicationsTable.innerHTML = "";
    if (applications.length === 0) {
        emptyMessage.style.display = "block"; // Show the empty message
    }
    else {
        emptyMessage.style.display = "none"; // Hide the empty message
        applications.forEach((app, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${app.company}</td>
                <td>${app.position}</td>
                <td>${app.dateApplied}</td>
                <td>${app.status}</td>
                <td>
                    <button onclick="deleteApplication(${index})">Delete</button>
                </td>
            `;
            applicationsTable.appendChild(row);
        });
    }
    console.log("Applications rendered:", applications);
};
// Handle form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newApp = {
        id: Date.now().toString(),
        company: document.getElementById("company").value,
        position: document.getElementById("position").value,
        link: document.getElementById("job-link").value,
        dateApplied: document.getElementById("date-applied").value,
        status: document.getElementById("status").value,
        notes: document.getElementById("notes").value,
    };
    applications.push(newApp);
    saveApplications();
    renderApplications();
    form.reset();
});
// Delete function (fixing scope issue)
window.deleteApplication = (index) => {
    applications.splice(index, 1);
    saveApplications();
    renderApplications();
};
// Function to export applications as CSV with proper column alignment
const exportToCSV = () => {
    if (applications.length === 0) {
        alert("No applications to export.");
        return;
    }
    const headers = ["Company", "Position", "Date Applied", "Status", "Notes", "Job Link"];
    // Format rows properly for CSV
    const rows = applications.map(app => [
        `"${app.company}"`,
        `"${app.position}"`,
        `"${app.dateApplied}"`,
        `"${app.status}"`,
        `"${app.notes.replace(/"/g, '""')}"`, // Escape quotes inside notes
        `"${app.link}"` // Ensure links are treated properly
    ]);
    const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "job_applications.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
// Attach export function to button
exportBtn.addEventListener("click", exportToCSV);
// Initial render on page load
renderApplications();
