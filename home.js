const clearScreen = () => {
  while (document.body.children.length > 0) {
    document.body.removeChild(document.body.children[0]);
  };
}

const relink = () => {
  const links = document.querySelectorAll('a');
  for (let i = 0; i < links.length; i++) {
  }
}

const insertDescription = (selection) => {
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

const popup = (selection) => {
  console.log(selection);
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
      <a href='mailto:christopher.johnedis@gmail.com' target='_blank'><p class='links'>email</p></a>
    `;

  } else if (selection === 'software') {
    section.innerHTML = `
    <a id='nombolo'><p class='links'>nombolo</p></a>
    <a id='timer'><p class='links'>timer app</p></a>
    `;
  } else {
    section.innerHTML = `
      <a href='' target='_blank'><p class='links'>catherine feeny</p></a>
      <a href='https://thecrenshaw.bandcamp.com/track/free-dumb' target='_blank'><p class='links music'>the crenshaw</p></a>
      <a href='' target='_blank'><p class='links'>anna tivel</p></a>
    `;
  }

  document.body.appendChild(div);
  document.body.appendChild(section);

  if (selection === 'software') {
    document.querySelector('#nombolo').addEventListener('click', () => insertDescription('nombolo'));
    document.querySelector('#timer').addEventListener('click', () => insertDescription('timer'));
  } else if (selection === 'music') {
    const bandlist = document.querySelectorAll('.music');
    for (let i = 0; i < bandlist.length; i++) {
      bandlist[i].addEventListener('click', () => insertDescription(event));
    }
  }

  div.addEventListener('click', paintList, { once: true });
}

const paintList = () => {
  clearScreen();
  const ul = document.createElement('ul');
  const main = document.createElement('main');
  ul.classList.add('flex-down');
  ul.innerHTML = `
    <a class='name'>
      <li class='spacer'>chris</li>
      <li class='spacer'>johnedis.</li>
    </a>
    <a class='job' id='software'>
      <li class='spacer'>software</li>
      <li class='spacer'>engineer.</li>
    </a>
  `;
//    <a id='music'>
//      <li class='spacer'>musician.</li>
//    </a>

  main.appendChild(ul);
  document.body.appendChild(main);
  document.querySelector('.name').addEventListener('click', () => popup('name'));
  document.querySelector('#software').addEventListener('click', () => popup('software'));
  document.querySelector('#music').addEventListener('click', () => popup('music'));
};

document.addEventListener('DOMContentLoaded', () => {
  console.log('hi');
  paintList();
});
