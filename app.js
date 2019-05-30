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
    winning: 0
  },
  ready: function() {
    var vm = this;
     window.addEventListener('keyup', function(event) {
       // If down arrow was pressed...
       if (event.keyCode == 40) {
         vm.$broadcast('down-arrow-pressed');
       }
     });
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },
    attack: function() {
      var max = 10;
      var min = 3;
      var damage = Math.max(Math.floor(Math.random() * max) + 1, min);
      this.monsterHealth -= damage;

      if (this.monsterHealth <= 0) {
        alert('You won!');
        this.gameIsRunning = false;
        return;
      }

      max = 11;
      min = 4;
      damage = Math.max(Math.floor(Math.random() * max) + 1, min);
      this.playerHealth -= damage;

      if (this.playerHealth <= 0) {
        alert('You lost');
        this.gameIsRunning = false;
        return;
      }

    },
    specialAttack: function() {

    },
    heal: function() {

    },
    giveUp: function() {

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
