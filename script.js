//Player Stats
let xp = 0; //Player experience points, which increase when defeating monsters
let health = 100; //Player health, which decrease when attacked by monsters
let gold = 50; //Player gold, used to purchase health and weapons, obtained from defeating monsters or selling weapons
let currentWeapon = 0; //Index representing the player's current weapon in the weapons array
let fighting; //Index representing the current monster the player is fighting
let monsterHealth; //Current health of the monster being fought
let inventory = ["stick"]; //Player's inventory, initially containing a basic weapon

//DOM elements
const button1 = document.querySelector('#button1'); // First action button
const button2 = document.querySelector("#button2"); // Second action button
const button3 = document.querySelector("#button3"); // Third action button
const text = document.querySelector("#text"); // Main text area for game messages
const xpText = document.querySelector("#xpText"); // Text area displaying player's experience points
const healthText = document.querySelector("#healthText"); // Text area displaying player's health points
const goldText = document.querySelector("#goldText"); // Text area displaying player's gold amount
const monsterStats = document.querySelector("#monsterStats"); // Area displaying monster's stats during a fight
const monsterName = document.querySelector("#monsterName"); // Text displaying the monster's name
const monsterHealthText = document.querySelector("#monsterHealth"); // Text displaying the monster's health

//Weapons array with name and power properties
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];

//Monsters array with name, level, and health properties
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
]

//Locations array with name, button texts, button functions, and text properties
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\"."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
  }, 
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
];

//Initialize buttons with their respective functions
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

//Function to update the game state based on the current location
function update(location) {
  monsterStats.style.display = "none"; // Hide monster stats
  button1.innerText = location["button text"][0]; // Set button1 text based on location
  button2.innerText = location["button text"][1]; // Set button2 text based on location
  button3.innerText = location["button text"][2]; // Set button3 text based on location
  button1.onclick = location["button functions"][0]; // Set button1 function based on location
  button2.onclick = location["button functions"][1]; // Set button2 function based on location
  button3.onclick = location["button functions"][2]; // Set button3 function based on location
  text.innerHTML = location.text; // Set the main text area with location description
}

//Functions to navigate to different locations
function goTown() {
  update(locations[0]); // Update to town square location
}

function goStore() {
  update(locations[1]); // Update to store location
}

function goCave() {
  update(locations[2]); // Update to cave location
}
//Function to buy health
function buyHealth() {
  if (gold >= 10) { // Check if the player has enough gold
    gold -= 10; // Deduct gold
    health += 10; // Increase health
    goldText.innerText = gold; // Update gold display
    healthText.innerText = health; // Update health display
  } else {
    text.innerText = "You do not have enough gold to buy health."; // Display message if not enough gold
  }
}
//Function to buy a weapon
function buyWeapon() { 
  if (currentWeapon < weapons.length - 1) { // Check if there is a more powerful weapon available
    if (gold >= 30) { // Check if the player has enough gold
      gold -= 30;// Deduct gold
      currentWeapon++; // Move to the next weapon
      goldText.innerText = gold; // Update gold display
      let newWeapon = weapons[currentWeapon].name; // Get the name of the new weapon
      text.innerText = "You now have a " + newWeapon + "."; // Display the new weapon message
      inventory.push(newWeapon); // Add the new weapon to the inventory
      text.innerText += " In your inventory you have: " + inventory; // Display the updated inventory
    } else {
      text.innerText = "You do not have enough gold to buy a weapon."; // Display message if not enough gold
    }
  } else {
    text.innerText = "You already have the most powerful weapon!"; // Display message if the player already has the best weapon
    button2.innerText = "Sell weapon for 15 gold"; // Change button text to sell weapon
    button2.onclick = sellWeapon; // Set button function to sell weapon
  }
}
//Function to sell a weapon
function sellWeapon() {
  if (inventory.length > 1) { // Check if there is more than one weapon in the inventory
    gold += 15; // Add gold for selling the weapon
    goldText.innerText = gold; // Update gold display
    let currentWeapon = inventory.shift(); // Remove the first weapon from the inventory
    text.innerText = "You sold a " + currentWeapon + "."; // Display the sold weapon message
    text.innerText += " In your inventory you have: " + inventory; // Display the updated inventory
  } else {
    text.innerText = "Don't sell your only weapon!"; // Display message if trying to sell the only weapon
  }
}

