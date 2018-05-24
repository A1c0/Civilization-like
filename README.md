# TP : Civilization-like #
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)

## Welcome to the project page for our civ-like game ##

### Team : ###
* Alexandre Contassot [@alexConts][@alexConts]
* Nathan Laporte [@Sysmetryx][@Sysmetryx]
* Raphael Pastre [@Raphiqui][@Raphiqui]

![img1](http://www.image-heberg.fr/files/15270106451558820285.png)
![img2](http://www.image-heberg.fr/files/1527010731241712782.png)

### **Summary** ###

1. [Goal][Goal]
2. [Setup Guide][Setup]
    1. [Install][Install]
    2. [Play][Play]
    3. [Environment variables][Environment]
3. [Gameplay][Gameplay]
    1. [The divinity][Divinity]
    2. [The polis][Polis]
    3. [The units][Units]
4. [More][More]


### 1 - Goal

The game should consist in a multiplayer mode. the different player controls a city in ancient Greece. Each city is linked to a Divinity and has two main ressources :
##
* Corn
* Gold
##
Moreover, each city has units that will be used for attack and defense.

Each Divinity needs its followers to make offerings, which can contains either **gold**, **corn**, or both.
Please your God, and it will act kindly towards your city.
Every once in a while a special event called **Benediction** might happen. This will give you bonuses to ressources.
On the other hand, your god might treat you with contempt, and a **Retribution** will happen, which will most likely scar your city.

If you fail to please your god, it will wrath the earth.

### 2 - Setup Guide

#### I. Install :
To install this game:
```shell
git clone https://github.com/alexConts/Civilization-like.git
cd Civilization-like
yarn
```

#### II. Play :
```shell
yarn start
```

#### III. Environment variables
The program uses dotenv, and need an *.env* file at the root of the project. Here is an exemple :
```dotenv
TIME_FACTOR = 1
INTEREST = 0.1
DAILY_EARNING_CORN = 100
DAILY_EARNING_GOLD = 1
```

### 3. Gameplay

#### I. The Divinity
A divinity coud help th city with different action. Indeed, it could by flavor, give to your city some gold and corn

#### II. The Polis
Each player have his own city where he could :
* buy different type of units
* put some of them in defense
* to a trade with another city to earn corns and golds
*  launch an attack to another city and maybe win 70% of its ressources
* sell corn to earn gold and vice versa

#### III. The Units
There are three types of units:
* Rider
* Light Soldier
* Heavy Soldier
Each unit have its own attack value, attack speed and HP. The cost of each kind of units is not the same.

### 4. More
We use TDD to realise our project. You can check this out :
```shell
yarn test
```
Our code also is xo verified but you can check this out  with this commande:
```shell
xo
```


[@alexConts]: https://github.com/alexConts
[@Sysmetryx]: https://github.com/Sysmetryx
[@Raphiqui]: https://github.com/Raphiqui
[Goal]: https://github.com/alexConts/Civilization-like#1---goal
[Setup]: https://github.com/alexConts/Civilization-like#2---setup-guide
[Install]: https://github.com/alexConts/Civilization-like#a---install-
[Play]: https://github.com/alexConts/Civilization-like#b---play-
[Environment]: https://github.com/alexConts/Civilization-like#c---environment-variables
[Gameplay]: https://github.com/alexConts/Civilization-like#3---gameplay
[Divinity]: https://github.com/alexConts/Civilization-like#i-the-divinity
[Polis]: https://github.com/alexConts/Civilization-like#ii-the-polis
[Units]: https://github.com/alexConts/Civilization-like#iii-the-units
[More]: https://github.com/alexConts/Civilization-like#4-more
