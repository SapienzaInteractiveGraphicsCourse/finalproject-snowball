TreeGenerator = function(scene, sd, ball) {
    this.treeNumber = 100;
    this._trees = [];
    this.scene = scene;
    this.minSizeBranch = 15;
    this.maxSizeBranch = 20;

    this.minSizeTrunk = 10;
    this.maxSizeTrunk = 15;
    this.minRadius = 1;
    this.maxRadius = 5;

    this.sd = sd;
    this.ball=ball;
    this.generate();
};

TreeGenerator.prototype.generate = function() {

    this.clean();

    var randomNumber = function (min, max) {
        if (min == max) {
            return (min);
        }
        var random = Math.random();
        return ((random * (max - min)) + min);
    };

        var x, z;
       var size = 30;
       var sizeTrunk =9;
        var radius = 4;
    for (var i = 0; i<this.treeNumber; i++) {
        
        x = randomNumber(-50, 50);
        z = randomNumber(-300, 3000);

        var tree = new Tree(size, sizeTrunk, radius, scene, this.sd, ball);
        tree.position.x = x;
        tree.position.z = z;
        this._trees.push(tree);
    }
};

TreeGenerator.prototype.clean = function() {
    this._trees.forEach(function(t) {
        t.dispose();
    });

    this._trees = [];
};