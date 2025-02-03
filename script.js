const medianBlockWidth = window.innerWidth / 16;
const totalBlocks = [];
const buttons = ['start', 'stop', 'option', 'kermit'];
const namedButtons = [];

let blockIndex = 0;
let dataIndex = 0;
let intervalID;

function colorProgression(r, g, b) {
    let choice = Math.random();
    if (choice > 0.5) {
        r += Math.floor(Math.random() * 64);
        g += Math.floor(Math.random() * 64);
        b += Math.floor(Math.random() * 64);
    }
    if (choice < 0.5) {
        r -= Math.floor(Math.random() * 64);
        g -= Math.floor(Math.random() * 64);
        b -= Math.floor(Math.random() * 64);
    }
    if (r > 255 && g <= 255) {
        g = g + (r - 255);
        r = 255;
    } 
    if (r > 255 && g > 255){
        r = r - (g - 255);
        g = 255;
    }
    if (g > 255 && b <= 255) {
        b = b + (g - 255);
        g = 255;
    } 
    if (g > 255 && b > 255){
        g = g - (b - 255);
        b = 255;
    } 
    if (b > 255 && r <= 255) {
        r = r + (b - 255);
        b = 255;
    } 
    if (b > 255 && r > 255){
        b = b - (r - 255);
        r = 255;
    }
    return `rgb(${r}, ${g}, ${b})`;
}


function createButton(element) {
    const button = document.createElement('button');
    button.innerHTML = element;
    button.setAttribute('dataIndex', dataIndex);

    if (dataIndex === 0) { 
        button.addEventListener('click', () => {
            clearInterval(intervalID); 
            intervalID = setInterval(createRandomCircles, 750)});
    }
    if (dataIndex === 1) { 
        button.addEventListener('click', () => {
            clearInterval(intervalID)});
    }
    if (dataIndex === 2) { 
        button.addEventListener('click', () => {
            document.body.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;    
        
        })
    };
    button.style.width = '100px';
    button.style.height = '60px';
    button.style.backgroundColor = 'antiquewhite';
    button.style.color = 'lightgray';
    button.style.textShadow = '0px 0px 5px black, 0 0 10px black, 0 0 5px black';
    button.style.borderRadius = '10px';
    button.style.fontSize = '1.5em';
    button.style.fontFamily = 'Helvetica';
    button.style.zIndex = 100;
    document.body.appendChild(button);
    dataIndex++;
}

buttons.forEach(element => {
    createButton(element);    
})


function createRandomCircles() {  
    let block = document.createElement('div');
    let allSizes = [(medianBlockWidth * 3), (medianBlockWidth * 2), (medianBlockWidth * 2), medianBlockWidth, medianBlockWidth, medianBlockWidth, medianBlockWidth, (medianBlockWidth * 0.75), (medianBlockWidth * 0.75), (medianBlockWidth * 0.5)];
    let size = allSizes[(Math.floor(Math.random() * 10))];
    let randomOpacity = Math.random() * 1;
    
    let keyframes = [{transform: 'scale(4)', opacity: 0}];
    let options = {duration: 8000, easing: 'ease-out', fill: 'forwards'};
    let blockposX = Math.floor(Math.random() * window.innerWidth) - size / 2;
    let blockposY = Math.floor(Math.random() * window.innerHeight) - size / 2;
    
    block.setAttribute('index', blockIndex);

    block.style.width = `${size}px`;
    block.style.height = `${size}px`;
    block.style.left = `${blockposX}px`;
    block.style.top = `${blockposY}px`;
    block.style.position = 'absolute';
    block.style.backgroundColor = colorProgression(r, g, b);
    block.style.boxShadow = '0 0 25px 10px white';
    block.style.borderRadius = `50%`;
    block.style.opacity = randomOpacity;
    block.style.zIndex = 1;
    
    block.animate(keyframes, options);
    document.body.appendChild(block);
    setTimeout(() => {
       document.body.removeChild(block); 
    }, 7750);
}


function createRandomGrid() {  
    let block = document.createElement('div');

    let blockposX = Math.floor(Math.random() * 16) * medianBlockWidth;
    let blockposY = Math.floor(Math.random() * 9) * medianBlockWidth;
    
    block.setAttribute('index', blockIndex);

    block.style.width = medianBlockWidth / 2 + 'px';
    block.style.height = medianBlockWidth / 2 + 'px';
    block.style.left = `${blockposX}px`;
    block.style.top = `${blockposY}px`;
    block.style.position = 'absolute';
    block.style.backgroundColor = colorProgression(r, g, b);
    block.style.boxShadow = '0 0 4px 4px white';
    block.style.borderRadius = `5px`;
    block.style.zIndex = 1;
    
    document.body.appendChild(block);

    blockIndex++;
    totalBlocks.push(block);
}
