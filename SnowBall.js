/**
 * A mesh representing the player snowball
 * @param size The snowball size
 * @param scene The scene
 * @param camera
 * @constructor
 */


SnowBall = function(scene) {
    BABYLON.Mesh.call(this, "ball", scene);
    var sphere = BABYLON.VertexData.CreateSphere({diameter:3}, scene);
    // Move the sphere upward 1/2 its height
    //sphere.position =new BABYLON.Vector3(0,1.6,2);
    //sphere.convertToFlatShadedMesh();
    sphere.applyToMesh(this, false);
    this.position.x = 0;
    this.position.y = 3;
    this.position.z = -20;
    this.crash = false;
                this.speed = 1;
                this.moveLeft = false;
                this.moveRight = false;
                this._initMovement();

};

SnowBall.prototype = Object.create(BABYLON.Mesh.prototype);
SnowBall.prototype.constructor = SnowBall;

SnowBall.prototype._initMovement = function() {

            var onKeyDown = function(evt) {
                    console.log(evt.keyCode);
                    if (evt.keyCode == 37) {
                            ball.moveLeft = true;
                            ball.moveRight = false;
                    } else if (evt.keyCode == 39) {
                            ball.moveRight = true;
                            ball.moveLeft = false;
                    }
            };

            var onKeyUp = function(evt) {
                    ball.moveRight = false;
                    ball.moveLeft = false;
            };

            // Register events
            BABYLON.Tools.RegisterTopRootEvents([{
                     name: "keydown",
                     handler: onKeyDown
                     }, {
                     name: "keyup",
                     handler: onKeyUp
                     }]);
            };

SnowBall.prototype.move = function() {
    if (ball.moveRight) {
        ball.position.x += 1;
        camera.position.x += 1;
    }
    if (ball.moveLeft) {
        ball.position.x += -1;
        camera.position.x += -1;
    }
};