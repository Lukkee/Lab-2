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

const fractal_project = new project(
    0, 
    "Fractal Generator",
    "A Fractal generator made using js and presented in html/css, made as a hobby project. The generator uses L-Systems to generatively produce fractals through multiple generations.",
    "Hobby Project",
    ["Javascript", "HTML", "CSS"],
    "./res/img/fractal.jpg",
    "https://github.com/Lukkee/fractal-generation-using-L-systems"
);

const p5_project = new project(
    1, 
    "P5.js editor",
    "A P5.js web-editor made as a hobby project, using codemirror to let the user input code in a window and view the result in a canvas.",
    "Hobby Project",
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
    "Command Desklet for Cinnamon",
    "A simple linux Cinnamon desklet made using js, for showing command outputs in Cinnamon 6.4.X.",
    "Open Source Hobby Project",
    ["Javascript", "JSON"],
    "./res/img/default.png",
    "https://github.com/Lukkee/commands-desklet"
);

const projects = [fractal_project, p5_project, http_server_project, desklet_project];

const container = document.getElementById("projects-container");

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
    for (const project of projects) {
        container.appendChild(buildProjectCard(project));
    }
}

loadCards();