// To show the element
function showElement(element) {
    element.classList.remove('hidden');
    element.classList.add('visible');
}

// To hide the element
function hideElement(element) {
    element.classList.remove('visible');
    element.classList.add('hidden');
}

var currState = 0;

function fabric_select() {
    var selectBox = document.getElementById("fabric");
    var selectedValue = selectBox.value;

    if (selectedValue === "other") {
        // document.getElementById("other_fabric_input").style.display = "block";
        showElement(document.getElementById("other_fabric_input"));
    } else {
        // document.getElementById("other_fabric_input").style.display = "none";
        hideElement(document.getElementById("other_fabric_input"));
    }
}

function item_select(num) {
    var options = document.getElementById("apparel_options");
    for (var i = 0; i < options.children.length; i++) {
        // Remove 'selected-option' class from all children
        options.children[i].classList.remove('selected-option');
        options.children[i].classList.add('apparel-option');
        
        // Add 'selected-option' class to the selected item
        if (i === num) {
            options.children[i].classList.add('selected-option');
            options.children[i].classList.remove('apparel-option');
        }
    }

    if (num === 7) {
        // document.getElementById("other_item_input").style.display = "block";
        showElement(document.getElementById("apparel_other"));
    } else {
        // document.getElementById("other_item_input").style.display = "none";
        hideElement(document.getElementById("apparel_other"));
    
    }
}

function nextState() {
    var elems = document.getElementById("quotewindow").children;

    if (currState < elems.length - 1) {
        hideElement(elems[currState]);
        currState++;
        // wait for the animation to finish
        setTimeout(function() {
            showElement(elems[currState]);
        }, 500);
    }

    // set all previous elements in navbar to color: yellow
    var nav = document.getElementById("navbar_links");
    for (var i = 0; i < nav.children.length; i++) {
        nav.children[i].style.color = "white";

        if (i < currState) {
            nav.children[i].style.color = "#90ee90";
        }
    }

    showElement(document.getElementById("backbutton"));

    if (currState === elems.length - 1) {
        hideElement(document.getElementById("nextbutton"));
    }
}

function backState() {
    var elems = document.getElementById("quotewindow").children;

    if (currState > 0) {
        hideElement(elems[currState]);
        currState--;
        // wait for the animation to finish
        setTimeout(function() {
            showElement(elems[currState]);
        }, 500);
    }

    // set all previous elements in navbar to color: yellow
    var nav = document.getElementById("navbar_links");
    for (var i = 0; i < nav.children.length; i++) {
        nav.children[i].style.color = "white";

        if (i < currState) {
            nav.children[i].style.color = "#90ee90";
        }
    }

    // if this the first state? if so, hide the back button
    if (currState === 0) {
        hideElement(document.getElementById("backbutton"));
    }
}

function color_select() {
    var container = document.getElementById("colors_selector");

    // get value of <select> id num_colors
    var num_colors = document.getElementById("num_colors").value;

    // if the container has more than 3 + num_colors children, remove the last child until it has 3 + num_colors children
    while (container.children.length > 7 + parseInt(num_colors)) {
        container.removeChild(container.lastChild);
    }

    // if the container has less than 3 + num_colors children, add children until it has 3 + num_colors children
    /*

        Format of a child:

        <div class="dropdown_option">
            <h2>Color N</h2>
            <p>(Standardized name or hexadecimal code)</p>
            <div class="wid75">
                <input type="text" class="input_box" id="colorN" name="colorN" placeholder="Enter color">
            </div>
        </div>

    */

    while (container.children.length < 6 + parseInt(num_colors)) {
        var div = document.createElement("div");
        div.classList.add("dropdown_option");

        var h2 = document.createElement("h2");
        h2.innerHTML = "Color " + (container.children.length - 5);

        var p = document.createElement("p");
        p.innerHTML = "Enter the color name or hexadecimal #.";

        var div2 = document.createElement("div");
        div2.classList.add("wid85");

        var input = document.createElement("input");
        input.type = "text";
        input.classList.add("input_box");
        input.id = "color" + (container.children.length - 5);
        input.name = "color" + (container.children.length - 5);
        input.placeholder = "Enter color";

        div2.appendChild(input);

        div.appendChild(h2);
        div.appendChild(p);
        div.appendChild(div2);

        container.appendChild(div);
    }
}


window.onload = function() {
    document.getElementById("fabric").selectedIndex = 0;
    document.getElementById("num_colors").selectedIndex = 0;
};





(function() {
    const wrapper = document.getElementById('wrapper');
    const form = document.getElementById('form');
    const fileUpload = document.getElementById('file-upload');
    const fileCount = document.getElementById('file-count');
    const preview = document.getElementById('file-preview');
    const regex = /\.(ai|png|pdf|AI|PNG|PDF)$/;
    let files = [];

    const dragEvents = ['dragstart, dragover', 'dragend', 'dragleave', 'drop'];
    dragEvents.forEach((eventTarget) => {
        wrapper.addEventListener(eventTarget, (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('fired');
        });
    });

    window.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
    });
    window.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
    });

    function dragstart() {
        wrapper.classList.add('highlight');
        // console.log('dragstart');
    }
    function dragover() {
        wrapper.classList.add('highlight');
        // console.log('dragover');
    }
    function dragend() {
        wrapper.classList.remove('highlight');
    }
    function dragleave() {
        wrapper.classList.remove('highlight');
    }

    function checkFile(selectedFiles) {
        for(let file of selectedFiles){
            if(regex.test(file.name)) {
                files.push(file);
            } else {alert('Please upload only .ai, .png, or .pdf files.');}
        }
        createPreview(files);
    }

    function dropFiles(e) {
        // console.log('drop');
        const transferredFiles = e.dataTransfer.files;
        checkFile(transferredFiles);
        // console.log(files);
    }

    function createPreview(filelist) {
        preview.innerHTML = "";
        fileCount.innerHTML = "";
        let count = document.createElement('p');
        count.textContent = `${files.length} ${files.length <= 1 ? 'file' : 'files'} selected `;

        fileCount.appendChild(count);
        filelist.forEach((file) => {
            const img = new Image();
            img.setAttribute('src', URL.createObjectURL(file));
            img.addEventListener('click', () => {
                console.log('clicked');
                files = files.filter((file) => file !== files[img.getAttribute('data-file')]);
                createPreview(files);
            });
            img.dataset.file = filelist.indexOf(file);
            preview.appendChild(img);
        });
    }

    wrapper.addEventListener('dragstart', dragstart);
    wrapper.addEventListener('dragover', dragover);
    wrapper.addEventListener('dragend', dragend);
    wrapper.addEventListener('dragleave', dragleave);
    wrapper.addEventListener('drop', dropFiles);

    fileUpload.addEventListener('change', (e) => {
        const files = e.target.files;
        checkFile(files);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        if(files.length > 0) {
            alert("form submitted (no handler yet)");
            files.forEach((file) => {
                formData.append('file', file);
            });
        }

        // console.log('FILES: ', formData.getAll('file'));
    });

})();