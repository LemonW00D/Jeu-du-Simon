const vm = new Vue ({
    el: '#app',
    data: {
        hautGauche: false,
        hautDroite: false,
        basGauche: false,
        basDroite: false,
        sequence: [],
        tmp: [],
        squareMapping: ['hautGauche', 'hautDroite', 'basGauche', 'basDroite'],
    },
    methods: {
        playSound() {
            this.audio.play();
        },
        reset(){
            this.hautGauche = false;
            this.hautDroite = false;
            this.basGauche = false;
            this.basDroite = false;
        },
        addNewElemToSequence(){
            this.sequence.push(this.squareMapping[Math.floor(Math.random() * 4)]);
            this.tmp = this.sequence.slice();
        },
        newGame(){
            this.sequence = [];
            this.nextTurn();      
        },
        nextTurn() {
            this.addNewElemToSequence();
            this.reset();
            this.playSequence(this.tmp[0]);
        },
        playSequence(carre) {
            setTimeout(function(){
                vm[carre] = true;
                setTimeout(() => {
                    vm.reset();
                    vm.tmp.shift();
                    if (vm.tmp[0]) {
                        setTimeout(function(){
                            vm.playSequence(vm.tmp[0]);
                        }, 400)
                    } else {
                        vm.tmp = vm.sequence.slice();
                    }
                }, 400);                
            }, 400);
        },
        selectSquare(carre) {
            if (carre === this.tmp[0]) {
                vm[carre] = true;
                setTimeout(function(){
                    vm.reset();
                    vm.tmp.shift();
                    if (!vm.tmp[0]) {
                        vm.nextTurn();
                    }
                }, 400);
            } else {
                const value = this.sequence.length - 1;
                alert(`
                Vous avez perdu ! :(
                Votre score est de: ${ value }`);
            };
        }
    },
    computed: {
        score() {
            const value = this.sequence.length - 1;
            return ( value < 0 ) ? `Score: 0` : `Score: ${ value }`;
        }
    },
});