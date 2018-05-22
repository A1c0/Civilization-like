require('dotenv')
  .config({path: '/home/alexandre/WebstormProjects/TP-Batman/data.env'});

const chalk = require('chalk');
const chalkRainbow = require('chalk-rainbow');

const figlet = require('figlet');
const readlineSync = require('readline-sync');

const {Polis} = require('./app/polis');
const {Divinity} = require('./app/divinity');
const {Position} = require('./app/position');
const {Rider, LightSoldier, HeavySoldier} = require('./app/units');

console.log(chalkRainbow('Welcome in the game ...'));
console.log(chalkRainbow(figlet.textSync('CIVILIZATION   X !', {
  font: 'Standard',
  horizontalLayout: 'fitted',
  verticalLayout: 'default'
})));

const tempo = () => {
  return new Promise((resolve) =>{
    let finish = false;
    const time = setInterval(() => {
      if (finish) {
        resolve();
        clearInterval(time);
      }
      finish = true;
    }, 1000);
  });
};

const test = () => {
  let polis = new Polis('test1', new Divinity('test1'), new Position(1, 2));
  let polis2 = new Polis('test2', new Divinity('test2'), new Position(2, 3));
  let polis3 = new Polis('test3', new Divinity('test3'), new Position(3, 4));
  let polisTab = [];
  polisTab.push({id: 1, polis: polis});
  polisTab.push({id: 2, polis: polis2});
  polisTab.push({id: 3, polis: polis3});

  console.log(polisTab);
  let gamecounter = 0;

  while (gamecounter < 100) {
    if (gamecounter === 1) {
      for (let i in polisTab) {
        polisTab[i].polis.createRider();
      }
    }
    let finish = false;
    const time = setInterval(() => {
      if (finish) {
        for (let i in polisTab) {
          console.log(polisTab[i].polis.toString());
        }
        clearInterval(time);
      }
      finish = true;
    }, 1);
    console.log(chalkRainbow("Hey ho ça continue"));
    gamecounter++;
  }
};

//test();

const test2 = async () => {
  let polis = new Polis('test1', new Divinity('test1'), new Position(1, 2));
  let rider = new Rider();
  console.log(rider.toString());
  await polis.createRider();
  console.log(polis.toString());
};
//test2();

