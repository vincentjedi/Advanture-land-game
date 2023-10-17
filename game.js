// Get references to the characters and monsters
const heroes = [document.getElementById("nameless-knight"), document.getElementById("the-cat"), document.getElementById("julia-the-archer")];
const namelessKnightHPDiv = document.getElementById("nameless-knight-hp-div");
const theCatHPDiv = document.getElementById("the-cat-hp-div");
const juliaTheArcherHPDiv = document.getElementById("julia-the-archer-hp-div");
const bigBossHPDiv = document.getElementById("big-boss-hp-div");
const appearingMonster = document.getElementById("appearing-monster");
const williamTheHealer = document.getElementById("william-the-healer");
const jackTheLumberjack = document.getElementById("jack-the-lumberjack");

// Initialize HP values
let namelessKnightHP = 100;
let theCatHP = 100;
let juliaTheArcherHP = 100;
let bigBossHP = 100;
let appearingMonsterHP = 50;
let isSlimeOrBatPresent = false;
let juliaArrows = 10; // Julia's initial number of arrows

// Update life bars
updateLifeBars();

// Add click event listeners to heroes for attacking
for (const hero of heroes) {
    hero.addEventListener("click", () => {
        if (isSlimeOrBatPresent) {
            attackSlimeOrBat(hero);
        } else {
            attackBigBoss(hero);
            setTimeout(() => {
                if (Math.random() <= 0.25) {
                    showAppearingMonster();
                }
                bigBossAttack();
            }, 1000);
        }
    });
}

// Add click event listener to William the Healer to heal heroes
williamTheHealer.addEventListener("click", () => {
    if (isSlimeOrBatPresent) {
        const outputDiv = document.getElementById("output-div");
        outputDiv.innerHTML += `<p class="message">William the Healer can't heal while the Slime or Bat is present!</p>`;
    } else {
        healHeroes();
    }
});

// Add click event listener to Jack the Lumberjack to provide arrows for Julia
jackTheLumberjack.addEventListener("click", () => {
    if (juliaArrows < 10) {
        juliaArrows += 5; // Jack provides 5 arrows
        const outputDiv = document.getElementById("output-div");
        outputDiv.innerHTML += `<p class="message arrow">Jack the Lumberjack provided 5 arrows to Julia. Julia now has ${juliaArrows} arrows.</p>`;
    }
});

// Function for Nameless Knight to attack Big Boss
function attackBigBoss(hero) {
    if (hero === heroes[0]) {
        const damage = Math.floor(Math.random() * 30) + 10;
        bigBossHP -= damage;
        if (bigBossHP < 0) {
            bigBossHP = 0;
        }
        bigBossHPDiv.style.width = bigBossHP + "%";
        const outputDiv = document.getElementById("output-div");
        outputDiv.innerHTML += `<p class="message attack">${hero.id} attacked Big Boss for ${damage} damage!</p>`;
        if (bigBossHP === 0) {
            outputDiv.innerHTML += `<p class="message attack">${hero.id} defeated Big Boss!</p>`;
        }
    } else {
        const outputDiv = document.getElementById("output-div");
        outputDiv.innerHTML += `<p class="message">${hero.id} can't attack Big Boss!</p>`;
    }
    updateLifeBars();
}

// Function for Julia the Archer to attack Bat
function attackBat(hero) {
    if (hero === heroes[2]) {
        const damage = Math.floor(Math.random() * 20) + 5;
        appearingMonsterHP -= damage;
        if (appearingMonsterHP < 0) {
            appearingMonsterHP = 0;
        }
        appearingMonsterHPDiv.style.width = appearingMonsterHP + "%";
        const outputDiv = document.getElementById("output-div");
        outputDiv.innerHTML += `<p class="message attack">${hero.id} attacked the Bat for ${damage} damage!</p>`;
        if (appearingMonsterHP === 0) {
            outputDiv.innerHTML += `<p class="message attack">${hero.id} defeated the Bat!</p>`;
            isSlimeOrBatPresent = false;
            appearingMonster.src = "";
        }
    } else {
        const outputDiv = document.getElementById("output-div");
        outputDiv.innerHTML += `<p class="message">${hero.id} can't attack the Bat!</p>`;
    }
    updateLifeBars();
}

