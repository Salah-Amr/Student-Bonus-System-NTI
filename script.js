const students = [
  {
    name: "Salah Amr",
    attendance: 10,
    midtermScore: 30,
    finalScore: 50,
    AverageScore: 0,
    TotalScore: 0,
    Bonus: 0,
    TotalDegree: 0
  },
  {
    name: "Ahmed Ali",
    attendance: 8,
    midtermScore: 18,
    finalScore: 35,
    AverageScore: 0,
    TotalScore: 0,
    Bonus: 0,
    TotalDegree: 0
  },
  {
    name: "Sara Mohamed",
    attendance: 10,
    midtermScore: 20,
    finalScore: 40,
    AverageScore: 0,
    TotalScore: 0,
    Bonus: 0,
    TotalDegree: 0
  },
  {
    name: "John Smith",
    attendance: 5,
    midtermScore: 12,
    finalScore: 28,
    AverageScore: 0,
    TotalScore: 0,
    Bonus: 0,
    TotalDegree: 0
  }
];

function showToast(message, classN) {
  Toastify({
  text: message,
  duration: 3000,
  gravity: "top",
  position: "right",
  className: `my-toast ${classN}`,
  close: true
  }).showToast();
}

function updateTable() {
  let studentTable = `<tr><th>Student Name</th>
          <th>Attendance</th>
          <th>Midterm</th>
          <th>Final</th>
          <th>Average Degree</th>
          <th>Total Degrees</th>
          <th colspan="2">Bonus</th>
          <th>Final Degree</th>
          <th>Details</th>
          <th colspan="2">Bonus Actions</th></tr>`;
  for (let i = 0; i < students.length; i++) {
    let st = students[i];
    st.AverageScore = (st.midtermScore + st.finalScore + st.attendance * 2 + st.Bonus) + '%';
    st.TotalScore = (st.midtermScore + st.finalScore + st.attendance * 2);
    st.TotalDegree = (st.midtermScore + st.finalScore + st.attendance * 2 + st.Bonus);
    let rowClass = "";
    if (st.TotalDegree >= 90) {
      rowClass = "degree-gold";
    } else if (st.TotalDegree >= 60) {
      rowClass = "degree-green";
    } else {
      rowClass = "degree-red";
    }
    studentTable += `<tr id="tr${i+1}" class="${rowClass}">
      <td>${st.name}</td>
      <td>${st.attendance}</td>
      <td>${st.midtermScore}</td>
      <td>${st.finalScore}</td>
      <td>${st.AverageScore}</td>
      <td>${st.TotalScore}</td>
      <td>${st.Bonus}</td>
      <td>${st.TotalDegree}</td>
      <td><button onclick="getDetails(this.id)" id="btr${i+1}">Get Details</button></td>
      <td><input type="text" placeholder="Enter Bonus" id="bon${i+1}"></td>
      <td><button onclick="addBonus(this.id)" id="add${i+1}">Add Bonus</button></td>
      </tr>`;
  }
  document.getElementById("studentsTable").innerHTML = studentTable;
}

function getDetails(id) {
  let i = +id[3] - 1;
  let st = students[i];
  showToast(`Getting ${st.name} Details...`, 'toast-info');
  let details = `
  <h2>Student Details</h2>
  <p>Name: ${st.name}</p>
  <p>Attendance: ${st.attendance} / 10</p>
  <p>Midterm: ${st.midtermScore} / 30</p>
  <p>Final: ${st.finalScore} / 50</p>
  <p>Average: ${st.AverageScore}</p>
  <p>Total Degrees: ${st.TotalScore}</p>
  <p>Bonus: ${st.Bonus}</p>
  <p>Final Degree: ${st.TotalDegree}</p>`;
  document.getElementById('studenDetails').innerHTML = details;
}

function addBonus(id) {
  try {
    let i = +id[3];
    let st = students[i - 1];
    let bon = document.getElementById(`bon${i}`);
    let val = parseInt(bon.value);
    console.log(val, st.TotalScore);
    if (val == 0) {
      throw new Error('Are You Serious?!!');
    }
    else if (val < 0) {
      bon.value = 0;
      throw new Error('Bonus cannot be Negative!');
    }
    else if (val + st.TotalScore <= 100) {
      st.Bonus = val;
      showToast('Bonus has been added Successfully', 'toast-success');
      updateTable();
    }
    else {
      bon.value = 0;
      throw new Error('Bonus is up than limit!');
    }
  } catch (e) {
    showToast(e.message, 'toast-error')
  }
}

function loadPage() {
  updateTable();
}