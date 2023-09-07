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

const nameSection = () => {
  const section = document.createElement('section');
  const div = document.createElement('div');
  div.classList.add('modal', 'modal-name');
  section.classList.add('popup', 'flex-down');
  section.innerHTML = `
    <a href='https://github.com/johnedisc'><p class='links'>github</p></a>
    <a href='https://www.linkedin.com/in/johnedisc/'><p class='links'>linkedin</p></a>
    <a href='christopher.johnedis@gmail.com'><p class='links'>email</p></a>
  `

  document.body.appendChild(div);
  document.body.appendChild(section);

  div.addEventListener('click', paintList, { once: true });
}

const softwareSection = () => {
  const section = document.createElement('section');
  const div = document.createElement('div');
  div.classList.add('modal-software', 'modal');
  section.classList.add('popup', 'flex-down');
  section.innerHTML = `
    <a href='https://www.nombolo.com/'><p class='links'>nombolo.</p></a>
    <a href='https://www.linkedin.com/in/johnedisc/'><p class='links'>linkedin</p></a>
    <a href='christopher.johnedis@gmail.com'><p class='links'>email</p></a>
  `

  document.body.appendChild(div);
  document.body.appendChild(section);

  div.addEventListener('click', paintList, { once: true });
}

const paintList = () => {
  clearScreen();
  const ul = document.createElement('ul');
  const main = document.createElement('main');
  ul.classList.add('flex-down');
  ul.innerHTML = `
    <a class='name'>
    <li class='h4 spacer name'>chris</li>
    <li class='h4 spacer name'>johnedis</li>
    </a>
    <a class='job' id='software'>
    <li class='h4 spacer'>software</li>
    <li class='h4 spacer'>engineer</li>
    </a>
    <a class='job' id='music'><li class='h4 spacer'>drummer</li></a>
  `;
  main.appendChild(ul);
  document.body.appendChild(main);
  document.querySelector('.name').addEventListener('click', nameSection)
  document.querySelector('#software').addEventListener('click', softwareSection)
};

document.addEventListener('DOMContentLoaded', () => {
  console.log('hi');
  paintList();
});
