document.addEventListener("DOMContentLoaded", () => {
    const DATA_URL =
        "https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json";
    let allStudents = [];
    let displayedStudents = [];

    const container = document.getElementById("data-container");
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");

    // Fetch and display student data
    fetch(DATA_URL)
        .then((response) => response.json())
        .then((data) => {
            allStudents = data;
            displayedStudents = [...allStudents];
            renderTable(displayedStudents);
        });

    // Render the data table
    function renderTable(data) {
        let htmlContent = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Class</th>
                        <th>Marks</th>
                        <th>Status</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
        `;

        data.forEach((student) => {
            const fullName = `${student.first_name} ${student.last_name}`;
            const passStatus = student.passing ? "Passing" : "Failed";
            htmlContent += `
                <tr>
                    <td>${student.id}</td>
                    <td><img src="${student.img_src}" alt="${fullName}"> ${fullName}</td>
                    <td>${student.gender}</td>
                    <td>${student.class}</td>
                    <td>${student.marks}</td>
                    <td>${passStatus}</td>
                    <td>${student.email}</td>
                </tr>
            `;
        });

        htmlContent += `
                </tbody>
            </table>
        `;

        container.innerHTML = htmlContent;
    }

    // Handle search functionality
    function performSearch() {
        const searchQuery = searchInput.value.toLowerCase();
        displayedStudents = allStudents.filter(
            (student) =>
                student.first_name.toLowerCase().includes(searchQuery) ||
                student.last_name.toLowerCase().includes(searchQuery) ||
                student.email.toLowerCase().includes(searchQuery)
        );
        renderTable(displayedStudents);
    }

    searchBtn.addEventListener("click", performSearch);
    searchInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter") performSearch();
    });

    // Sorting functions
    document.getElementById("sort-asc").addEventListener("click", sortByNameAscending);
    function sortByNameAscending() {
        displayedStudents.sort((a, b) =>
            (a.first_name + " " + a.last_name).localeCompare(
                b.first_name + " " + b.last_name
            )
        );
        renderTable(displayedStudents);
    }

    document.getElementById("sort-desc").addEventListener("click", sortByNameDescending);
    function sortByNameDescending() {
        displayedStudents.sort((a, b) =>
            (b.first_name + " " + b.last_name).localeCompare(
                a.first_name + " " + a.last_name
            )
        );
        renderTable(displayedStudents);
    }

    document.getElementById("sort-marks").addEventListener("click", sortByMarks);
    function sortByMarks() {
        displayedStudents.sort((a, b) => a.marks - b.marks);
        renderTable(displayedStudents);
    }

    document.getElementById("filter-passing").addEventListener("click", filterPassingStudents);
    function filterPassingStudents() {
        displayedStudents = allStudents.filter((student) => student.passing);
        renderTable(displayedStudents);
    }

    document.getElementById("sort-class").addEventListener("click", sortByClass);
    function sortByClass() {
        displayedStudents.sort((a, b) => a.class - b.class);
        renderTable(displayedStudents);
    }

    document.getElementById("filter-gender").addEventListener("click", filterByGender);
    function filterByGender() {
        const maleList = allStudents.filter(
            (student) => student.gender === "Male"
        );
        const femaleList = allStudents.filter(
            (student) => student.gender === "Female"
        );

        let htmlContent = `
            <h2>Male Students</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Class</th>
                        <th>Marks</th>
                        <th>Status</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
        `;

        maleList.forEach((student) => {
            const fullName = `${student.first_name} ${student.last_name}`;
            const passStatus = student.passing ? "Passing" : "Failed";
            htmlContent += `
                <tr>
                    <td>${student.id}</td>
                    <td><img src="${student.img_src}" alt="${fullName}"> ${fullName}</td>
                    <td>${student.gender}</td>
                    <td>${student.class}</td>
                    <td>${student.marks}</td>
                    <td>${passStatus}</td>
                    <td>${student.email}</td>
                </tr>
            `;
        });

        htmlContent += `
                </tbody>
            </table>
            <h2>Female Students</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Class</th>
                        <th>Marks</th>
                        <th>Status</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
        `;

        femaleList.forEach((student) => {
            const fullName = `${student.first_name} ${student.last_name}`;
            const passStatus = student.passing ? "Passing" : "Failed";
            htmlContent += `
                <tr>
                    <td>${student.id}</td>
                    <td><img src="${student.img_src}" alt="${fullName}"> ${fullName}</td>
                    <td>${student.gender}</td>
                    <td>${student.class}</td>
                    <td>${student.marks}</td>
                    <td>${passStatus}</td>
                    <td>${student.email}</td>
                </tr>
            `;
        });

        htmlContent += `
                </tbody>
            </table>
        `;

        container.innerHTML = htmlContent;
    }
});
