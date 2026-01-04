function LoadThemeFromCookies() {

    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
        const c = cookies[i].trim();
    
        if (c.startsWith('selectedTheme=')) {
            document.body.classList.add(
            c.substring('selectedTheme='.length)
            );
            
            break;
        }
    }
}

LoadThemeFromCookies();