// Functions to initiate fights with different monsters
function fightSlime() {
  fighting = 0; // Set the current monster to slime
  goFight(); // Start the fight
}

function fightBeast() {
  fighting = 1; // Set the current monster to fanged beast
  goFight(); // Start the fight
}

function fightDragon() {
  fighting = 2; // Set the current monster to dragon
  goFight(); // Start the fight
}

//Function to set up the fight scene
function goFight() {
  update(locations[3]); // Update to fight location
  monsterHealth = monsters[fighting].health; // Set the monster's health
  monsterStats.style.display = "block"; // Show monster stats
  monsterName.innerText = monsters[fighting].name; // Display the monster's name
  monsterHealthText.innerText = monsterHealth; // Display the monster's health
}

//Function to handle attack action during a fight
function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks."; // Display monster's attack message
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + "."; // Display player's attack message
  health -= getMonsterAttackValue(monsters[fighting].level); // Reduce player's health by monster's attack value
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1; // Reduce monster's health by player's weapon power and random XP bonus   
  } else {
    text.innerText += " You miss."; // Display message if player misses the attack
  }
  healthText.innerText = health; // Update health display
  monsterHealthText.innerText = monsterHealth; // Update monster's health display
  if (health <= 0) {
    lose(); // Player loses if health drops to 0 or below
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame(); // Player wins the game if the dragon is defeated
    } else {
      defeatMonster(); // Player defeats the monster and gains rewards
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks."; // Random chance for weapon to break
    currentWeapon--; // Downgrade to previous weapon
  }
}

//Function to calculate monster attack value based on level
function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp)); // Calculate the attack value with random XP factor
  console.log(hit); // Log the attack value
  return hit > 0 ? hit : 0; // Return the attack value if positive, else return 0
}

//Function to determine if the player hits the monster
function isMonsterHit() {
  return Math.random() > .2 || health < 20; // 80% chance to hit or always hit if health is below 20
}

//Function to handle dodge action during a fight
function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name; // Display dodge message
}
//Function to handle the defeat of a monster
function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7); // Reward player with gold based on monster level
  xp += monsters[fighting].level; // Increase player's XP based on monster level
  goldText.innerText = gold; // Update gold display
  xpText.innerText = xp; // Update XP display
  update(locations[4]); // Update to kill monster location
}
//Function to handle losing the game
function lose() {
  update(locations[5]); // Update to lose location
}
//Function to handle winning the game
function winGame() {
  update(locations[6]); // Update to win location
}
//Function to restart the game
function restart() {
  xp = 0; // Reset player's XP
  health = 100; // Reset player's health
  gold = 50; // Reset player's gold
  currentWeapon = 0; // Reset player's weapon
  inventory = ["stick"]; // Reset player's inventory to initial state
  goldText.innerText = gold; // Update gold display
  healthText.innerText = health; // Update health display
  xpText.innerText = xp; // Update XP display
  goTown(); // Return to town square
}
// Function to trigger the easter egg
function easterEgg() {
  update(locations[7]); // Update to easter egg location
}
// Functions to pick numbers in the easter egg game (choice between 2 or 8)
function pickTwo() {
  pick(2); // Pick number 2
}

function pickEight() {
  pick(8); // Pick number 8
}
// Function to handle number picking and reward or penalty
function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11)); // Generate 10 random numbers between 0 and 10
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n"; // Display player's guess and random numbers
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n"; // Display each random number
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!"; // Player wins gold if guess matches any random number
    gold += 20; // Add gold to player's total
    goldText.innerText = gold; // Update gold display
  } else {
    text.innerText += "Wrong! You lose 10 health!"; // Player loses health if guess doesn't match
    health -= 10; // Deduct health from player's tota
    healthText.innerText = health; // Update health display
    if (health <= 0) {
      lose(); // Player loses if health drops to 0 or below
    }
  }
}