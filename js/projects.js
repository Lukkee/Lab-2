//  Define element handles
const F_ALL = document.getElementById("f_all");
const F_WEB = document.getElementById("f_web");
const F_HOBBY = document.getElementById("f_hobby");
const F_SCHOOL = document.getElementById("f_school");
const CONTAINER = document.getElementById("projects-container");
const F_TEXT = document.getElementById("f_text");

//  Project class
class project {
    constructor(id, title, description, category, technologies, image, link) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.technologies = technologies;
        this.image = image;
        this.link = link
    }
}

//  Define projects
const fractal_project = new project(
    0, 
    "Fractal Generator",
    "A Fractal generator made using js and presented in html/css, made as a hobby project. The generator uses L-Systems to generatively produce fractals through multiple generations.",
    "web",
    ["Javascript", "HTML", "CSS"],
    "./images/fractal.jpg",
    "https://github.com/Lukkee/fractal-generation-using-L-systems"
);

const p5_project = new project(
    1, 
    "P5.js editor",
    "A P5.js web-editor made as a hobby project, using codemirror to let the user input code in a window and view the result in a canvas.",
    "web",
    ["Javascript", "HTML", "CSS"],
    "./images/p5.png",
    "https://github.com/Lukkee/p5-editor-using-codemirror"
);

const http_server_project = new project(
    2,
    "Simple HTTP Server",
    "A simple HTTP server made using C, with ARPA and INET libraries. Made as a hobby project to learn more about networking and HTTP protocol as well as host local projects.",
    "hobby",
    ["C", "ARPA", "INET", "HTTP"],
    "./images/httpserver.png",
    "https://github.com/Lukkee/HTTP-server"
);

const desklet_project = new project(
    3,
    "Cinnamon Desklet",
    "A simple linux Cinnamon desklet made using js, for showing command outputs in Cinnamon 6.4.X.",
    "hobby",
    ["Javascript", "JSON"],
    "./images/default.png",
    "https://github.com/Lukkee/commands-desklet"
);


const portfolio_project = new project(
    4,
    "Personal Portfolio",
    "A web-based personal portfolio, created for the course DA558A Javascript for web.",
    "school",
    ["HTML", "CSS", "JavaScript"],
    "./images/portfolio.png",
    "https://github.com/Lukkee/Lab-1"
);

const soundcard_project = new project(
    5,
    "DAQ Soundcard",
    "A program to use DAQ as a soundcard to read and write analog audio signals.",
    "school",
    ["C", "DAQ", "LabWindows/CVI"],
    "./images/soundcard.png",
    "https://github.com/Lukkee/DAQSoundcard"
);

//  Handle project arrays
const projects = [fractal_project, p5_project, http_server_project, desklet_project, portfolio_project, soundcard_project];
const active_projects = [];
let projects_len = projects.length;

function buildProjectCard(project) {
    const card = document.createElement("div");
    card.classList.add("project-card");
    card.classList.add("fade");

    // Image
    const img = document.createElement("img");
    img.src = project.image;
    img.alt = project.title;
    img.classList.add("project-image");

    // Title
    const title = document.createElement("h3");
    title.textContent = project.title;

    // Category
    const category = document.createElement("span");
    category.textContent = project.category;
    category.classList.add("project-category");

    // Description
    const description = document.createElement("p");
    description.textContent = project.description;

    // Technologies
    const techList = document.createElement("ul");
    techList.classList.add("project-technologies");

    project.technologies.forEach(tech => {
        const li = document.createElement("li");
        li.textContent = tech;
        techList.appendChild(li);
    });

    // Link
    const link = document.createElement("a");
    link.href = project.link;
    link.textContent = "View Project";
    link.classList.add("project-link");

    // Assemble card
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(category);
    card.appendChild(description);
    card.appendChild(techList);
    card.appendChild(link);

    return card;
}

//  Load active cards
function loadCards() {
    let active_projects_len = active_projects.length;
    for (const project of active_projects) {
        CONTAINER.appendChild(buildProjectCard(project));
    }
    F_TEXT.textContent = `Showing ${active_projects_len} / ${projects_len} projects!`
}

//  Change filter
function setActiveFilter(category) {
    // Clear active projects
    active_projects.length = 0;

    // Remove active class
    document.querySelector(".active-filter")?.classList.remove("active-filter");

    // Clear cards
    CONTAINER.innerHTML = "";

    // Filter projects
    if (category === "all") {
        active_projects.push(...projects);
    } else {
        active_projects.push(
            ...projects.filter(p => p.category === category)
        );
    }

    // Set active button
    document
        .querySelector(`[data-category="${category}"]`)
        .classList.add("active-filter");

    loadCards();
}


document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault();
        const category = btn.dataset.category;
        setActiveFilter(category);
    });
});

setActiveFilter("all");
