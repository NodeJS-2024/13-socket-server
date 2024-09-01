
// console.log('Nuevo Ticket HTML');

const currentTicketbl = document.querySelector('span');
const createTicketBtn = document.querySelector('button');


async function getLastTicket() {
  const lastTicket = await fetch('/api/ticket/last').then(resp => resp.json());
  currentTicketbl.innerText = lastTicket;
  // console.log(lastTicket);
}

async function createTicket() {
  const newTicket = await fetch('/api/ticket', {
    method: 'POST'
  }).then(resp => resp.json());

  currentTicketbl.innerText = newTicket.number;
}

createTicketBtn.addEventListener('click', createTicket);

getLastTicket();