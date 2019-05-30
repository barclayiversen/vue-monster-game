new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    displayKey: false,
    key: 0,
    keyMin: 97,
    keyMax: 122,
    char: "",
    timerRunning: false,
    gameResult: false,
    winning: 0,
    turns: []
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    attack: function() {
      var damage = this.calculateDamage(4, 10);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits Monster for ' + damage + ' damage'
      });
      if (this.checkWin()) {
        return;
      }

      this.monsterAttacks();

    },
    specialAttack: function() {
      var damage = this.calculateDamage(8, 15);
      this.monsterHealth -= damage
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits Monster with special for ' + damage + ' damage'
      });
      if (this.checkWin()) {
        return;
      }

      this.monsterAttacks();

    },
    heal: function() {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10
      } else {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: 'Player heals 10 damage'
      });
      this.monsterAttacks();

    },
    giveUp: function() {
      this.gameIsRunning = false;
    },
    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin: function() {

      if (this.monsterHealth <= 0) {

        if (confirm('You won! New Game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;

      } else if (this.playerHealth <= 0) {
        if (confirm('You lost! New Game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }

      return false;
    },
    monsterAttacks: function() {
      var damage = this.calculateDamage(6, 12);
      this.playerHealth -= damage
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster hits Player for ' + damage + ' damage'
      });
      this.checkWin();
    },
    becomeAdept: function() {
      var vm = this;
      this.displayKey = true;
      //give the user a couple seconds to get ready
      setTimeout(function(){
        //set the "key" to be an ascii number
        vm.key = Math.floor(Math.random() * (vm.keyMax - vm.keyMin) + vm.keyMin);
        console.log(vm.key);
        console.log(String.fromCharCode(vm.key));

        //display the key they need to press
        vm.char = String.fromCharCode(vm.key);

        //set a timer for the keypress
        var gameTimer = setTimeout(function(){

          alert('you lose')
        }, 600);

        //listen for a keypress
        window.addEventListener("keypress", function(e) {
          console.log(String.fromCharCode(e.keyCode));
          if (e.keyCode == vm.key) {
            clearTimeout(gameTimer);
            alert('you win');
            vm.winning = 1;

          } else{
            clearTimeout(gameTimer);
            alert('you lost');
            vm.winning = 0;
            vm.pressedKey = String.fromCharCode(e.keyCode);
          }
        });

      }, 2000)




    }
  },
  // mounted() {
  //   window.addEventListener("keypress", function(e) {
  //     console.log(String.fromCharCode(e.keyCode));
  //   });
  // }
});
