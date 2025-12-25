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

const project1 = new project(
    0, 
    "Fractal Generator",
    "A Fractal generator made using js and presented in html/css, made as a hobby project. The generator uses L-Systems to generatively produce fractals through multiple generations.",
    "Hobby Project",
    ["Javascript", "HTML", "CSS"],
    "./res/img/fractal.jpg",
    "http://luklun.se/fractal.html"
);

const project2 = new project(
    1, 
    "P5.js editor",
    "A P5.js web-editor made as a hobby project, using codemirror to let the user input code in a window and view the result in a canvas.",
    "Hobby Project",
    ["Javascript", "HTML", "CSS"],
    "./res/img/p5.png",
    "http://luklun.se/p5editor.html"
);


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
    container.appendChild(buildProjectCard(project1));
    container.appendChild(buildProjectCard(project2));
}

loadCards();