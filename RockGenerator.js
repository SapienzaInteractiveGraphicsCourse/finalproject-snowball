RockGenerator = function(scene, sd, ball, number) {
    
    this.rockNumber = number;
    this._rocks = [];
    this.scene = scene;
    this.sd = sd;
    this.ball=ball;
    this.generate();
};

RockGenerator.prototype.generate = function() {

    this.clean();

    var randomNumber = function (min, max) {
        if (min == max) {
            return (min);
        }
        var random = Math.random();
        return ((random * (max - min)) + min);
    };

        var x, z;
    for (var i = 0; i<this.rockNumber; i++) {
        
        z = randomNumber(20, 3000);

        //var rock = new Tree(size, sizeTrunk, radius, scene, this.sd, ball);
        
        var randomX=Math.random();
        var positionX,positionZ;
        if(randomX%2==0){
                    positionX = 50;
        }
        else if (randomX%2!=0){
            positionX = -50;
        }
        
        positionZ = z;
        var rock=new Rock(scene, this.sd, ball, positionX, positionZ, i+1);
        this._rocks.push(rock);
    }
};

RockGenerator.prototype.clean = function() {
    this._rocks.forEach(function(t) {
        t.dispose();
    });

    this._rocks = [];
};