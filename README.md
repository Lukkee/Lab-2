# Personal Portfolio - Lukas Lundin
This repository contains the source code for a personal portfolio website, made for the lab "Lab 2 - Interactive Portfolio Enhancement with Git Workflow" in the course DA558A.

## Features
- Responsive multi-page layout
- Three themes to choose from with smooth animations
- Projects page with dynamic loading and filters
- Contact page with error-checking contact-form
- Modular and reusable CSS structure
- JavaScript without frameworks
- Accessible and semantic HTML

## Built With

- **HTML**          -   Page structures
- **CSS**           -   Styling, layouts and themes
- **JavaScript**    -   Handling for contact-form,project-filtering, and themes

No external libraries or frameworks have been used.

## Project Structure
├── css/
│ └── style.css     # Global styles and themes
├── images/
│ └── *.png / *.jpg # Images and icons
├── js/
│ ├── contact.js    # Handles contact-form 
│ ├── loadtheme.js  # Handles loading theme from cookies
│ └── projects.js   # Handles project filtering and loading
│ └── theme.js      # Handles switching themes and saving to cookies
├── about.html      # About & timeline
├── projects.html   # Projects with filtering
├── index.html      # Home page
├── contact.html    # Contact form and links
└── README.md

## Setup
This project is a static website and does not require any dependencies.

1. Clone the repository:

> git clone https://github.com/Lukkee/portfolio.git

Navigate to the project folder:

Open index.html in your browser:
- Double-click the file, or
- Right-click → "Open with browser"

## Themes
Three themes (light, dark and green) are choosable using buttons in the navbar, they are applied through changing the class of the body using theme.js, which switches values of color-variables stored in theme.css, and later imported in style.css

When a new theme is applied it is stored in a cookie within theme.js, which on page-load is read using loadtheme.js before any html within the body is loaded, to prevent a sudden flash of default-colors.

## Project-filtering
The projects are stored in an array, in the format of a project class within projects.js. When using a filter button, the script clears a temporary array with "active projects", adds the corresponding projects using the category tag, and loads all active projects to the page.

## Contact-form
The contact form uses a stack of validation functions to check for valid or invalid input, the error messages are cleared when a section is either fixed or when the form is cleared.

If all inputs are valid when the submit button is used, a success message will be visible briefly

## Purpose
This portfolio has been created to
- Learn dynamic web development
- Learn web design
- Serve as a possible starting ground for a future professional portfolio