class Task {
  constructor(id, taskName) {
    this.id = id;
    this.taskName = taskName;
    this.status = 'processing'; //hard data
  }
}

class TaskManager {
  static taskList = [];

  // add
  static addTask(task) {
    this.taskList.push(task);
  }

  // get list
  static getTaskList() {
    return this.taskList;
  }

  // get last id
  static getLastId() {
    let maxId = 0;
    // loop tasklist
    for (let task of this.taskList) {
      if (task.id > maxId) {
        maxId = task.id;
      }
    }
    return maxId;
  }

  // makeDone => done
  static makeDone(taskId) {
    this.taskList = this.taskList.map(function (task) {
      if (task.id == taskId) {
        task.status = 'done';
      }
      return task;
    });
  }

  // delete
  static removeTask(taskId) {
    // filter task có task.id != taskId
    this.taskList = this.taskList.filter((task) => task.id != taskId);
  }
}

TaskManager.addTask(new Task(1, 'Bug fix'));
TaskManager.addTask(new Task(2, 'Build feature add to cart'));
TaskManager.addTask(new Task(3, 'QA Task 001'));

// test data terminal
// console.log(TaskManager.getTaskList());

// put id
// render UI

function renderTaskList() {
  // mapping || for

  let htmls = TaskManager.getTaskList().map(function (task) {
    return `
    <tr>
                <td>#task_${task.id}</td>
                <td>${task.taskName}</td>
                <td>${task.status}</td>
                <td>
                    <button class="${
                      task.status == 'processing'
                        ? 'btn btn-outline-warning btn-sm'
                        : 'btn btn-outline-warning btn-sm d-none'
                    }"
                        onclick="changeStatus(${task.id})"
                    >
                        <i class="fa fa-check">
                            Make Done
                        </i>
                    </button>
                    <button class="btn btn-outline-danger btn-sm"
                        onclick="deleteTask(${task.id})"
                    >
                        <i class="fa fa-trash">
                            Remove
                        </i>
                    </button>
                </td>
            </tr>
    `;
  });
  // convert array to string
  document.getElementById('tbTaskList').innerHTML = htmls.join('');
}

// click button addTask
// onsubmit="createTask(event)"  html

function createTask(e) {
  e.preventDefault(); //cancel event server
  let taskName = document.getElementById('taskName').value;
  let lastId = TaskManager.getLastId();
  // id auto increase
  let task = new Task(lastId + 1, taskName);
  TaskManager.addTask(task);
  renderTaskList();
  reset();
}

// status
// check confirm
function changeStatus(taskId) {
  let confirm = window.confirm('Are you sure to change status?');
  if (confirm) {
    TaskManager.makeDone(taskId);
    renderTaskList();
  }
}

function deleteTask(taskId) {
  let confirm = window.confirm('Are you sure to remove this task?');
  if (confirm) {
    TaskManager.removeTask(taskId);
    renderTaskList();
  }
}
// clear input
function reset() {
  document.getElementById('taskName').value = null;
}

renderTaskList();