// Function for The Cat to attack Slime
function attackSlime(hero) {
    if (hero === heroes[1]) {
        const damage = Math.floor(Math.random() * 20) + 5;
        appearingMonsterHP -= damage;
        if (appearingMonsterHP < 0) {
            appearingMonsterHP = 0;
        }
        appearingMonsterHPDiv.style.width = appearingMonsterHP + "%";
        const outputDiv = document.getElementById("output-div");
        outputDiv.innerHTML += `<p class="message attack">${hero.id} attacked the Slime for ${damage} damage!</p>`;
        if (appearingMonsterHP === 0) {
            outputDiv.innerHTML += `<p class="message attack">${hero.id} defeated the Slime!</p>`;
            isSlimeOrBatPresent = false;
            appearingMonster.src = "";
        }
    } else {
        const outputDiv = document.getElementById("output-div");
        outputDiv.innerHTML += `<p class="message">${hero.id} can't attack the Slime!</p>`;
    }
    updateLifeBars();
}

// Function for Big Boss to make a random attack on a hero
function bigBossAttack() {
    if (bigBossHP > 0) {
        const randomHero = heroes[Math.floor(Math.random() * heroes.length)];
        const heroDamage = Math.floor(Math.random() * 30) + 10;

        if (randomHero === heroes[0]) {
            namelessKnightHP -= heroDamage;
            namelessKnightHPDiv.style.width = namelessKnightHP + "%";
        } else if (randomHero === heroes[1]) {
            theCatHP -= heroDamage;
            theCatHPDiv.style.width = theCatHP + "%";
        } else {
            juliaTheArcherHP -= heroDamage;
            juliaTheArcherHPDiv.style.width = juliaTheArcherHP + "%";
        }

        const outputDiv = document.getElementById("output-div");
        outputDiv.innerHTML += `<p class="message attack">Big Boss attacked ${randomHero.id}, and ${randomHero.id} lost ${heroDamage}hp!</p>`;

        if (namelessKnightHP <= 0 || theCatHP <= 0 || juliaTheArcherHP <= 0) {
            outputDiv.innerHTML += `<p class="message attack">Big Boss defeated ${randomHero.id}!</p>`;
        }
    }
    updateLifeBars();
}

// Function to show a Slime or Bat with 25% probability
function showAppearingMonster() {
    if (Math.random() <= 0.25) {
        isSlimeOrBatPresent = true;
        const randomMonster = Math.random() <= 0.5 ? "slime.png" : "bat.png";
        appearingMonster.src = randomMonster;
        appearingMonster.alt = randomMonster === "slime.png" ? "Slime" : "Bat";
        appearingMonsterHP = 50;
        appearingMonsterHPDiv.style.width = appearingMonsterHP + "%";
    }
}

// Function to update life bars
function updateLifeBars() {
    namelessKnightHPDiv.style.width = namelessKnightHP + "%";
    theCatHPDiv.style.width = theCatHP + "%";
    juliaTheArcherHPDiv.style.width = juliaTheArcherHP + "%";
    bigBossHPDiv.style.width = bigBossHP + "%";
}

