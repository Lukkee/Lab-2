//  Define element handles
const F_ALL = document.getElementById("f_all");
const F_WEB = document.getElementById("f_web");
const F_HOBBY = document.getElementById("f_hobby");
const F_SCHOOL = document.getElementById("f_school");
const CONTAINER = document.getElementById("projects-container");

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
    "Web Development",
    ["Javascript", "HTML", "CSS"],
    "./res/img/fractal.jpg",
    "https://github.com/Lukkee/fractal-generation-using-L-systems"
);

const p5_project = new project(
    1, 
    "P5.js editor",
    "A P5.js web-editor made as a hobby project, using codemirror to let the user input code in a window and view the result in a canvas.",
    "Web Development",
    ["Javascript", "HTML", "CSS"],
    "./res/img/p5.png",
    "https://github.com/Lukkee/p5-editor-using-codemirror"
);

const http_server_project = new project(
    2,
    "Simple HTTP Server",
    "A simple HTTP server made using C, with ARPA and INET libraries. Made as a hobby project to learn more about networking and HTTP protocol as well as host local projects.",
    "Hobby Project",
    ["C", "ARPA", "INET", "HTTP"],
    "./res/img/default.png",
    "https://github.com/Lukkee/HTTP-server"
);

const desklet_project = new project(
    3,
    "Cinnamon Desklet",
    "A simple linux Cinnamon desklet made using js, for showing command outputs in Cinnamon 6.4.X.",
    "Hobby Project",
    ["Javascript", "JSON"],
    "./res/img/default.png",
    "https://github.com/Lukkee/commands-desklet"
);

const portfolio_project = new project(
    4,
    "Personal Portfolio",
    "A web-based personal portfolio, created for the course DA558A Javascript for web development.",
    "School Project",
    ["HTML", "CSS", "JavaScript"],
    "./res/img/default.png",
    "https://github.com/Lukkee/Lab-1"
);

const placeholder_project_2 = new project(
    5,
    "Placeholder Project 2",
    "Another placeholder project for demonstration purposes.",
    "Placeholder",
    ["Python", "Flask"],
    "./res/img/default.png",
    "#"
);

const projects = [fractal_project, p5_project, http_server_project, desklet_project, portfolio_project, placeholder_project_2];
const active_projects = [];

function buildProjectCard(project) {
    const card = document.createElement("div");
    card.classList.add("project-card");

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
    link.target = "_blank";
    link.rel = "noopener noreferrer";
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

function loadCards() {
    for (const project of active_projects) {
        CONTAINER.appendChild(buildProjectCard(project));
    }
}

loadCards();

function setActiveFilter(category) {
    // Accept keys like "all", "web", "hobby", "school" or full names.
    const key = String(category).toLowerCase();
    console.log(`Setting active filter to: ${key}`);

    // Clear current active projects
    active_projects.length = 0;

    // Reset active filter class
    const active_btn = document.getElementsByClassName("active-filter");
    if (active_btn.length > 0) {
        active_btn[0].classList.remove("active-filter");
    }

    // Clear current cards
    while (CONTAINER.firstChild) {
        CONTAINER.removeChild(CONTAINER.firstChild);
    }

    switch (key) {
        case "all":
            active_projects.push(...projects);
            F_ALL.classList.add("active-filter");
            break;

        case "web":
            for (const project of projects) {
                if (project.category === "Web Development") {
                    active_projects.push(project);
                }
            }
            F_WEB.classList.add("active-filter");
            break;
            
        case "hobby":
            for (const project of projects) {
                if (project.category === "Hobby Project") {
                    active_projects.push(project);
                }
            }
            F_HOBBY.classList.add("active-filter");
            break;

        case "school":
            for (const project of projects) {
                if (project.category === "School Project") {
                    active_projects.push(project);
                }
            }
            F_SCHOOL.classList.add("active-filter");
            break;

        default:
            console.log(`Unknown filter category: ${category}`);
            return;
    }

    loadCards();
}

F_ALL.addEventListener("click", function (e) {
    e.preventDefault();
    setActiveFilter("all");
});

F_WEB.addEventListener("click", function (e) {
    e.preventDefault();
    setActiveFilter("web");
});

F_HOBBY.addEventListener("click", function (e) {
    e.preventDefault();
    setActiveFilter("hobby");
});

F_SCHOOL.addEventListener("click", function (e) {
    e.preventDefault();
    setActiveFilter("school");
});

setActiveFilter("all");
