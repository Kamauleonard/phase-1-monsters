document.addEventListener('DOMContentLoaded', () => {
    const monsterContainer = document.getElementById('monster-container');
    const createMonsterDiv = document.getElementById('create-monster');
    const backButton = document.getElementById('back');
    const forwardButton = document.getElementById('forward');
  
    const baseURL = 'http://localhost:3000/monsters';
    let currentPage = 1;
    const monstersPerPage = 50;
  
    // Initial load: Show the first 50 monsters
    fetchMonsters(currentPage);
  
    // Event listener for the "Create Monster" form submission
    createMonsterDiv.innerHTML = `
      <form id="monster-form">
        <input type="text" id="name" placeholder="Name">
        <input type="number" id="age" placeholder="Age">
        <input type="text" id="description" placeholder="Description">
        <button>Create Monster</button>
      </form>
    `;
  
    const monsterForm = document.getElementById('monster-form');
    monsterForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = event.target.name.value;
      const age = event.target.age.value;
      const description = event.target.description.value;
  
      if (name && age && description) {
        const newMonster = { name, age, description };
  
        // Create and save the monster
        createMonster(newMonster);
      }
    });
  
    // Event listener for the "Back" button
    backButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        fetchMonsters(currentPage);
      }
    });
  
    // Event listener for the "Forward" button
    forwardButton.addEventListener('click', () => {
      currentPage++;
      fetchMonsters(currentPage);
    });
  
    // Function to fetch monsters
    function fetchMonsters(page) {
      const limit = monstersPerPage;
      const offset = (page - 1) * monstersPerPage;
  
      fetch(`${baseURL}?_limit=${limit}&_page=${page}`)
        .then((response) => response.json())
        .then((monsters) => {
          displayMonsters(monsters);
        });
    }
  
    // Function to create and save a monster
    function createMonster(monster) {
      fetch(baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(monster),
      })
        .then((response) => response.json())
        .then((newMonster) => {
          displayMonster(newMonster);
        });
    }
  
    // Function to display a list of monsters
    function displayMonsters(monsters) {
      monsterContainer.innerHTML = '';
      monsters.forEach((monster) => {
        displayMonster(monster);
      });
    }
  
    // Function to display a single monster
    function displayMonster(monster) {
      const monsterDiv = document.createElement('div');
      monsterDiv.innerHTML = `
        <h3>Name: ${monster.name}</h3>
        <p>Age: ${monster.age}</p>
        <p>Description: ${monster.description}</p>
      `;
      monsterContainer.appendChild(monsterDiv);
    }
  });
  