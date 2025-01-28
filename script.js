$(document).ready(function () {
    const studentGoal = 240;
    const revenueGoal = 30000000;
  
    // Load saved data from localStorage
    let currentStudents = parseInt(localStorage.getItem("currentStudents")) || 0;
    let currentRevenue = parseInt(localStorage.getItem("currentRevenue")) || 0;
  
    function updateProgress(progressElement, current, goal) {
      const percentage = Math.min((current / goal) * 100, 100);
      $(progressElement).css("--progress", `${percentage}%`);
      $(progressElement).text(`${Math.round(percentage)}%`);
    }
  
    function updateUI() {
      $("#current-students").text(currentStudents);
      $("#current-revenue").text(currentRevenue.toLocaleString("en-NG", {
        style: "currency",
        currency: "NGN",
      }));
      updateProgress("#student-progress", currentStudents, studentGoal);
      updateProgress("#revenue-progress", currentRevenue, revenueGoal);
    }
  
    $("#add-students").on("click", function () {
      const newStudents = parseInt($("#student-input").val());
      if (!isNaN(newStudents) && newStudents > 0) {
        currentStudents += newStudents;
        localStorage.setItem("currentStudents", currentStudents);
        updateUI();
        $("#student-input").val("");
      }
    });
  
    $("#add-revenue").on("click", function () {
      const newRevenue = parseInt($("#revenue-input").val());
      if (!isNaN(newRevenue) && newRevenue > 0) {
        currentRevenue += newRevenue;
        localStorage.setItem("currentRevenue", currentRevenue);
        updateUI();
        $("#revenue-input").val("");
      }
    });
  
    // Initialize UI
    updateUI();
  });
  