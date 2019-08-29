/**
 * A mesh representing the player snowball
 * @param size The snowball size
 * @param scene The scene
 * @param camera
 * @constructor
 */


SnowBall = function(scene,sd) {
    BABYLON.Mesh.call(this, "ball", scene);
    var sphere = BABYLON.VertexData.CreateSphere({diameter:3}, scene);
    var evt;
    // Move the sphere upward 1/2 its height
    //sphere.position =new BABYLON.Vector3(0,1.6,2);
    //sphere.convertToFlatShadedMesh();

    sphere.applyToMesh(this, false);
    this.scene=scene;
    this.sd=sd;
    sd.getShadowMap().renderList.push(this);
    this.position.x = 0;
    this.position.y = 1;
    this.position.z = -20;
    this.crash = false;
    this.crashCoin=false;
    this.speed = 1;
    this.diagDx=true;
    this.moveLeft = false;
    this.moveRight = false;
    this._initMovement();


};

SnowBall.prototype = Object.create(BABYLON.Mesh.prototype);
SnowBall.prototype.constructor = SnowBall;

SnowBall.prototype._initMovement = function() {

scene.onKeyboardObservable.add(
        keyboardEventHandler, 
        BABYLON.KeyboardEventTypes.KEYDOWN + BABYLON.KeyboardEventTypes.KEYUP
    );

    function keyboardEventHandler(evtData){
        evt = evtData.event;
        if(evt.repeat) return; // Ignore repeats from holding a key down.

        switch(evtData.type){
            case BABYLON.KeyboardEventTypes.KEYDOWN:
                keyboardProcessKeyDown(evt.key, evt.keyCode);
            break;
            case BABYLON.KeyboardEventTypes.KEYUP:
                keyboardProcessKeyUp(evt.key, evt.keyCode);
            break;

        }
    }

    function keyboardProcessKeyDown(key, code){
        if(code == 32){
                        if(ball.diagDx){
                            ball.diagDx=false;
                        }
                        else{
                            ball.diagDx=true;
                        }
                    }
    }

    function keyboardProcessKeyUp(key, code){
        console.log("KEYUP REGISTERED FOR KEY; ", key, " WITH KEYCODE; ", code);
    }
            /*var onKeyDown = function(evt) {
                    console.log(evt.keyCode);
                    if (evt.keyCode == 37) {
                            ball.moveLeft = true;
                            ball.moveRight = false;
                    } else if (evt.keyCode == 39) {
                            ball.moveRight = true;
                            ball.moveLeft = false;
                    }
                    else if(evt.keyCode == 32){
                        if(ball.diagDx){
                            ball.diagDx=false;
                        }
                        else{
                            ball.diagDx=true;
                        }
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
                     }]);*/
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
    if(ball.diagDx){
        ball.position.x += 1;
        camera.position.x += 1;
        ball.position.z += 1;
        camera.position.z += 1;
    }
    if(!ball.diagDx){
        ball.position.x += -1;
        camera.position.x += -1;
        ball.position.z += 1;
        camera.position.z += 1;
    }
};