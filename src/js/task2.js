import { clear, createBoxes } from "../utils";

const createBtn = document.querySelector("[data-action='create']");
const cleatBtn = document.querySelector("[data-action='destroy']");
const container = document.querySelector('#boxes');
const input = document.querySelector('.js-input');
const initialSize = 30;

createBtn.setAttribute("disabled", "disabled");

let amount;
input.addEventListener('input', e => {
  let value = e.target.value;
  e.preventDefault();
  if(+value <= 100 && +value > 0){
    amount = +value;
    createBtn.removeAttribute("disabled", "disabled");
  }
  else createBtn.setAttribute("disabled", "disabled");
  
});

createBtn.addEventListener('click', () => {
  createBoxes(container, amount, initialSize)
  input.value = '';
});
cleatBtn.addEventListener('click', () => clear(container));
