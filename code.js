
 
    const form = document.getElementById("task-form");
    const activeTasksList = document.getElementById("active-tasks");
    const completedTasksList = document.getElementById("completed-tasks");
    const completeAllButton = document.getElementById("complete-all");
    const videoContainer = document.getElementById("video-container");
    const video = document.getElementById("video");

    let activeTasks = JSON.parse(localStorage.getItem("activeTasks")) || [];
    let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

    function renderTasks() {
      activeTasksList.innerHTML = "";
      completedTasksList.innerHTML = "";

      if (activeTasks.length === 0 && completedTasks.length > 0 ) {
        videoContainer.style.display = "block";
        video.play();
        video.addEventListener("ended", () => {
            videoContainer.style.display = "none";
          });
      } else {
        videoContainer.style.display = "none";
        video.pause();
      }

      for (const task of activeTasks) {
        const li = document.createElement("li");
        li.textContent = task;
        const completeButton = document.createElement("button");
        completeButton.textContent = "Complete";
        completeButton.addEventListener("click", () => {
          completedTasks.push(task);
          activeTasks = activeTasks.filter((t) => t !== task);
          renderTasks();
          updateStorage();
        });

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => {
          activeTasks = activeTasks.filter((t) => t !== task);
          renderTasks();
          updateStorage();
        });

        li.appendChild(completeButton);
        li.appendChild(removeButton);
        activeTasksList.appendChild(li);
      }

      for (const task of completedTasks) {
        const li = document.createElement("li");
        li.textContent = task;
        completedTasksList.appendChild(li);
      }
    }

    function updateStorage() {
      localStorage.setItem("activeTasks", JSON.stringify(activeTasks));
      localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    }

    form.addEventListener("submit", (event) => {
    const task = document.getElementById("task-input").value;
    if (!task) {
    alert("N ai tastat nimic serif.");
    return;
    }
    activeTasks.push(task);
    document.getElementById("task-input").value = "";
    renderTasks();
    updateStorage();
    });

    completeAllButton.addEventListener("click", () => {
    completedTasks = completedTasks.concat(activeTasks);
    activeTasks = [];
    renderTasks();
    updateStorage();
    });

    renderTasks();
