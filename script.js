// filepath: script.js
// ...existing code...
// เพิ่มการรองรับ Enter key
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("guessInput")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        checkGuess();
      }
    });
});

// เพิ่มการ select text เมื ่อคลิก input
document.addEventListener("DOMContentLoaded", function () {
  const guessInput = document.getElementById("guessInput");
  guessInput.addEventListener("focus", function () {
    this.select();
  });
});

// ...existing code...

// ตัวแปรเก็บตัวเลขลับ
let secretNumber = 0;

// ตัวแปรนับจำนวนครั้งที่ทาย
let attemptCount = 0;

// ฟังก์ชันเริ่มเกมใหม่
function initializeGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attemptCount = 0;
  updateDisplay();
}

// ฟังก์ชันตรวจสอบการทาย
function checkGuess() {
  const guessInput = document.getElementById("guessInput");
  const guessValue = parseInt(guessInput.value);
  const resultContainer = document.getElementById("resultContainer");

  // Validation: ตรวจสอบว่าใส่ตัวเลขหรือไม่
  if (isNaN(guessValue) || guessInput.value === "") {
    resultContainer.innerHTML = ` 
            <div class="alert alert-danger" role="alert"> 
                กรุณาใส่ตัวเลข! 
            </div> 
        `;
    return;
  }

  // Validation: ตรวจสอบว่าอยู่ในช่วง 1-100 หรือไม่
  if (guessValue < 1 || guessValue > 100) {
    resultContainer.innerHTML = ` 
            <div class="alert alert-danger" role="alert"> 
                กรุณาใส่ตัวเลขระหว่าง 1 ถึง 100! 
            </div> 
        `;
    return;
  }

  // เพิ่มจำนวนครั้งที่ทายหลังจากตรวจสอบข้อมูลถูกต้องแล้ว
  attemptCount++;

  // ตรวจสอบเงื่อนไขการชนะหรือคำใบ้
  if (guessValue === secretNumber) {
    resultContainer.innerHTML = ` 
            <div class="alert alert-success" role="alert"> 
                <h5>✓ ถูกต้อง!</h5> 
                <p>คุณทายถูกในครั้งที่ ${attemptCount}</p> 
            </div> 
        `;
  } else if (guessValue > secretNumber) {
    resultContainer.innerHTML = ` 
            <div class="alert alert-warning" role="alert"> 
                ↓ ตัวเลขสูงไป 
            </div> 
        `;
  } else {
    resultContainer.innerHTML = ` 
            <div class="alert alert-info" role="alert"> 
                ↑ ตัวเลขต่ำไป 
            </div> 
        `;
  }

  // อัปเดตการแสดงผลและล้างช่องกรอกข้อมูล
  updateDisplay();
  guessInput.value = "";
  guessInput.focus();
} // จบฟังก์ชัน checkGuess

// ฟังก์ชันอัปเดตจำนวนครั้ง
function updateDisplay() {
  const attemptsContainer = document.getElementById("attemptsContainer");
  if (attemptsContainer) {
    attemptsContainer.textContent = `ทายแล้ว: ${attemptCount} ครั้ง`;
  }
}

// ฟังก์ชันเริ่มเกมใหม่ (Reset)
function resetGame() {
  initializeGame();
  document.getElementById("resultContainer").innerHTML = "";
  document.getElementById("guessInput").value = "";
  document.getElementById("guessInput").focus();
}

// เริ่มเกมเมื่อโหลดหน้าเว็บ
window.addEventListener("load", initializeGame);
