let toys = 0;

class Upgrade {
  constructor(startingCost, amount) {
    this._startingCost = startingCost;
    this._amount = amount;
    this._startingAmount = amount;
  }
  getCost() {
    return ((this._amount+1) * this._startingCost);
  }
  buy() {
    if (toys >= this.getCost()) {
      toys -= this.getCost();
      this._amount++;
      update();
    }
  }
  reset() {
    this._amount = this._startingAmount;
  }
  set amount (amount) { this._amount = amount }
  get amount ()       { return this._amount   }
}

let mMultiplier = new Upgrade(100, 1);
let mClickUpgrade = new Upgrade(20, 1);
let mAutoClicker = new Upgrade(12, 0);
let mToyShop = new Upgrade(50, 0);
let mToyFactory = new Upgrade(1000, 0);

let lockedUpgrades = [
  mMultiplier,
  mClickUpgrade,
  mAutoClicker,
  mToyShop,
  mToyFactory
]


window.onbeforeunload = save;
window.onload = load;

function update() {
  document.getElementById("toyCounter").textContent = toys;
  document.title = "Toy Clicker - " + toys;

  document.getElementById("toysPerSecond").textContent = "You are gaining " + getToysPerSecond() + " Toys Per Second";

  document.getElementById("amountAutoClicker").innerHTML = `You Own ${mAutoClicker.amount} Auto Clickers`;
  document.getElementById("costAutoClicker").innerHTML = mAutoClicker.getCost() + " Toys";

  document.getElementById("amountClick").innerHTML = "You Own " + (mClickUpgrade.amount-1) + " Click Upgrades";
  document.getElementById("costClick").innerHTML = mClickUpgrade.getCost() + " Toys";

  document.getElementById("costMultiplier").innerHTML = mMultiplier.getCost() + " Toys";
  document.getElementById("amountMultiplier").innerHTML = "x" + (mMultiplier.amount+1);
  document.getElementById("currentMultiplier").innerHTML = `Your Current Multiplier is x${mMultiplier.amount}`;

  document.getElementById("amountToyShop").innerHTML = `You Own ${mToyShop.amount} Toy Shops`;
  document.getElementById("costToyShop").innerHTML = mToyShop.getCost() + " Toys";

  document.getElementById("amountToyFactory").innerHTML = `You Own ${mToyFactory.amount} Toy Factories`;
  document.getElementById("costToyFactory").innerHTML = mToyFactory.getCost() + " Toys";
}

function timer() {
  toys += mAutoClicker.amount*mMultiplier.amount;
  toys += (mToyShop.amount*2)*mMultiplier.amount;
  toys += (mToyFactory.amount*3)*mMultiplier.amount;
  update();
}

//Calls timer every second
setInterval(timer, 1000);

//Adds 1 toy and updates counter on page
function addToy() {
  toys += mClickUpgrade.amount;
  update();
}

//Saves data to localStorage
function save() {
  localStorage.setItem("toys", toys);
  localStorage.setItem("click", mClickUpgrade.amount);
  localStorage.setItem("autoClicker", mAutoClicker.amount);
  localStorage.setItem("multiplier", mMultiplier.amount);
  localStorage.setItem("toyShop", mToyShop.amount);
  localStorage.setItem("toyFactory", mToyFactory.amount);
}

//Loads data from localStorage and updates counters
function load() {
  toys = parseInt(localStorage.getItem("toys"));
  mClickUpgrade.amount = parseInt(localStorage.getItem("click"));
  mAutoClicker.amount = parseInt(localStorage.getItem("autoClicker"));
  mMultiplier.amount = parseInt(localStorage.getItem("multiplier"));
  mToyShop.amount = parseInt(localStorage.getItem("toyShop"));
  mToyFactory.amount = parseInt(localStorage.getItem("toyFactory"));
  update();
}

//Resets data, clears localStorage and updates
function restart() {
  toys = 0;
  mClickUpgrade.reset();
  mAutoClicker.reset();
  mMultiplier.reset();
  mToyShop.reset();
  mToyFactory.reset();
  localStorage.clear();
  update();
}

//Returns current toys per second
function getToysPerSecond() {

  return


  if (mToyShop.amount >= 1) {
    return (toyShop.amount*2)*mAutoClicker.amount*mMultiplier.amount;
  } else if (mToyFactory.amount >= 1) {
    return (mToyFactory.amount*3)*(toyShop.amount*2)*mAutoClicker.amount*mMultiplier.amount;
  } else {
    return mAutoClicker.amount*mMultiplier.amount;
  }
}
