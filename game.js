// Constants for hero and monster types
const HEROES = {
  KNIGHT: "Nameless Knight",
  CAT: "The Cat",
  ARCHER: "Julia the Archer",
  HEALER: "William the Healer",
  LUMBERJACK: "Jack the Lumberjack"
};

const MONSTERS = {
  BOSS: "Big Boss",
  SLIME: "Slime",
  BAT: "Bat"
};

// Initialize hero and monster health points
const heroHealth = {
  [HEROES.KNIGHT]: 100,
  [HEROES.CAT]: 100,
  [HEROES.ARCHER]: 100
};

const monsterHealth = {
  [MONSTERS.BOSS]: 200,
  [MONSTERS.SLIME]: 50,
  [MONSTERS.BAT]: 50
};

// Function to simulate an attack
function performHeroAttack(hero) {
  const randomMonster = getRandomMonster();
  const damage = Math.floor(Math.random() * 21); // Random damage between 0 and 20
  monsterHealth[randomMonster] -= damage;
  logAttack(hero, randomMonster, damage);

}

// Function to simulate the boss's attack
function performBossAttack() {
  const heroes = Object.keys(heroHealth);
  const randomHero = heroes[Math.floor(Math.random() * heroes.length)];
  const damage = Math.floor(Math.random() * 21); // Random damage between 0 and 20
  heroHealth[randomHero] -= damage;
  logAttack(MONSTERS.BOSS, randomHero, damage);
}

// Function to log an attack
function logAttack(attacker, target, damage) {
  const outputDiv = document.getElementById("output-div");
  outputDiv.innerHTML += `<p>${attacker} attacks ${target} and deals ${damage} damage.</p>`;
}

// Function to get a random monster
function getRandomMonster() {
  const monsters = [MONSTERS.BOSS, MONSTERS.SLIME, MONSTERS.BAT];
  return monsters[Math.floor(Math.random() * monsters.length)];
}

  
  // Julia the Archer's arrows count
  let juliaArrows = 5;
  
  // Big Boss transformation flag
  let isBigBossTransformed = false;
  
  // Flag to indicate if Slime or Bat has appeared
let isAppearingMonster = false;

// Function to handle the appearance of Slime or Bat
function handleAppearingMonster() {
  if (!isAppearingMonster && Math.random() <= 0.25) {
    const appearingMonster = getRandomMonster();

    if (appearingMonster === MONSTERS.SLIME) {
      document.getElementById("appearing-monster").src = "slime.png";
      document.getElementById("appearing-monster").alt = "Slime";
    } else if (appearingMonster === MONSTERS.BAT) {
      document.getElementById("appearing-monster").src = "bat.png";
      document.getElementById("appearing-monster").alt = "Bat";
    }

    isAppearingMonster = true;
    logAttack(appearingMonster, "appears!");

    // The three heroes can only attack Slime or Bat while it's there
    namelessKnight.removeEventListener("click", performHeroAttack);
    theCat.removeEventListener("click", performHeroAttack);
    juliaTheArcher.removeEventListener("click", performHeroAttack);

    // Remove boss attack during Slime or Bat appearance
    bossAttackInterval && clearInterval(bossAttackInterval);
  }
}

// Function to remove Slime or Bat
function removeAppearingMonster() {
  isAppearingMonster = false;
  document.getElementById("appearing-monster").style.display = "none";

  // Re-enable hero attacks
  namelessKnight.addEventListener("click", () => performHeroAttack(HEROES.KNIGHT));
  theCat.addEventListener("click", () => performHeroAttack(HEROES.CAT));
  juliaTheArcher.addEventListener("click", () => performHeroAttack(HEROES.ARCHER));

  // Re-enable boss attack
  bossAttackInterval = setInterval(performBossAttack, 2000);
}