// Function to simulate healing by William the Healer
function healHeroes() {
    const outputDiv = document.getElementById("output-div");
    let healed = false;

    for (const hero of heroes) {
        if (Math.random() <= 0.5) { // 50% chance of healing each hero
            const healAmount = Math.floor(Math.random() * 20) + 10;
            if (hero === heroes[0]) {
                namelessKnightHP += healAmount;
                if (namelessKnightHP > 100) {
                    namelessKnightHP = 100;
                }
                namelessKnightHPDiv.style.width = namelessKnightHP + "%";
                outputDiv.innerHTML += `<p class="message heal">William the Healer healed ${hero.id} for ${healAmount}hp!</p>`;
                healed = true;
            } else if (hero === heroes[1]) {
                theCatHP += healAmount;
                if (theCatHP > 100) {
                    theCatHP = 100;
                }
                theCatHPDiv.style.width = theCatHP + "%";
                outputDiv.innerHTML += `<p class="message heal">William the Healer healed ${hero.id} for ${healAmount}hp!</p>`;
                healed = true;
            } else if (hero === heroes[2]) {
                juliaTheArcherHP += healAmount;
                if (juliaTheArcherHP > 100) {
                    juliaTheArcherHP = 100;
                }
                juliaTheArcherHPDiv.style.width = juliaTheArcherHP + "%";
                outputDiv.innerHTML += `<p class="message heal">William the Healer healed ${hero.id} for ${healAmount}hp!</p>`;
                healed = true;
            }
        }
    }

    if (!healed) {
        outputDiv.innerHTML += `<p class="message">William the Healer couldn't heal any heroes this time.</p>`;
    }
}

// Function to check and update Big Boss's state
function checkBigBossState() {
    if (bigBossHP < 20) {
        // Big Boss becomes bigger and takes 10% less damage
        bigBossSizeMultiplier = 1.2;
        bigBossTakesLessDamage = true;
    }
}

// Function to display victory message
function displayVictory() {
    const outputDiv = document.getElementById("output-div");
    outputDiv.innerHTML += `<p class="message victory">You won!</p>`;
}

// Function to display loss message
function displayLoss() {
    const outputDiv = document.getElementById("output-div");
    outputDiv.innerHTML += `<p class="message loss">You lost!</p>`;
}

// Custom Functionality: Display a welcome message with a delay
setTimeout(() => {
    const outputDiv = document.getElementById("output-div");
    outputDiv.innerHTML += `<p class="message">Welcome to the AdventureLand - Final Boss Battle!</p>`;
}, 2000); // Display the welcome message after a 2-second delay

// Function to delay Big Boss's attack by 1-3 seconds
function delayBigBossAttack() {
    setTimeout(() => {
        if (bigBossHP > 0) {
            const randomHero = heroes[Math.floor(Math.random() * heroes.length)];
            const heroDamage = Math.floor(Math.random() * 30) + 10;

            if (randomHero === heroes[0]) {
                namelessKnightHP -= heroDamage;
                namelessKnightHPDiv.style.width = namelessKnightHP + "%";
            } else if (randomHero === heroes[1]) {
                theCatHP -= heroDamage;
                theCatHPDiv.style.width = theCatHP + "%";
            } else {
                juliaTheArcherHP -= heroDamage;
                juliaTheArcherHPDiv.style.width = juliaTheArcherHP + "%";
            }

            const outputDiv = document.getElementById("output-div");
            outputDiv.innerHTML += `<p class="message attack">Big Boss attacked ${randomHero.id}, and ${randomHero.id} lost ${heroDamage}hp!</p>`;

            if (namelessKnightHP <= 0 || theCatHP <= 0 || juliaTheArcherHP <= 0) {
                outputDiv.innerHTML += `<p class="message attack">Big Boss defeated ${randomHero.id}!</p>`;
            }
        }
        updateLifeBars();
    }, Math.floor(Math.random() * 3000) + 1000); // Delay the attack by 1-3 seconds
}

// Custom Functionality: Display a cool tip with a delay
setTimeout(() => {
    const outputDiv = document.getElementById("output-div");
    outputDiv.innerHTML += `<p class="message">Cool Tip: Click on William the Healer to heal your heroes when needed!</p>`;
}, 6000); // Display the cool tip after a 6-second delay
