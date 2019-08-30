/**
 * A mesh representing the player snowball
 * @param size The snowball size
 * @param scene The scene
 * @param camera
 * @constructor
 */

var evt;
SnowBall = function(scene,sd) {
    BABYLON.Mesh.call(this, "ball", scene);
    var sphere = BABYLON.VertexData.CreateSphere({diameter:3}, scene);
    
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
    this.startball=false;
    this.index=-1;
    this._initMovement();


};

SnowBall.prototype = Object.create(BABYLON.Mesh.prototype);
SnowBall.prototype.constructor = SnowBall;

SnowBall.prototype._initMovement = function() {


    scene.onKeyboardObservable.add((kbInfo) => {
    console.log(kbInfo.type);
    console.log(kbInfo.event.key);
    if(kbInfo.type== BABYLON.KeyboardEventTypes.KEYDOWN){
        if(kbInfo.event.key==" "){
            if(ball.diagDx){
                            ball.diagDx=false;
                        }
                        else{
                            ball.diagDx=true;
                        }
                    
        }

    }
        
         
    });
/*


   
            var onKeyDown = function(evt) {
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