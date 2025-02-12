const createBtn = document.querySelector(".btn");
    const notes_container = document.querySelector(".notes-container");
    // let notes = document.querySelectorAll(".input_box");

    function showNotes() {
        let savedNotes = localStorage.getItem("notes");
        notes_container.innerHTML = savedNotes ? savedNotes : "";
        attachNoteEvents();
    }
    showNotes();

    function updateStorage() {
        localStorage.setItem("notes", notes_container.innerHTML);
        attachNoteEvents();
    }

    function attachNoteEvents() { //loops through each notes and attaches an input evnt listener to each note, whenvr the user types / edits, updateStorage() is called.
        document.querySelectorAll(".input_box").forEach((note) => {
            note.addEventListener("input", updateStorage);
        });
    }

    createBtn.addEventListener('click', () => {
        let note = document.createElement('p');
        let img = document.createElement("img");
        note.className = "input_box";
        note.setAttribute("contenteditable", "true");
        img.src = "images/delete.jpeg";
        note.appendChild(img);
        notes_container.appendChild(note);
        updateStorage();
        attachNoteEvents();
    });
    
    notes_container.addEventListener('click', function(e)  {
        if(e.target.tagName === "IMG") {
            e.target.parentElement.remove();
            updateStorage();
        }
    });
       
    document.addEventListener("keydown", event => { //We want Enter to insert a line break (<br>) instead of a new paragraph (<p>)
        if(event.key === 'Enter' && document.activeElement.contentEditable === "true") {
            // document.execCommand("insertLineBreak");
            event.preventDefault();
            document.execCommand("insertHTML", false, "<br>")
        }
    });