import { Router } from "./router.js";

export const addLinkListener = (parent) => {
  const links = parent.querySelectorAll('a');
  if (links) {
    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener('click', (event) => {
        const url = links[i].getAttribute('href');
        if (url.includes('http')) {
          return 0;
        }
        event.preventDefault();
        Router.go(url);
      });
    };
  }
}

const backBtn = ` <a href='/'><p class='back' style='color: var(--primary-font-color)'>back.</p></a> `;

const clearScreen = () => {
  while (document.body.children.length > 0) {
    document.body.removeChild(document.body.children[0]);
  };
}

export const insertDescription = (selection) => {
  console.log(selection);
  let argument;
  if ((selection === 'nombolo' && document.querySelector('#nomboloDescription')) || (selection === 'timer' && document.querySelector('#timerDescription'))) return 0;
  //see which project link was clicked
  selection === 'nombolo' ? argument = '#nombolo'
    : argument = '#timer';

  //check to see if a previous project description is open
  argument === '#nombolo' && document.querySelector('#timerDescription') ? document.querySelector('.popup').removeChild(document.querySelector('#timerDescription'))
    : argument === '#timer' && document.querySelector('#nomboloDescription')
      ? document.querySelector('.popup').removeChild(document.querySelector('#nomboloDescription')) : 

  document.querySelector(argument).classList.toggle('clicked');

  const p = document.createElement('p');

  if (selection === 'nombolo') { 
    p.innerHTML = `
      <a href='https://www.nombolo.com/'><p class='links'>implemented company website with designs from the design team using figma to visualize the product. implemented with <b>react, aws-amplify, graphql, gitlab, and vim</b></p></a>
    `;
    p.setAttribute('id','nomboloDescription');
  } else {
    p.innerHTML = `
      <a href='https://timer.chrisjohnedis.com'><p class='links'>the timer app is an programmable interval timer which allows the user to create a series of custom tasks to be timed in sucession. the data is tracked and stored for later anaylsis. this project designed by my friend ethan demarest and implemented with <b>vanilla typescript, postgreSQL, a nodejs typescript server, on an ec2 instance</b></p></a>
    `;
    p.setAttribute('id','timerDescription');
  }
  document.querySelector(argument).after(p);
}

export const popup = (selection) => {
  let className;
  selection === 'name' ? className = 'modal-name'
    : selection === 'software'
      ? className = 'modal-software'
        : className = 'modal-music';

  const section = document.createElement('section');
  const div = document.createElement('div');
  div.classList.add('modal', className);
  section.classList.add('popup');
  if (selection === 'name') {
    section.innerHTML = `
      <a href='https://github.com/johnedisc' target='_blank'><p class='links'>github</p></a>
      <a href='https://www.linkedin.com/in/johnedisc/' target='_blank'><p class='links'>linkedin</p></a>
      <a href='mailto:chris@mail.chrisjohnedis.com' target='_blank'><p class='links'>email</p></a>
      <a href='https://docs.google.com/document/d/e/2PACX-1vReinLxM7HH2EhRJ9ATq_Kdl8zd8j0-zgjbH76EhjFOq93xvaVrXXuhY7mDUxVDuQ/pub' target='_blank'><p class='links'>resume</p></a>

      ${backBtn}
    `;

  } else if (selection === 'software') {
    section.innerHTML = `
    <a href='/nombolo' id='nombolo'><p class='links'>nombolo</p></a>
    <a href='/timer' id='timer'><p class='links'>timer app</p></a>
      ${backBtn}
    `;
  } else {
    section.innerHTML = `
      <a target='_blank'><p class='list-header'>drums.</p></a>
      <a href='https://music.apple.com/us/album/catherine-feeny-and-chris-johnedis/976424080' target='_blank'><p class='links'>catherine feeny</p></a>
      <a href='https://thecrenshaw.bandcamp.com/track/free-dumb' target='_blank'><p class='links music'>the crenshaw</p></a>
      <a href='https://annativel.bandcamp.com/album/small-believer' target='_blank'><p class='links'>anna tivel</p></a>
      <a href='https://music.apple.com/gb/album/diamond-in-a-rock/668538316' target='_blank'><p class='links'>tunde baiyewu</p></a>
      <a target='_blank'><p class='list-header'>percussion.</p></a>
      <a href='https://toddmarston.bandcamp.com/album/solidarity-themes' target='_blank'><p class='links'>todd marston</p></a>
      <a href='https://corinnesharlet.bandcamp.com/album/a-lovely-future' target='_blank'><p class='links'>corinne sharlet</p></a>
      ${backBtn}
    `;
  }
  addLinkListener(section);

  document.body.appendChild(div);
  document.body.appendChild(section);

//  if (selection === 'software') {
//    document.querySelector('#nombolo').addEventListener('click', () => insertDescription('nombolo'));
//    document.querySelector('#timer').addEventListener('click', () => insertDescription('timer'));
//  } else if (selection === 'music') {
//    const bandlist = document.querySelectorAll('.music');
//    for (let i = 0; i < bandlist.length; i++) {
//      bandlist[i].addEventListener('click', () => insertDescription(event));
//    }
//  }

  div.addEventListener('click', paintList, { once: true });
}

export const paintList = () => {
	
  clearScreen();
  const ul = document.createElement('ul');
  const main = document.createElement('main');
  ul.classList.add('flex-down');
  ul.innerHTML = `
    <a href='/about' class='name'>
      <li class='spacer'>chris</li>
      <li class='spacer'>johnedis.</li>
    </a>
    <a href='/development' class='job' id='software'>
      <li class='spacer'>web</li>
      <li class='spacer'>developer.</li>
    </a>
    <a href='/music' class='music' id='music'>
      <li class='spacer'>musician.</li>
    </a>
  `;
  addLinkListener(ul);

  main.appendChild(ul);
  document.body.appendChild(main);
//  document.querySelector('.name').addEventListener('click', () => popup('name'));
//  document.querySelector('#software').addEventListener('click', () => popup('software'));
//  document.querySelector('#music').addEventListener('click', () => popup('music'));

  backgroundText(main);
};


function backgroundText(parentElement) {
  const div = document.createElement('div');
  div.setAttribute('id', 'background-text');
  div.innerHTML = `
    <h1>javascript</h1>
    <h1>react</h1>
    <h1>css</h1>
    <h1>html</h1>
    <h1>postgreSQL</h1>
    <h1>nodejs</h1>
  `;
  parentElement.appendChild(div);
}

document.addEventListener('DOMContentLoaded', () => {
  Router.init();
});
