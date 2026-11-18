// CARBONCUT Animation Lifecycle Event Listener, Footprint Calculator & CRUD Array

const headlineEl = document.getElementById("animatedHeadline");
const eventLogEl = document.getElementById("animationEventLog");
const cycleBadgeEl = document.getElementById("cycleBadge");

function appendEventMessage(msg) {
  const li = document.createElement("li");
  li.textContent = msg;
  eventLogEl.appendChild(li);
}

// Attach CSS Animation Lifecycle Listeners (Matching the Practicum Set-up Diagram)
headlineEl.addEventListener("animationstart", (e) => {
  cycleBadgeEl.textContent = "Running 3-Loop Cycle (3s / loop)";
  appendEventMessage(`Started: elapsed time is ${Math.round(e.elapsedTime)}`);
});

headlineEl.addEventListener("animationiteration", (e) => {
  appendEventMessage(`New loop started at time ${Math.round(e.elapsedTime)}`);
});

headlineEl.addEventListener("animationend", (e) => {
  cycleBadgeEl.textContent = "Cycle Complete (Click Play to Replay)";
  appendEventMessage(`Ended: elapsed time is ${Math.round(e.elapsedTime)}`);
});

function replayTelemetryAnimation() {
  eventLogEl.innerHTML = "";
  headlineEl.style.animation = "none";
  void headlineEl.offsetWidth; // Force reflow to cleanly restart keyframe cycle
  headlineEl.style.animation = "";
}

// CRUD Task Array
const SAMPLE_TASKS = [
  { id: 1, text: "Enable Scope 1–3 smart meter telemetry across main facility", done: true },
  { id: 2, text: "Transition 65% of electricity load to Clean Energy PPA", done: false },
  { id: 3, text: "Offset 4.0 tonnes CO2e via Verified Reforestation portfolio", done: false }
];

let reductionTasks = JSON.parse(localStorage.getItem("carboncut_anim_tasks_v1")) || [...SAMPLE_TASKS];

function saveTasks() {
  localStorage.setItem("carboncut_anim_tasks_v1", JSON.stringify(reductionTasks));
}

// READ
function renderTasks() {
  const ul = document.getElementById("crudTaskUl");
  const countLabel = document.getElementById("taskCountLabel");
  ul.innerHTML = "";

  const completed = reductionTasks.filter(t => t.done).length;
  countLabel.textContent = `${completed} of ${reductionTasks.length} reduction milestones completed`;

  if (reductionTasks.length === 0) {
    ul.innerHTML = `<li class="cc-task-row"><span>No reduction tasks yet. Add one above!</span></li>`;
    return;
  }

  reductionTasks.forEach((task, idx) => {
    const li = document.createElement("li");
    li.className = "cc-task-row";
    li.innerHTML = `
      <div class="cc-task-left">
        <input type="checkbox" ${task.done ? "checked" : ""} onchange="toggleTask(${idx})" />
        <span class="${task.done ? "cc-done" : ""}">${escapeHtml(task.text)}</span>
      </div>
      <div class="cc-row-btns">
        <button type="button" class="cc-mini" onclick="editTask(${idx})">Edit</button>
        <button type="button" class="cc-mini del" onclick="deleteTask(${idx})">Delete</button>
      </div>
    `;
    ul.appendChild(li);
  });
}

// CREATE (onclick="addTask()")
function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (!text) {
    input.focus();
    return;
  }
  reductionTasks.unshift({ id: Date.now(), text, done: false });
  input.value = "";
  saveTasks();
  renderTasks();
}

// UPDATE
function toggleTask(idx) {
  reductionTasks[idx].done = !reductionTasks[idx].done;
  saveTasks();
  renderTasks();
}

function editTask(idx) {
  const updated = prompt("Edit carbon reduction milestone:", reductionTasks[idx].text);
  if (updated !== null && updated.trim() !== "") {
    reductionTasks[idx].text = updated.trim();
    saveTasks();
    renderTasks();
  }
}

// DELETE
function deleteTask(idx) {
  reductionTasks.splice(idx, 1);
  saveTasks();
  renderTasks();
}

function resetSampleTasks() {
  reductionTasks = [...SAMPLE_TASKS];
  saveTasks();
  renderTasks();
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, m => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[m]));
}

// Carbon Footprint Calculator with subtle feedback pulse
function updateEmissions() {
  const kwh = Number(document.getElementById("elecRange").value);
  const km = Number(document.getElementById("travelRange").value);
  const diet = Number(document.getElementById("dietSelect").value);

  document.getElementById("elecText").textContent = kwh;
  document.getElementById("travelText").textContent = km;

  const monthly = Math.round((kwh * 0.72) + (km * 4.33 * 0.21) + diet);
  const annual = ((monthly * 12) / 1000).toFixed(2);

  document.getElementById("monthlyOut").textContent = monthly;
  document.getElementById("annualOut").textContent = annual;

  const panel = document.getElementById("resultPanel");
  panel.classList.add("pulse-update");
  setTimeout(() => panel.classList.remove("pulse-update"), 180);

  const banner = document.getElementById("statusBanner");
  if (monthly < 450) {
    banner.textContent = "Low Impact — On track for 1.5°C Net-Zero goal";
  } else if (monthly <= 750) {
    banner.textContent = "Moderate — 21% cut achievable via Clean Energy PPA";
  } else {
    banner.textContent = "High Footprint — Priority solar & fleet audit recommended";
  }
}

function pushOffsetTask() {
  const annual = document.getElementById("annualOut").textContent;
  reductionTasks.unshift({
    id: Date.now(),
    text: `Offset ${annual} tonnes CO2e/year via CARBONCUT verified portfolio`,
    done: false
  });
  saveTasks();
  renderTasks();
  document.getElementById("crud-checklist").scrollIntoView({ behavior: "smooth" });
}

document.getElementById("taskInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

updateEmissions();
renderTasks();
