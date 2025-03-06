interface JobApplication {
    id: string;
    company: string;
    position: string;
    link: string;
    dateApplied: string;
    status: string;
    notes: string;
}

// Get elements
const form = document.getElementById("job-form") as HTMLFormElement;
const applicationsTable = document.getElementById("applications-table")!.querySelector("tbody")!;
const applicationsHeader = document.getElementById("applications-header");
if (!applicationsHeader) {
    console.error("Error: applications-header element not found.");
} else {
    applicationsHeader.innerHTML = `
        <tr>
            <th onclick="sortApplications('company')">Company</th>
            <th onclick="sortApplications('position')">Position</th>
            <th onclick="sortApplications('dateApplied')">Date Applied</th>
            <th onclick="sortApplications('status')">Status</th>
            <th onclick="sortApplications('notes')">Notes</th>
            <th onclick="sortApplications('link')">Job Link</th>
            <th>Actions</th>
        </tr>
    `;
}
const exportBtn = document.getElementById("export-csv")!;
const companyInput = document.getElementById("company") as HTMLInputElement;
const positionInput = document.getElementById("position") as HTMLInputElement;
const linkInput = document.getElementById("job-link") as HTMLInputElement;
const dateInput = document.getElementById("date-applied") as HTMLInputElement;
const statusInput = document.getElementById("status") as HTMLSelectElement;
const notesInput = document.getElementById("notes") as HTMLTextAreaElement;

let applications: JobApplication[] = JSON.parse(localStorage.getItem("jobApplications") || "[]");
let editingIndex: number | null = null;

const saveApplications = () => {
    localStorage.setItem("jobApplications", JSON.stringify(applications));
};

const renderApplications = () => {
    applicationsTable.innerHTML = "";
    const emptyMessage = document.getElementById("empty-message")!;

    if (applications.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
        applications.forEach((app, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${app.company}</td>
                <td>${app.position}</td>
                <td>${app.dateApplied}</td>
                <td>${app.status}</td>
                <td>${app.notes}</td>
                <td><a href="${app.link}" target="_blank">Job Link</a></td>
                <td class="actions-cell">
                    <button class="edit-btn" onclick="editApplication(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteApplication(${index})">Delete</button>
                </td>
            `;
            applicationsTable.appendChild(row);
        });
    }
};

applicationsHeader.innerHTML = `
    <tr>
        <th onclick="sortApplications('company')">Company</th>
        <th onclick="sortApplications('position')">Position</th>
        <th onclick="sortApplications('dateApplied')">Date Applied</th>
        <th onclick="sortApplications('status')">Status</th>
        <th onclick="sortApplications('notes')">Notes</th>
        <th onclick="sortApplications('link')">Job Link</th>
        <th>Actions</th>
    </tr>
`;

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newApp: JobApplication = {
        id: Date.now().toString(),
        company: companyInput.value,
        position: positionInput.value,
        link: linkInput.value,
        dateApplied: dateInput.value,
        status: statusInput.value,
        notes: notesInput.value,
    };

    if (editingIndex !== null) {
        applications[editingIndex] = newApp;
        editingIndex = null;
    } else {
        applications.push(newApp);
    }

    saveApplications();
    renderApplications();
    form.reset();
});

(window as any).editApplication = (index: number) => {
    const app = applications[index];
    companyInput.value = app.company;
    positionInput.value = app.position;
    linkInput.value = app.link;
    dateInput.value = app.dateApplied;
    statusInput.value = app.status;
    notesInput.value = app.notes;
    editingIndex = index;
};

(window as any).deleteApplication = (index: number) => {
    applications.splice(index, 1);
    saveApplications();
    renderApplications();
};

exportBtn.addEventListener("click", () => {
    if (applications.length === 0) {
        alert("No applications to export.");
        return;
    }

    const headers = ["Company", "Position", "Date Applied", "Status", "Notes", "Job Link"];
    const rows = applications.map(app => [
        app.company,
        app.position,
        app.dateApplied,
        app.status,
        app.notes,
        app.link
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
});

renderApplications();
