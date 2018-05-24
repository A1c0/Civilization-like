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

const gameLoop = async () => {
  const PlayersColor = [chalk.cyan, chalk.magenta, chalk.green, chalk.blue,
    chalk.yellow];

  let game = readlineSync.keyInYN('Do you want to do a game ? ');
  console.log(game);
  const players = [];
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
      players.push({name, color: playerColor, polis});
    }
    console.log(chalkRainbow('\nLET\'S BEGIN !'));
  }
  let roundCounter = 0;

  while (game && (roundCounter < nbRound)) {
    players.forEach(player => {
      console.log(
        player.color('\nIt\'s the turn of ' + player.name + ' !!'));
      console.log(player.color(player.polis.toString()));
      const otherPlayer = players.filter(
        p => {
          return !(p.polis.name === player.polis.name);
        });
      const otherPolis = [];
      otherPlayer.forEach(p => {
        otherPolis.push(p.polis.name);
      });
      const TourChoice = [player.color('Buy Units'),
        player.color('Put defense units'),
        player.color('Do Trading'), player.color('Launch an attack'),
        player.color('Sell ​​resources'),
        player.color('STOP THE GAME')];
      let playerChoice = readlineSync.keyInSelect(TourChoice,
        player.color('What do you want to do ?'));
      let numInt;
      playerChoice++;

      switch (playerChoice) {
        case 1: {
          console.log(
            player.color('How many Rider do you want to buy (cost: ' +
              Rider.cornCost + ' corn and ' + Rider.goldCost + ' gold) ? '));
          const numRider =
            readlineSync.questionInt(player.color('Enter a number :'),
              'limitMessage');
          for (let i = 0; i < numRider; i++) {
            player.polis.numHeavySoldier();
          }
          console.log(
            player.color('How many Light Soldier do you want to buy (cost :' +
              LightSoldier.cornCost + ' corn and ' + LightSoldier.goldCost +
              ' gold) ? '));
          const numLightSoldier =
            readlineSync.questionInt(player.color('Enter a number :'),
              'limitMessage');
          for (let i = 0; i < numLightSoldier; i++) {
            player.polis.numHeavySoldier();
          }
          console.log(
            player.color('How many Heavy Soldier do you want to buy (cost :' +
              HeavySoldier.cornCost + ' corn and ' + HeavySoldier.goldCost +
              ' gold) ? '));
          const numHeavySoldier =
            readlineSync.questionInt(player.color('Enter a number :'),
              'limitMessage');
          for (let i = 0; i < numHeavySoldier; i++) {
            player.polis.numHeavySoldier();
          }
          break;
        }
        case 2: {
          console.log(
            player.color(
              'How many Rider do you want to put in defense ? '));
          const numR = readlineSync.questionInt(
            player.color('Enter a number :'),
            'limitMessage');
          console.log(numR);
          console.log(player.color(
            'How many Light Soldier do you want to put in defense ? '));
          const numL = readlineSync.questionInt(
            player.color('Enter a number :'),
            'limitMessage');
          console.log(numL);
          console.log(player.color(
            'How many Heavy Soldier do you want to put in defense ? '));
          const numH = readlineSync.questionInt(
            player.color('Enter a number :'),
            'limitMessage');
          console.log(numH);
          player.polis.setDefenseTroop(numL, numH, numR);
          break;
        }
        case 3: {
          console.log(
            player.color(
              'How ɱany corn do you want to put in this trade ? '));
          const numCorn = readlineSync.questionInt(
            player.color('Enter a number :'),
            'limitMessage');
          console.log(numCorn);
          console.log(
            player.color(
              'How ɱany gold do you want to put in this trade ? '));
          const numGold = readlineSync.questionInt(
            player.color('Enter a number :'),
            'limitMessage');
          console.log(numGold);
          const polisTrade = readlineSync.keyInSelect(otherPolis,
            player.color(
              'Which city do you want to do business with?'));
          player.polis.doTradeWith(otherPlayer[polisTrade].polis);
          break;
        }
        case 4: {
          const polisattack = readlineSync.keyInSelect(otherPolis,
            player.color(
              'Which city do you want to do attack?'));
          // Console.log(otherPlayer[polisattack]);
          const enemyI = players.findIndex(pl => {
            return (pl.name === otherPlayer[polisattack].name && pl.color ===
              otherPlayer[polisattack].color);
          });
          // Console.log(players[enemyI]);
          player.polis.attackOtherPolis(players[enemyI].polis);
          break;
        }
        case 5: {
          const polisResource = readlineSync.keyInSelect(
            [(player.color('Corn')), player.color('Gold')],
            player.color('Which resource?'));

          switch (polisResource) {
            case 0:
              console.log(player.color('How many? '));
              numInt =
                readlineSync.questionInt(player.color('Enter a number :'),
                  'limitMessage');
              player.polis.sellCorn(numInt);
              break;
            case 1:
              console.log(player.color('How many? '));
              numInt =
                readlineSync.questionInt(player.color('Enter a number :'),
                  'limitMessage');
              player.polis.sellGold(numInt);
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
    });
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
};
gameLoop();

