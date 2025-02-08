//  constants / variables

document.body.style.overflow = 'hidden';
document.body.style.backgroundColor = 'lightgreen';
const medianBlockWidth = window.innerWidth / 32;
const totalBlocks = [];
const buttons = ['start', 'stop', 'option'];

let blockIndex = 0;
let dataIndex = 0;
let intervalID;

//  creating div skeleton

const buttonDiv = document.createElement('div')

const buttonDivStyles = {
    position: 'fixed',
    top: '80%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
}

for (const property in buttonDivStyles) {
    buttonDiv.style[property] = buttonDivStyles[property];
}

document.body.appendChild(buttonDiv);


const blockDiv = document.createElement('div');

const blockDivStyles = {
    width: '100vw',
    height: '100vh',
    zIndex: 0,
}

for (const property in blockDivStyles) {
    blockDiv.style[property] = blockDivStyles[property];
}

document.body.appendChild(blockDiv);

//  color logic

function randomBaseColors() {
    let baseRBG = [];
    for (let i = 0; i < 3; i++) {
        baseRBG.push(Math.floor(Math.random() * 255));    
    }
    return baseRBG;
}

let currentBaseRGB = randomBaseColors();


function returnRGB(array) {
    return `rgb(${array[0]}, ${array[1]}, ${array[2]})`;
}


function colorProgression(array) {
    let r = array[0];
    let g = array[1];
    let b = array[2];
    let choice = Math.random();
    
    if (choice > 0.5) {
        r += Math.floor(Math.random() * 32);
        g += Math.floor(Math.random() * 32);
        b += Math.floor(Math.random() * 32);
    }
    if (choice < 0.5) {
        r -= Math.floor(Math.random() * 32);
        g -= Math.floor(Math.random() * 32);
        b -= Math.floor(Math.random() * 32);
    }
    if (r > 255 && g <= 255) {g = g + (r - 255); r = 255} 
    if (r > 255 && g > 255) {r = r - (g - 255); g = 255}
    if (g > 255 && b <= 255) {b = b + (g - 255); g = 255} 
    if (g > 255 && b > 255) {g = g - (b - 255); b = 255}
    if (b > 255 && r <= 255) {r = r + (b - 255); b = 255} 
    if (b > 255 && r > 255) {b = b - (r - 255); r = 255}
    if (r > 255) {r = 255}
    if (g > 255) {g = 255}
    if (b > 255) {b = 255}
    if (r < 0) {r = 0;}
    if (g < 0) {g = 0;}
    if (b < 0) {b = 0;}

    let progressedRBG = [];
    progressedRBG.push(r);
    progressedRBG.push(g);
    progressedRBG.push(b);

    return progressedRBG;
}

//  buttons

function createButton(element) {
    const button = document.createElement('button');
    button.innerHTML = element;
    button.setAttribute('dataIndex', dataIndex);
    
    const buttonStyles = {
        width: '100px',
        height: '45px',
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        color: 'rgb(41, 49, 51)',
        textShadow: '0px 0px 5px white, 0 0 5px white, 0 0 5px white',
        borderRadius: '10px',
        fontSize: '1.5em',
        fontFamily: 'Helvetica',
        marginRight: '4px',
    }

    for (const property in buttonStyles) {
        button.style[property] = buttonStyles[property];
    }

    if (dataIndex === 0) { 
        button.addEventListener('click', () => {
            currentBaseRGB = randomBaseColors();
            clearInterval(intervalID); 
            intervalID = setInterval(createRandomCircles, 1000)});
    }
    if (dataIndex === 1) { 
        button.addEventListener('click', () => {
            clearInterval(intervalID)});
    }
    if (dataIndex === 2) { 
        button.addEventListener('click', () => {
            document.body.style.backgroundColor = returnRGB(randomBaseColors());    
        })
    };

    buttonDiv.appendChild(button);
    dataIndex++;
}

buttons.forEach(element => {
    createButton(element);    
})

//  create random elements

function createRandomCircles() {  
    let block = document.createElement('div');
    let allSizes = [(medianBlockWidth * 3), (medianBlockWidth * 2), (medianBlockWidth * 2), medianBlockWidth, medianBlockWidth, medianBlockWidth, medianBlockWidth, (medianBlockWidth * 0.75), (medianBlockWidth * 0.75), (medianBlockWidth * 0.5)];
    let size = allSizes[(Math.floor(Math.random() * 10))];
    let keyframes = [{transform: 'scale(6)', opacity: 0}];
    let options = {duration: 12000, easing: 'ease-out', fill: 'forwards'};
    let blockposX = Math.floor(Math.random() * window.innerWidth) - size / 2;
    let blockposY = Math.floor(Math.random() * window.innerHeight) - size / 2;

    block.setAttribute('id', blockIndex);
    const blockStyles = {
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        left: `${blockposX}px`,
        top: `${blockposY}px`,
        backgroundColor: returnRGB(currentBaseRGB),
        boxShadow: '0 0 20px 10px white',
        borderRadius: `50%`,
        opacity: Math.random() * 1,
    }

    for (const property in blockStyles) {
        block.style[property] = blockStyles[property];
    }

    block.animate(keyframes, options);
    blockDiv.appendChild(block);
    setTimeout(() => {
       blockDiv.removeChild(block); 
    }, 7750);

    blockIndex++;
    currentBaseRGB = colorProgression(currentBaseRGB);
}
