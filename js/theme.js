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
}

LIGHTBTN.addEventListener("click", function (e) {
    e.preventDefault();
    ChangeTheme("light");
});

DARKBTN.addEventListener("click", function (e) {
    e.preventDefault();
    ChangeTheme("dark");
});

GREENBTN.addEventListener("click", function (e) {
    e.preventDefault();
    ChangeTheme("green");
});