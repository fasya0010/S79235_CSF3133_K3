
// ==========================================
// ERROR IDENTIFICATION AND CORRECTION
// ==========================================

// Error 1 (grade.html, Line 9):
// Added return before checkMark() to prevent form submission.

// Error 2 (grade.html, Line 17):
// Corrected showtable() to showTable().

// Error 3 (grade.js, Line 5):
// Changed assignment operator (=) to comparison operator (===).

// Error 4 (grade.js, Line 9):
// Corrected isNan() to isNaN().

// Error 5 (grade.js, Line 14):
// Changed && to || for correct mark range validation.

// Error 6 (grade.js, Line 28):
// Corrected getElementByID() to getElementById().

// Error 7 (grade.js, Line 30):
// Corrected style.colour to style.color.

// Error 8 (grade.js, Line 38):
// Changed loop starting value from 1 to 0.

// Error 9 (grade.js, Line 42):
// Corrected innerHtml to innerHTML.


// ==========================================
// FUNCTION 1: CHECK STUDENT MARK
// ==========================================

function checkMark() {

    // Get student name and mark
    let name = document.forms["gradeForm"]["name"].value.trim();

    let markInput = document.forms["gradeForm"]["mark"].value.trim();

    // Validate empty name
    if (name === "") {

        alert("Name must be filled out.");
        return false;
    }

    // Validate empty mark
    if (markInput === "") {

        alert("Mark field cannot be empty.");
        return false;
    }

    // Validate non-numeric mark
    if (isNaN(markInput)) {

        alert("Please enter a valid numeric value.");
        return false;
    }

    // Convert mark into a number
    let mark = Number(markInput);

    // Validate mark range
    if (mark < 0 || mark > 100) {

        alert("Mark must be between 0 and 100.");
        return false;
    }

    // Determine student grade
    let grade;

    if (mark >= 80) {

        grade = "A";

    } else if (mark >= 65) {

        grade = "B";

    } else if (mark >= 50) {

        grade = "C";

    } else {

        grade = "F";
    }

    // Display result
    document.getElementById("result").innerHTML =
        name + " got grade " + grade;

    // Change result colour according to grade
    if (grade === "A" || grade === "B") {

        document.getElementById("result").style.color = "green";

    } else if (grade === "C") {

        document.getElementById("result").style.color = "orange";

    } else {

        document.getElementById("result").style.color = "red";
    }

    // Display date and time
    document.getElementById("checkTime").innerHTML =
        "Checked on: " + new Date();

    // Prevent page refresh
    return false;
}


// ==========================================
// FUNCTION 2: SHOW GRADE TABLE
// ==========================================

function showTable() {

    // Grade and mark range arrays
    let grades = ["A", "B", "C", "F"];

    let ranges = ["80-100", "65-79", "50-64", "0-49"];

    // Start HTML table
    let tableHTML =
        "<table>" +
        "<tr><th>Grade</th><th>Mark Range</th></tr>";

    // Loop through all grades
    for (let i = 0; i < grades.length; i++) {

        tableHTML +=
            "<tr><td>" + grades[i] +
            "</td><td>" + ranges[i] +
            "</td></tr>";
    }

    // Close table
    tableHTML += "</table>";

    // Display table on webpage
    document.getElementById("tableContainer").innerHTML =
        tableHTML;
}


// ==========================================
// FUNCTION 3: GENERATE RANDOM MARK
// ==========================================

function randomMark() {

    // Generate random whole number from 0 to 100
    let randomNumber = Math.floor(Math.random() * 101);

    // Display random mark in mark input field
    document.getElementById("mark").value = randomNumber;
}
