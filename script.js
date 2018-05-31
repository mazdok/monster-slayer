new Vue({
  el: '#app',
  data: {
    isNewGame: false,
    myHP: 100,
    enemyHP: 100,
    logs: []
  },
  methods: {
    beginGame(bool){
      this.myHP = 100;
      this.enemyHP = 100;
      this.logs = [];
      this.isNewGame = bool;
    },
    calcDamage(min, max){
      return Math.floor(Math.random() * (max - min)) + min;
    },
    checkWin(){
      if(this.enemyHP <= 0 ){
        if(confirm("Congratulations! You just killed a monster! New game?")){
          this.beginGame();
        } else {
          this.isNewGame = true;
        } 
        return true
      } else if(this.myHP <= 0 ) {
        if(confirm("Wasted. You lost...  Try again?")){
          this.beginGame();
        } else {
          this.isNewGame = true;
          return true
        } 
      }
      return false
    },
    monsterAttack(){
      let damage = this.calcDamage(10, 25)
      this.myHP -= damage;
      this.logs.unshift({
        isPlayer: false,
        text: "Monster hits Player for" + damage + "HP"
      })
      
      this.checkWin();
    },
    attack(){
      let damage = this.calcDamage(12, 15)
      this.enemyHP -= damage;
      
      this.logs.unshift({
        isPlayer: true,
        text: "Player hits Monster for" + damage + "HP"
      })

      if(this.checkWin()){
        return;
      }

      this.monsterAttack();
    },
    specialAttack(){
      let damage = this.calcDamage(10, 30)
      this.enemyHP -= damage;
      
      this.logs.unshift({
        isPlayer: true,
        text: "Player hits Monster for" + damage + "HP"
      })
      
      if(this.checkWin()){
        return;
      }

      this.monsterAttack();
    },
    heal(){
      if(this.myHP >= 100){
        return
      }
      let heal = this.calcDamage(5, 35)

      this.myHP += heal;
      
      this.logs.unshift({
        isPlayer: true,
        text: "Player healed himself for" + heal + "HP"
      })

      this.monsterAttack();
    },
    giveUp(){
      this.isNewGame = false;
    }
  }
})