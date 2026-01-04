const DARKBTN   = document.getElementById("darktheme");
const LIGHTBTN  = document.getElementById("lighttheme");
const GREENBTN  = document.getElementById("greentheme");
const BODY      = document.body;

function ClearCurrent() {
    DARKBTN.classList.remove('current');
    GREENBTN.classList.remove('current');
    LIGHTBTN.classList.remove('current');
    BODY.classList.remove('light');
    BODY.classList.remove('dark');
    BODY.classList.remove('green');
}

function ChangeTheme(theme) {
    ClearCurrent();
    switch (theme) {
        case 'light':
            LIGHTBTN.classList.add('current');
            BODY.classList.add('light');
            break;
        
        case 'dark':
            DARKBTN.classList.add('current');
            BODY.classList.add('dark');
            break;

        case 'green':
            GREENBTN.classList.add('current');
            BODY.classList.add('green');
            break;

        default:
            break;
    }

    saveTheme(theme);
}

function LoadThemeFromCookies() {
    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
        const c = cookies[i].trim();
    
        if (c.startsWith('selectedTheme=')) {
            theme = c.substring('selectedTheme='.length);
            ChangeTheme(theme);
            
            return;
        }
    }

    LIGHTBTN.classList.add('current');
}

function saveTheme(theme) {
    document.cookie = "selectedTheme="+theme+";max-age="+(60*60*24*30);
}

document.querySelectorAll(".theme-button").forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault();
        const theme = btn.dataset.theme;
        ChangeTheme(theme);
    });
});

/* This runs purely to change the theme button style, recursive but functional */
window.addEventListener('load', function() {
    LoadThemeFromCookies();
});