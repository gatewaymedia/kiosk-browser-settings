
let time = new Date().getTime();

const target = "https://hub.gc.org.au/";

const seconds = (num) => {
    return num * 1000;
}

const checkTime = seconds(10);
const refreshTime = seconds(60);

const setActivityTime = (e) => {
    console.log("Resetting time");
    time = new Date().getTime();
}

const setBody = () => {
    document.body.innerHTML = `
    <div style="display: grid;justify-content: center; align-content: center; height: 100vh">
        <h2>Refreshing Kiosk. Please wait...</h2>
    </div>
    `
}

const resetActions = [
    "mousemove",
    "touchmove",
    "scroll",
    "keypress"
];

resetActions.forEach((e) => {
    window.addEventListener(e, setActivityTime);
})

const refresh = () => {
    const currentTime = new Date().getTime();
    const update = (currentTime - time) >= refreshTime;
    console.log(`Current countdown:`, currentTime - time, `Refresh time:`, update);

    if (update) {
        if (window.location.href == target) {
            window.scroll(0, 0);
            setActivityTime();
            return setTimeout(refresh, checkTime);
        }
        setBody();
        window.location.href = target;
        setTimeout(addMenu, 5000);
    } else {
        setTimeout(refresh, checkTime);
    }

}

setTimeout(refresh, checkTime);

const addCss = () => {
    const style = document.createElement('style');
    style.type = 'text/css';

    style.textContent = `
    .inject-menu {
        position: absolute;
        top: 50%;
        left: -120px;
        transition: all 0.5s ease-out;
        -webkit-transition: all 0.5s ease-out;
        -moz-transition: all 0.5s ease-out;
        -o-transition: all 0.5s ease-out;
        -ms-transition: all 0.5s ease-out;
        width: 150px;
        background-color: #16a697;
        height: 150px;
        border-radius: 0 20px 20px 0;
        z-index: 9999999999999999999;
    }
    
    .inject-menu:hover {
        left: 0px;
    }
    
    .inject-menu p:last-child {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        margin: 0;
        place-items: center;
        color:white;
        font-family: sans-serif;
        font-weight: bold;
        font-size: .75em;
        text-orientation: mixed;
        writing-mode: vertical-rl;
    }
    
    .inject-menu:hover p {
        opacity: 0;
    }
    
    .inject-menu a {
        font-weight: bold;
        font-family: sans-serif;
        color: white;
    }
    
    .inject-menu a:hover {
        text-decoration: underline;
        cursor: pointer;
    }
    
    .inject-menu-inner {
        position:relative;
        height: 100%;
        width: 100%;
    }
    
    .inject-menu-content {
        height: 100%;
        display: grid;
        grid-auto-flow: row;
        gap: 10px;
        place-items: center;
        align-content: center;
    }`

    document.head.appendChild(style);
}

const addMenu = () => {
    // Create the parent div element with class "inject-menu"
    const injectMenuDiv = document.createElement('div');
    injectMenuDiv.classList.add('inject-menu');

    // Create the child div element with class "inject-menu-inner"
    const injectMenuInnerDiv = document.createElement('div');
    injectMenuInnerDiv.classList.add('inject-menu-inner');

    // Create the innermost div element with class "inject-menu-content"
    const injectMenuContentDiv = document.createElement('div');
    injectMenuContentDiv.classList.add('inject-menu-content');

    // Create the "Home" button
    const homeButton = document.createElement('a');
    homeButton.textContent = 'Home';
    homeButton.setAttribute('id', 'home-button');
    injectMenuContentDiv.appendChild(homeButton);

    // Create the "Refresh" button
    const refreshButton = document.createElement('a');
    refreshButton.textContent = 'Refresh';
    refreshButton.setAttribute('id', 'refresh-button');
    injectMenuContentDiv.appendChild(refreshButton);

    // Create the "Back" button
    const backButton = document.createElement('a');
    backButton.textContent = 'Back';
    backButton.setAttribute('id', 'back-button');
    injectMenuContentDiv.appendChild(backButton);

    // Append the "inject-menu-content" div to the "inject-menu-inner" div
    injectMenuInnerDiv.appendChild(injectMenuContentDiv);

    // Create the paragraph element with "menu" text
    const menuParagraph = document.createElement('p');
    menuParagraph.textContent = 'menu';
    injectMenuInnerDiv.appendChild(menuParagraph);

    // Append the "inject-menu-inner" div to the "inject-menu" div
    injectMenuDiv.appendChild(injectMenuInnerDiv);

    // Append the "inject-menu" div to the document body
    document.body.appendChild(injectMenuDiv);

    homeButton.addEventListener('click', () => {
        window.location.href = target;
    });

    refreshButton.addEventListener('click', () => {
        window.location.reload();
    })

    backButton.addEventListener('click', () => {
        window.history.back();
    })
}

setTimeout(addMenu, 5000);
setTimeout(addCss, 4000);