const gameLoop = async() => {
  const PlayersColor = [chalk.cyan, chalk.magenta, chalk.green, chalk.blue,
    chalk.yellow];

  let game = readlineSync.keyInYN('Do you want to do a game ? ');
  console.log(game);
  let players = [];
  let nbRound = 0;
  if (game) {
    const nbPlayer = readlineSync.keyIn('how many players will we be? <1-5>',
      {limit: '$<1-5>'});
    nbRound = readlineSync.keyIn('how many players will we be? <2-9>',
      {limit: '$<2-9>'});
    for (let i = 1; i <= nbPlayer; i++) {
      console.log('For Player ' + i);
      const name = readlineSync.question('May I have your name? ');
      const polisName = readlineSync.question(
        'May I have your Polis\'s name? ');
      const divinityName = readlineSync.question(
        'May I have your Divinity\'s name? ');
      const polis = new Polis(polisName,
        new Divinity(divinityName, process.env.TIME_FACTOR),
        new Position(Math.floor(Math.random() * 20),
          Math.floor(Math.random() * 20)));
      polis.init();
      const playerColor = PlayersColor[i];
      players.push({name: name, color: playerColor, polis: polis});
    }
    console.log(chalkRainbow('\nLET\'S BEGIN !'));
  }
  let roundCounter = 0;

  while (game && (roundCounter < nbRound)) {
    for (let i in players) {
      console.log(
        players[i].color('\nIt\'s the turn of ' + players[i].name + ' !!'));
      console.log(players[i].color(players[i].polis.toString()));
      const otherPlayer = players.filter(
        p => {
          return !(p.polis.name === players[i].polis.name);
        });
      const otherPolis = [];
      otherPlayer.forEach(p => {
        otherPolis.push(p.polis.name);
      });
      const TourChoice = [players[i].color('Buy Units'),
        players[i].color('Put defense units'),
        players[i].color('Do Trading'), players[i].color('Launch an attack'),
        players[i].color('Sell ​​resources'),
        players[i].color('STOP THE GAME')];
      let playerChoice = readlineSync.keyInSelect(TourChoice,
        players[i].color('What do you want to do ?'));
      let numInt;
      playerChoice++;

      switch (playerChoice) {
        case 1: {
          console.log(
            players[i].color('How many Rider do you want to buy (cost: ' +
              Rider.cornCost + ' corn and ' + Rider.goldCost + ' gold) ? '));
          let numRider =
            readlineSync.questionInt(players[i].color('Enter a number :'),
              'limitMessage');
          for (let i = 0; i < numInt; i++) {
            await players[i].polis.numHeavySoldier();
          }
          console.log(
            players[i].color('How many Light Soldier do you want to buy (cost : ' +
              LightSoldier.cornCost + ' corn and ' + LightSoldier.goldCost +
              ' gold) ? '));
          let numLightSoldier =
            readlineSync.questionInt(players[i].color('Enter a number :'),
              'limitMessage');
          for (let i = 0; i < numInt; i++) {
            await players[i].polis.numHeavySoldier();
          }
          console.log(
            players[i].color('How many Heavy Soldier do you want to buy (cost : ' +
              HeavySoldier.cornCost + ' corn and ' + HeavySoldier.goldCost +
              ' gold) ? '));
          let numHeavySoldier =
            readlineSync.questionInt(players[i].color('Enter a number :'),
              'limitMessage');
          for (let i = 0; i < numInt; i++) {
            await players[i].polis.numHeavySoldier();
          }
          break;
        }
        case 2: {
          console.log(
            players[i].color(
              'How many Rider do you want to put in defense ? '));
          const numR = readlineSync.questionInt(
            players[i].color('Enter a number :'),
            'limitMessage');
          console.log(numR);
          console.log(players[i].color(
            'How many Light Soldier do you want to put in defense ? '));
          const numL = readlineSync.questionInt(
            players[i].color('Enter a number :'),
            'limitMessage');
          console.log(numL);
          console.log(players[i].color(
            'How many Heavy Soldier do you want to put in defense ? '));
          const numH = readlineSync.questionInt(
            players[i].color('Enter a number :'),
            'limitMessage');
          console.log(numH);
          players[i].polis.setDefenseTroop(numL, numH, numR);
          break;
        }
        case 3: {
          console.log(
            players[i].color(
              'How ɱany corn do you want to put in this trade ? '));
          const numCorn = readlineSync.questionInt(
            players[i].color('Enter a number :'),
            'limitMessage');
          console.log(numCorn);
          console.log(
            players[i].color(
              'How ɱany gold do you want to put in this trade ? '));
          const numGold = readlineSync.questionInt(
            players[i].color('Enter a number :'),
            'limitMessage');
          console.log(numGold);
          const polisTrade = readlineSync.keyInSelect(otherPolis,
            players[i].color(
              'Which city do you want to do business with?'));
          players[i].polis.doTradeWith(otherPlayer[polisTrade].polis);
          break;
        }
        case 4: {
          const polisattack = readlineSync.keyInSelect(otherPolis,
            players[i].color(
              'Which city do you want to do attack?'));
          // Console.log(otherPlayer[polisattack]);
          const enemyI = players.findIndex(pl => {
            return (pl.name === otherPlayer[polisattack].name && pl.color ===
              otherPlayer[polisattack].color);
          });
          // Console.log(players[enemyI]);
          players[i].polis.attackOtherPolis(players[enemyI].polis);
          break;
        }
        case 5: {
          const polisResource = readlineSync.keyInSelect(
            [(players[i].color('Corn')), players[i].color('Gold')],
            players[i].color('Which resource?'));

          switch (polisResource) {
            case 0:
              console.log(players[i].color('How many? '));
              numInt =
                readlineSync.questionInt(players[i].color('Enter a number :'),
                  'limitMessage');
              players[i].polis.sellCorn(numInt);
              break;
            case 1:
              console.log(players[i].color('How many? '));
              numInt =
                readlineSync.questionInt(players[i].color('Enter a number :'),
                  'limitMessage');
              players[i].polis.sellGold(numInt);
              break;
            default:
              break;
          }
          break;
        }
        case 6: {
          game = false;
          break;
        }
        default: {
          break;
        }
      }
    }
    //await tempo();
    roundCounter++;
  }

  console.log(chalkRainbow('\n  END OF GAME\n\n'));
  console.log(chalkRainbow('Score:'));
  players.forEach(player => {
    let score = player.polis.corn + (player.polis.gold * 100);
    score += (player.polis.unitList.length * 10);
    console.log(player.color(player.name + ': ' + score));
  });
  console.log(chalkRainbow('\nHope to see you soon'));
  process.exit(0);
};
gameLoop();


