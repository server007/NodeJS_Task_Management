//-------------------to display tommorow date--------------------
let today = new Date();
today.setDate(today.getDate() + 1);
let dd = today.getDate();
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();
if (dd < 10) {
    dd = '0' + dd;
}

if (mm < 10) {
    mm = '0' + mm;
}
today = yyyy + '-' + mm + '-' + dd
document.getElementById("due").value = today

// //----------------to sort the data-------------
// function sortTasks() {
//     $('#ulTasks .done').appendTo(ulTasks)
// }

// //----------------to clear the completed------------
// function clearDone() {

//     const resp = await fetch('/todos', { method: 'GET' })
//     const todos = await resp.json()

//     console.log(todos)
//         // $('#ulTasks .done').remove()
//         // toggleInputButtons()
// }

// clearDone()

// btnCleanup.click(clearDone)

let sortBP = document.getElementById('sortByPriorit')
let sortBDA = document.getElementById('sortByDueAs')
let sortBDD = document.getElementById('sortByDueDe')
let sortBS = document.getElementById('sortByStatu')
let submit = document.getElementById('submit')
let ulList = document.getElementById('ulList')
let editForm = document.getElementById('editForm')
let priSelect = document.getElementById('prior')
let notesList = document.getElementById('notesList')
let notesForm = document.getElementById('notesForm')
var modal = document.getElementById("myModal")
var span = document.getElementsByClassName("close")[0];
var modal2 = document.getElementById("myModal2")
var span2 = document.getElementsByClassName("close2")[0];
var modal3 = document.getElementById("myModal3")
var span3 = document.getElementsByClassName("close3")[0];


submit.onclick = function() {
    addTodos()
}

//function that add new todo
async function addTodos() {

    var task = {
        title: document.getElementById('title').value,
        description: document.getElementById('desc').value,
        priority: document.getElementById('priority').value,
        due: document.getElementById('due').value
    }

    if (title.value === "") {
        alert("title is required")
        return
    }
    const resp = await fetch('/todos', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })

    alert("New task added")

}

//display all the todos in list
async function getTodos() {
    // var tomorrow = new Date();
    // tomorrow.setDate(new Date().getDate() + 1);
    // var finalDate = tomorrow.toISOString().split('T')[0]
    // document.getElementById('due').value = finalDate

    const resp = await fetch('/todos', { method: 'GET' })
    const todos = await resp.json()
    printit(todos)

}

sortBP.onclick = function() {
    sortByPriority()
}

sortBDA.onclick = function() {
    sortByDueAsc()
}

sortBDD.onclick = function() {
    sortByDueDesc()
}
sortBS.onclick = function() {
    sortByStatus()
}

async function sortByDueAsc() {
    document.getElementById("ulList").innerHTML = "";
    const resp = await fetch('/order/DueAsc', { method: 'GET' })
    const todos = await resp.json()
    printit(todos)
}

async function sortByDueDesc() {
    document.getElementById("ulList").innerHTML = "";
    const resp = await fetch('/order/DueDesc', { method: 'GET' })
    const todos = await resp.json()
    printit(todos)
}
async function sortByPriority() {
    document.getElementById("ulList").innerHTML = "";
    const resp = await fetch('/order/Priority', { method: 'GET' })
    const todos = await resp.json()
    printit(todos)
}
async function sortByStatus() {
    document.getElementById("ulList").innerHTML = "";
    const resp = await fetch('/order/Status', { method: 'GET' })
    const todos = await resp.json()
    console.log(todos + "out")
    printit(todos)
}

