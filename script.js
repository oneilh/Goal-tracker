const hardcodedStudents = 3 + 1;
const hardcodedRevenue = 280000 + 75000 + 50000;

function initializeStorage() {
  const storedStudents = parseInt(localStorage.getItem("currentStudents")) || 0;
  const storedRevenue = parseInt(localStorage.getItem("currentRevenue")) || 0;

  if (hardcodedStudents > storedStudents) {
    localStorage.setItem("currentStudents", hardcodedStudents);
  }
  if (hardcodedRevenue > storedRevenue) {
    localStorage.setItem("currentRevenue", hardcodedRevenue);
  }
}

function getCurrentValues() {
  return {
    students: parseInt(localStorage.getItem("currentStudents")) || 0,
    revenue: parseInt(localStorage.getItem("currentRevenue")) || 0,
  };
}

function updateProgress(progressElement, current, goal) {
  const percentage = Math.min((current / goal) * 100, 100);
  $(progressElement).css("--progress", `${percentage}%`);
  $(progressElement).text(`${Math.round(percentage)}%`);
}

function updateUI() {
  const { students, revenue } = getCurrentValues();

  $("#current-students").text(students);
  $("#current-revenue").text(
    revenue.toLocaleString("en-NG", { style: "currency", currency: "NGN" })
  );

  updateProgress("#student-progress", students, 240);
  updateProgress("#revenue-progress", revenue, 30000000);
}

$("#add-students").on("click", function () {
  const newStudents = parseInt($("#student-input").val());
  if (!isNaN(newStudents) && newStudents > 0) {
    const { students } = getCurrentValues();
    localStorage.setItem("currentStudents", students + newStudents);
    updateUI();
    $("#student-input").val("");
  }
});

$("#add-revenue").on("click", function () {
  const newRevenue = parseInt($("#revenue-input").val());
  if (!isNaN(newRevenue) && newRevenue > 0) {
    const { revenue } = getCurrentValues();
    localStorage.setItem("currentRevenue", revenue + newRevenue);
    updateUI();
    $("#revenue-input").val("");
  }
});

$("#reset-data").on("click", function () {
  $(".modal").removeClass("hidden");
});

$("#confirm-reset").on("click", function () {
  localStorage.setItem("currentStudents", hardcodedStudents);
  localStorage.setItem("currentRevenue", hardcodedRevenue);
  updateUI();
  $(".modal").addClass("hidden");
});

$("#cancel-reset").on("click", function () {
  $(".modal").addClass("hidden");
});

initializeStorage();
updateUI();
