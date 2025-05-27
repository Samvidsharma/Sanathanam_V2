$(document).ready(function () {
    loadPredefinedTasks();  // Load predefined tasks on page load
    loadTasks();  // Load tasks on page load
    styleDateTimeFields();

    // Show input field for custom task if "Other" is selected
    $('#taskInput').change(function () {
        if ($(this).val() === 'Other (Please specify)') {
            $('#customTaskInput').show().val('');
        } else {
            $('#customTaskInput').hide();
        }
    });

    // Add new task on button click
    $('#addTask').click(function () {
        const taskText = $('#taskInput').val() === 'Other (Please specify)' ? $('#customTaskInput').val() : $('#taskInput').val();
        const userName = $('#userName').val();
        const userPhno = $('#userPhno').val();
        const userVillage = $('#userVillage').val();
        const eventVillage = $('#eventVillage').val();
        const eventDate = $('#eventDate').val();
        const startTime = $('#startTime').val();
        const endTime = $('#endTime').val();
        const assignedToName = $('#assignedToName').val();
        const assignedToMobile = $('#assignedToMobile').val();

        if (taskText && userName && userPhno && userVillage && eventVillage && eventDate && startTime && endTime && assignedToName && assignedToMobile) {
            const task = {
                text: taskText,
                userName: userName,
                userPhno: userPhno,
                userVillage: userVillage,
                eventVillage: eventVillage,
                eventDate: eventDate,
                startTime: startTime,
                endTime: endTime,
                assignedToName: assignedToName,
                assignedToMobile: assignedToMobile
            };

            addTaskToDOM(task);
            saveTask(task);
            clearInputFields();
            styleDateTimeFields();
        } else {
            alert('Please fill out all fields!');
        }
    });

    // Auto-close the time pop-up
    $('#startTime, #endTime').on('change', function () {
        $(this).blur();  // Closes the time picker after time selection
    });

    // Save predefined tasks entered by the user
    $('#savePredefinedTasks').click(function () {
        const newTask = $('#newPredefinedTask').val();

        if (newTask) {
            let tasks = loadPredefinedTasks();

            // Check if the new task already exists in the dropdown
            if (!tasks.includes(newTask)) {
                tasks.push(newTask);
                savePredefinedTasks(tasks);

                // Append the new task to the dropdown
                $('#taskInput').append(`<option value="${newTask}">${newTask}</option>`);
            } else {
                alert('Task already exists in the list!');
            }

            $('#newPredefinedTask').val('');  // Clear the input field
        } else {
            alert('Please enter a task!');
        }
    });

    // Function to add task to DOM
    function addTaskToDOM(task) {
        const taskElement = $(` 
            <div class="task-item"> 
                <h3>${task.text}</h3> 
                <ul> 
                    <li><strong>User Name:</strong> ${task.userName}</li> 
                    <li><strong>User Phone:</strong> ${task.userPhno}</li> 
                    <li><strong>User Village:</strong> ${task.userVillage}</li> 
                    <li><strong>Event Village:</strong> ${task.eventVillage}</li> 
                    <li><strong>Event Date:</strong> ${task.eventDate}</li> 
                    <li><strong>Start Time:</strong> ${task.startTime}</li> 
                    <li><strong>End Time:</strong> ${task.endTime}</li> 
                    <li><strong>Assigned To:</strong> ${task.assignedToName}</li> 
                    <li><strong>Assigned To Mobile:</strong> ${task.assignedToMobile}</li> 
                </ul> 
                <button class="delete">Delete</button> 
            </div> 
        `);

        taskElement.find('.delete').click(function () {
            $(this).parent().remove();
            removeTaskFromStorage(task);
        });

        $('#taskListContainer').append(taskElement);
    }

    // Clear input fields after adding task
    function clearInputFields() {
        $('#taskInput select').val("Vinayaka-Pooja");
        $('#customTaskInput').val('').hide();
        $('#userName').val('');
        $('#userPhno').val('');
        $('#userVillage').val('');
        $('#eventVillage').val('');
        $('#eventDate').val('');
        $('#startTime').val('');
        $('#endTime').val('');
        $('#assignedToName').val('');
        $('#assignedToMobile').val('');
    }

    // Save task to LocalStorage
    function saveTask(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from LocalStorage
    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task));
    }

    // Remove task from LocalStorage
    function removeTaskFromStorage(taskToRemove) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task =>
            task.text !== taskToRemove.text ||
            task.userName !== taskToRemove.userName ||
            task.userPhno !== taskToRemove.userPhno ||
            task.userVillage !== taskToRemove.userVillage ||
            task.eventVillage !== taskToRemove.eventVillage ||
            task.eventDate !== taskToRemove.eventDate ||
            task.startTime !== taskToRemove.startTime ||
            task.endTime !== taskToRemove.endTime ||
            task.assignedToName !== taskToRemove.assignedToName ||
            task.assignedToMobile !== taskToRemove.assignedToMobile
        );
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Save predefined tasks to LocalStorage
    function savePredefinedTasks(tasks) {
        localStorage.setItem('predefinedTasks', JSON.stringify(tasks));
    }

    // Load predefined tasks from LocalStorage
    function loadPredefinedTasks() {
        let tasks = JSON.parse(localStorage.getItem('predefinedTasks')) || [
            "Vinayaka-Pooja",
            "Abhishekam",
            "Vivaham",
            "Gruha-Pravesham",
            "Shanti",
            "Shop-Opening",
            "Other (Please specify)"
        ];

        $('#taskInput').empty();  // Clear the dropdown before loading tasks

        tasks.forEach(task => {
            $('#taskInput').append(`<option value="${task}">${task}</option>`);
        });

        return tasks;
    }

    function styleDateTimeFields(){
        // Handle placeholders for date input
    $('#eventDate').on('input', function () {
        if ($(this).val() !== "") {
            $('#eventDatePlaceholder').addClass('hidden');
        } else {
            $('#eventDatePlaceholder').removeClass('hidden');
        }
    });

    // Handle placeholders for start time input
    $('#startTime').on('input', function () {
        if ($(this).val() !== "") {
            $('#startTimePlaceholder').addClass('hidden');
        } else {
            $('#startTimePlaceholder').removeClass('hidden');
        }
    });

    // Handle placeholders for end time input
    $('#endTime').on('input', function () {
        if ($(this).val() !== "") {
            $('#endTimePlaceholder').addClass('hidden');
        } else {
            $('#endTimePlaceholder').removeClass('hidden');
        }
    });

    // Initially hide placeholders if inputs have values (on page load)
    if ($('#eventDate').val() !== "") {
        $('#eventDatePlaceholder').addClass('hidden');
    }
    if ($('#startTime').val() !== "") {
        $('#startTimePlaceholder').addClass('hidden');
    }
    if ($('#endTime').val() !== "") {
        $('#endTimePlaceholder').addClass('hidden');
    }
    }
});