async function printit(todos) {
    console.log(todos + "ins")
    todos.forEach(element => {
        var x = document.createElement('li')
        x.textContent = " Title : " + element.title + " || Completed :  " +
            element.status + " || Priority :  " + element.priority + " || Due Date : " + element.due

        var editButton = document.createElement('INPUT')
        editButton.setAttribute('type', 'submit')
        editButton.setAttribute("value", 'edit')
        editButton.setAttribute("id", "myBtn2")
        editButton.setAttribute("class", "btn btn-unique btn-rounded mb-1 btn-success")
        editButton.setAttribute("onclick", "editTodo(" + element.id + ")")

        var notesButton = document.createElement('INPUT')
        notesButton.setAttribute('type', 'submit')
        notesButton.setAttribute("value", 'show notes')
        notesButton.setAttribute("id", "myBtn")
        notesButton.setAttribute("class", "btn btn-unique btn-rounded mb-1 btn-success")
        notesButton.setAttribute("onclick", "showNotes(" + element.id + ")")

        var addNoteButton = document.createElement('INPUT')
        addNoteButton.setAttribute("type", "submit")
        addNoteButton.setAttribute("value", "add notes")
        addNoteButton.setAttribute("id", "myBtn3")
        addNoteButton.setAttribute("class", "btn btn-unique btn-rounded mb-1 btn-success")
        addNoteButton.setAttribute("onclick", "NotesForm(" + element.id + ")")

        ulList.appendChild(x)
        ulList.appendChild(editButton)
        ulList.appendChild(notesButton)
        ulList.appendChild(addNoteButton)
    })
}















//display edit form for todo
async function editTodo(tid) {
    var btn = document.getElementById("myBtn2")

    const resp = await fetch(`/todos/${tid}`, { method: 'GET' })
    const todos = await resp.json()

    var dueDate = document.createElement('INPUT')
    dueDate.setAttribute("type", "date")
    dueDate.setAttribute("value", todos.due)
    dueDate.setAttribute("id", "newdate")
    editForm.appendChild(dueDate)

    var prior = document.createElement('INPUT')
    prior.setAttribute("type", "text")
    prior.setAttribute("value", todos.priority)
    prior.setAttribute("id", "newprior")
    editForm.appendChild(prior)

    var taskState = document.createElement('INPUT')
    taskState.setAttribute("type", "text")
    taskState.setAttribute("value", todos.status)
    taskState.setAttribute("id", "newstatus")
    editForm.appendChild(taskState)

    var saveButton = document.createElement('INPUT')
    saveButton.setAttribute("type", "submit")
    saveButton.setAttribute("value", "save")
    saveButton.setAttribute("onclick", "updateTodos(" + tid + ")")
    editForm.appendChild(saveButton)

    modal2.style.display = "block";
    span2.onclick = function() {
        modal2.style.display = "none";
        location.reload();
    }
    window.onclick = function(event) {
        if (event.target == modal2) {
            modal2.style.display = "none";
            location.reload();
        }
    }

}

//update the changes made by user to edit the todo
async function updateTodos(tid) {
    var task = {
        status: document.getElementById('newstatus').value,
        priority: document.getElementById('newprior').value,
        due: document.getElementById('newdate').value
    }


    const resp = await fetch(`/todos/${tid}`, {
        method: 'PATCH',
        body: JSON.stringify(task),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    alert("Task Updated")
}

//display notes in form of list
async function showNotes(taskId) {
    modal.style.display = "block";
    var btn = document.getElementById("myBtn")

    const resp = await fetch(`/todos/${taskId}/notes`, { method: 'GET' })
    const notes = await resp.json()
    notes.forEach(element => {
        var x = document.createElement('li')
        x.textContent = element.notes
        notesList.appendChild(x)
    });

    span.onclick = function() {
        modal.style.display = "none";
        location.reload()

    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none"
        }
    }
}

//display form to create new todo
async function NotesForm(taskID) {
    var btn = document.getElementById("myBtn3")
    modal3.style.display = "block";
    var br1 = document.createElement('br')
    var notesBox = document.createElement('INPUT')
    notesBox.setAttribute("type", "text")
    notesBox.setAttribute("id", "notesData")
    notesForm.appendChild(notesBox)

    notesForm.appendChild(br1)

    var notesSubmitButton = document.createElement('INPUT')
    notesSubmitButton.setAttribute("type", "submit")
    notesSubmitButton.setAttribute("onclick", "AddNotes(" + taskID + ")")
    notesForm.appendChild(notesSubmitButton)

    span3.onclick = function() {
        modal3.style.display = "none";
        location.reload();
    }
    window.onclick = function(event) {
        if (event.target == modal3) {
            modal3.style.display = "none";
            location.reload();
        }
    }

}

//add new note in db
async function AddNotes(taskId) {
    var note = {
        id: taskId,
        notes: document.getElementById('notesData').value
    }

    const resp = await fetch(`/todos/${taskId}/notes`, {
        method: 'POST',
        body: JSON.stringify(note),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })

    alert("New Note added")

}