new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function(){
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function(){
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'คุณโจมตีมังกร '+ damage
            });

            if(this.checkWin()){
                return;
            }
            // if(this.monsterHealth <= 0){
            //     alert('คุณชนะ');
            //     this.gameIsRunning = false;
            // }
            this.monsterAttack();
            // this.playerHealth -= this.calculateDamage(5, 12);

            // this.checkWin();

            // if(this.playerHealth <= 0){
            //     alert('คุณแพ้');
            //     this.gameIsRunning = false;
            // }


        },
        spatialAttack: function(){
            this.monsterHealth -= this.calculateDamage(10, 20);
            if(this.checkWin()){
                return;
            }
            this.monsterAttack();
        },
        heal: function(){
            if(this.playerHealth <= 90){
                this.playerHealth += 20;
            }

            this.turns.unshift({
                isPlayer: true,
                text: 'คุณรักษาบาดแผล '
            });
            // this.playerHealth += 20;
            this.monsterAttack();
        },
        giveUp: function(){
            this.gameIsRunning = false;
        },
        monsterAttack: function(){
            var damage = this.calculateDamage(0, 30);
            this.playerHealth -= damage;
            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                text: 'มังกรโจมตีคุณ '+ damage
            });
        },
        calculateDamage: function(min, max){
            return Math.max(Math.floor(Math.random() * max) +1, min);
        },
        checkWin: function(){
            if(this.monsterHealth <= 0){
                if(confirm('คุณชนะแล้ว เล่นต่อเลยไหม!')){
                    this.startGame();
                }else{
                    this.gameIsRunning = false;
                }
                return true;

            }else if(this.playerHealth <= 0){
                if(confirm('เราผิดหวังในตัวคุณมาก คุณแพ้ได้ไง')){
                    this.startGame();
                }else{
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});