// Modify the performHeroAttack function to account for hero-specific attacks
function performHeroAttack(hero) {
  if (isAppearingMonster) {
    // The three heroes can only attack Slime or Bat during their appearance
    const appearingMonster = document.getElementById("appearing-monster").alt;
    if (
      (hero === HEROES.KNIGHT && appearingMonster === "Big Boss") ||
      (hero === HEROES.ARCHER && appearingMonster === "Bat") ||
      (hero === HEROES.CAT && appearingMonster === "Slime")
    ) {
      const damage = Math.floor(Math.random() * 21);
      monsterHealth[appearingMonster] -= damage;
      logAttack(hero, appearingMonster, damage);
    } else {
      logAttack(hero, appearingMonster, "has no effect!");
    }
  } else if (isBigBossTransformed && hero !== HEROES.KNIGHT) {
    // Big Boss takes 10% less damage when transformed
    const damage = Math.floor(Math.random() * 21) * 0.9;
    monsterHealth[MONSTERS.BOSS] -= damage;
    logAttack(hero, MONSTERS.BOSS, damage);
  } else {
    const randomMonster = getRandomMonster();
    const damage = Math.floor(Math.random() * 21);
    if (
      (hero === HEROES.KNIGHT && randomMonster === MONSTERS.BOSS) ||
      (hero === HEROES.ARCHER && randomMonster === MONSTERS.BAT) ||
      (hero === HEROES.CAT && randomMonster === MONSTERS.SLIME)
    ) {
      // Hero-specific attacks
      monsterHealth[randomMonster] -= damage;
      logAttack(hero, randomMonster, damage);
    } else {
      logAttack(hero, randomMonster, "has no effect!");
    }

    handleAppearingMonster(); // Handle appearance after hero's attack
  }

  // Check for victory or loss
  checkGameStatus();
}

  
  // Function to handle Julia the Archer's arrow crafting
  function craftArrows() {
    if (juliaArrows < 5) {
      juliaArrows++;
      logAttack(HEROES.LUMBERJACK, HEROES.ARCHER, "crafted an arrow.");
    }
  }
  
  // Function to handle William the Healer's healing
  function performHealing() {
    const heroes = Object.keys(heroHealth);
    const randomHero = heroes[Math.floor(Math.random() * heroes.length)];
    const healAmount = Math.floor(Math.random() * 21);
    heroHealth[randomHero] += healAmount;
    if (heroHealth[randomHero] > 100) {
      heroHealth[randomHero] = 100; // Ensure health doesn't exceed 100
    }
    logAttack(HEROES.HEALER, randomHero, `healed ${randomHero} for ${healAmount} HP.`);
  }
  
  // Function to check for victory or loss
  function checkGameStatus() {
    if (monsterHealth[MONSTERS.BOSS] <= 0) {
      document.getElementById("output-div").innerHTML += "<p>You Won!</p>";
    } else {
      let isAnyHeroAlive = false;
      for (const hero in heroHealth) {
        if (heroHealth[hero] > 0) {
          isAnyHeroAlive = true;
          break;
        }
      }
      if (!isAnyHeroAlive) {
        document.getElementById("output-div").innerHTML += "<p>You Lost!</p>";
      }
    }
  }
  
  // Event listeners for hero attacks
  const namelessKnight = document.getElementById("nameless-knight");
  namelessKnight.addEventListener("click", () => performHeroAttack(HEROES.KNIGHT));
  
  const theCat = document.getElementById("the-cat");
  theCat.addEventListener("click", () => performHeroAttack(HEROES.CAT));
  
  const juliaTheArcher = document.getElementById("julia-the-archer");
  juliaTheArcher.addEventListener("click", () => {
    if (juliaArrows > 0) {
      juliaArrows--;
      performHeroAttack(HEROES.ARCHER);
    } else {
      logAttack(HEROES.ARCHER, "No arrows left!");
    }
  });
  
  const williamTheHealer = document.getElementById("william-the-healer");
  williamTheHealer.addEventListener("click", performHealing);
  
  const jackTheLumberjack = document.getElementById("jack-the-lumberjack");
  jackTheLumberjack.addEventListener("click", craftArrows);
  
  // Check game status after a short delay
  setInterval(checkGameStatus, 1000);


// Function to handle Big Boss transformation
function transformBigBoss() {
    if (monsterHealth[MONSTERS.BOSS] / 200 < 0.2) {
      isBigBossTransformed = true;
      logAttack(MONSTERS.BOSS, "transforms into a bigger boss.");
    }
  }
  
  // Use setTimeout for introducing a delay in attacks
  function delayedBossAttack() {
    setTimeout(performBossAttack, Math.floor(Math.random() * 3000) + 1000);
  }
  
  // Add custom functionality (for example, Jack's special attack)
  function performCustomFunctionality(hero) {
    if (hero === HEROES.LUMBERJACK) {
      const damage = Math.floor(Math.random() * 51); // Random damage between 0 and 50
      const randomMonster = getRandomMonster();
      monsterHealth[randomMonster] -= damage;
      logAttack(hero, randomMonster, damage);
    }
  }
  
  // Event listener for the custom functionality
  const customFunctionalityBtn = document.getElementById("custom-functionality-button");
  customFunctionalityBtn.addEventListener("click", () => performCustomFunctionality(HEROES.LUMBERJACK));
  
  // Check for victory or loss with a custom win condition
  function checkGameStatus() {
    if (monsterHealth[MONSTERS.BOSS] <= 0 && !isBigBossTransformed) {
      document.getElementById("output-div").innerHTML += "<p>You Won!</p>";
    } else {
      let isAnyHeroAlive = false;
      for (const hero in heroHealth) {
        if (heroHealth[hero] > 0) {
          isAnyHeroAlive = true;
          break;
        }
      }
      if (!isAnyHeroAlive) {
        document.getElementById("output-div").innerHTML += "<p>You Lost!</p>";
      }
    }
  }
  
  // Event listener for Big Boss transformation
  transformBigBoss(); // Start checking for transformation
  setInterval(transformBigBoss, 5000); // Check every 5 seconds
  
  // Event listener to introduce a delay in Big Boss and baddies' attacks
  setInterval(delayedBossAttack, 2000); // Introduce delay every 2 seconds
  
  
  
  