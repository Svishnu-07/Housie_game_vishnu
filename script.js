const ticketsContainer = document.getElementById('tickets-container');
const generateBtn = document.getElementById('generate-btn');
const newGameBtn = document.getElementById('new-game-btn');
const ticketCountInput = document.getElementById('ticket-count');

let gameStarted = false;
let ticketsArray = [];

generateBtn.addEventListener('click', ()=> {
    if(gameStarted){
        alert("Game already started! Cannot generate new tickets mid-game.");
        return;
    }

    let count = parseInt(ticketCountInput.value);
    if(isNaN(count) || count<1) count=1;
    if(count>3) count=3;

    generateTickets(count);
    gameStarted = true;
});

newGameBtn.addEventListener('click', ()=>{
    if(confirm("Start a new game? All current tickets will reset.")){
        ticketsContainer.innerHTML = '';
        ticketsArray = [];
        gameStarted = false;
    }
});

function generateTickets(count){
    ticketsContainer.innerHTML='';
    ticketsArray = [];

    for(let i=0;i<count;i++){
        const ticket = createTicket();
        ticketsArray.push(ticket);

        const ticketDiv = document.createElement('div');
        ticketDiv.className='ticket';
        ticketDiv.innerHTML=`<div class="ticket-header">Ticket ${i+1}</div><div class="ticket-grid"></div>`;
        const grid = ticketDiv.querySelector('.ticket-grid');

        ticket.forEach(row=>{
            row.forEach(cell=>{
                const cellDiv = document.createElement('div');
                cellDiv.className='ticket-cell';
                if(cell===null) cellDiv.classList.add('empty');
                else {
                    cellDiv.textContent = cell;
                    cellDiv.style.backgroundColor = getRandomColor();
                    cellDiv.addEventListener('click', ()=>{
                        if(!cellDiv.textContent) return;
                        cellDiv.classList.toggle('marked');
                    });
                }
                grid.appendChild(cellDiv);
            });
        });
        ticketsContainer.appendChild(ticketDiv);
    }
}

// Ticket generation logic (3x9, 5 numbers per row)
function createTicket(){
    let ticket = Array(3).fill().map(()=>Array(9).fill(null));
    const colRanges = [
        [1,9],[10,19],[20,29],[30,39],[40,49],[50,59],[60,69],[70,79],[80,90]
    ];
    for(let row=0;row<3;row++){
        let cols = Array.from({length:9},(_,i)=>i);
        shuffle(cols);
        const selected = cols.slice(0,5);
        selected.forEach(col=>{
            let num;
            do { num = getRandom(colRanges[col][0],colRanges[col][1]); } 
            while(ticket.flat().includes(num));
            ticket[row][col]=num;
        });
    }
    return ticket;
}

function shuffle(array){for(let i=array.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1)); [array[i],array[j]]=[array[j],array[i]];}}
function getRandom(min,max){return Math.floor(Math.random()*(max-min+1))+min;}
function getRandomColor(){
    const colors = ["#e74c3c","#8e44ad","#3498db","#27ae60","#f1c40f","#d35400"];
    return colors[Math.floor(Math.random()*colors.length)];
}
