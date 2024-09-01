
// console.log('Escritorio HTML');

// Referencias HTML
const lblPending = document.querySelector('#lbl-pending');
const deskHeader = document.querySelector('h1');
const noMoreAlert = document.querySelector('.alert');
const lblCurrentTicket = document.querySelector('small');

const btnDraw = document.querySelector('#btn-draw');
const btnDone = document.querySelector('#btn-done');


// QueryParams
const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
  window.location = 'index.html';
  throw new Error('Escritorio es requerido');
}

const deskNumber = searchParams.get('escritorio');
let workingTicket = null;

deskHeader.innerText = deskNumber;


// Se encarga de ocultar el alert
function checkTicketCount(currentCount = 0) {
  if (currentCount === 0) {
    noMoreAlert.classList.remove('d-none');
  } else {
    noMoreAlert.classList.add('d-none');
  }

  lblPending.innerHTML = currentCount;
}


async function loadInitialCount() {
  const pendingTickets = await fetch('/api/ticket/pending').then(resp => resp.json());
  lblPending.innerHTML = pendingTickets.length || 0;
  checkTicketCount(pendingTickets.length);
}

async function getTicket() {
  const { status, ticket, message } = await fetch(`/api/ticket/draw/${ deskNumber }`).then(resp => resp.json());

  if (status == 'error') {
    lblCurrentTicket.innerText = message;
    return;
  }

  workingTicket = ticket;
  lblCurrentTicket.innerText = ticket.number;
}



function connectToWebSockets() {

  const socket = new WebSocket( 'ws://localhost:3000/ws' );

  socket.onmessage = ( event ) => {
    // console.log(event.data); // on-ticket-count-changed

    const { type, payload } = JSON.parse(event.data);

    if (type !== 'on-ticket-count-changed') return;

    lblPending.innerHTML = payload;
    checkTicketCount(payload);
  };

  socket.onclose = ( event ) => {
    console.log( 'Connection closed' );
    setTimeout( () => {
      console.log( 'retrying to connect' );
      connectToWebSockets();
    }, 1500 );

  };

  socket.onopen = ( event ) => {
    console.log( 'Connected' );
  };

}

// listeners
btnDraw.addEventListener('click', getTicket);


// Init
loadInitialCount();
connectToWebSockets();