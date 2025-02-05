var evt;
var frameSx=1;
var frameDx=1;
SnowBall = function(scene,sd) {
    BABYLON.Mesh.call(this, "ball", scene);
    var sphere = BABYLON.VertexData.CreateSphere({diameter:3}, scene);
    this.anim=false;
    sphere.applyToMesh(this, false);
    this.scene=scene;
    this.sd=sd;
    sd.getShadowMap().renderList.push(this);
    this.position.x = 0;
    this.position.y = 2.8;
    this.position.z = -20;
    this.crash = false;
    this.crashCoin=false;
    this.speed = 0.2;
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
    if(kbInfo.type== BABYLON.KeyboardEventTypes.KEYDOWN){
        if(kbInfo.event.key==" "){
            if(ball.diagDx){
                            ball.diagDx=false;
                            ball.anim=true;
                        }
                        else{
                            ball.diagDx=true;
                            ball.anim=true;
                        }
                    
        }

    }
        
         
    });

            };
SnowBall.prototype.moveAnimationSx = function(x,z) {
    frameDx=1;
    if(frameSx==1){
        console.log("fs: "+frameSx);
        ball.position.x+=0.1;
        console.log("x: "+ ball.position.x);
        ball.position.z+=0.1;
        camera.position.x+=0.1;
        camera.position.z+=0.1;
        frameSx+=1;
    }
    else if(frameSx==2){
        console.log("fs: "+frameSx);
        ball.position.x+=0.1;
        console.log("x: "+ ball.position.x);
        ball.position.z+=0.1;
        camera.position.x+=0.1;
        camera.position.z+=0.1;
        frameSx+=1;
    }
    else if(frameSx==3){
        console.log("fs: "+frameSx);
        ball.position.x+=0.1;
        console.log("x: "+ ball.position.x);
        ball.position.z+=0.1;
        camera.position.x+=0.1;
        camera.position.z+=0.1;
        frameSx+=1;
    }
    else if(frameSx==4){
        console.log("fs: "+frameSx);
        ball.position.x+=0.05;
        console.log("x: "+ ball.position.x);
        ball.position.z+=0.1;
        camera.position.x+=0.05;
        camera.position.z+=0.1;
        frameSx+=1;
    }
    else if(frameSx==5){
        console.log("fs: "+frameSx);
        ball.position.x+=0.025;
        console.log("x: "+ ball.position.x);
        ball.position.z+=0.1;
        camera.position.x+=0.025;
        camera.position.z+=0.1;
        frameSx+=1;
    }
    else if(frameSx==6){
        console.log("fs: "+frameSx);
        ball.position.x+=0;
        console.log("x: "+ ball.position.x);
        ball.position.z+=0.1;
        camera.position.x+=0;
        camera.position.z+=0.1;
        frameSx+=1;
    }
    else if(frameSx==7){
        console.log("fs: "+frameSx);
        ball.position.x-=0;
        ball.position.z+=0.1;
        camera.position.x-=0;
        camera.position.z+=0.1;
        frameSx+=1;
    }
    else if(frameSx==8){
        console.log("fs: "+frameSx);
        ball.position.x-=0.025;
        ball.position.z+=0.1;
        camera.position.x-=0.025;
        camera.position.z+=0.1;
        frameSx+=1;
    }
    else if(frameSx==9){
        console.log("fs: "+frameSx);
        ball.position.x-=0.05;
        ball.position.z+=0.1;
        camera.position.x-=0.05;
        camera.position.z+=0.1;
        frameSx+=1;
    }
    else if(frameSx==10){
        console.log("fs: "+frameSx);
        ball.position.x-=0.1;
        ball.position.z+=0.1;
        camera.position.x-=0.1;
        camera.position.z+=0.1;
        frameSx+=1;
    }
    else if(frameSx==11){
        console.log("fs: "+frameSx);
        ball.position.x-=0.1;
        ball.position.z+=0.1;
        camera.position.x-=0.1;
        camera.position.z+=0.1;
        frameSx+=1;
    }
    else if(frameSx==12){
        console.log("fs: "+frameSx);
        ball.position.x-=0.1;
        ball.position.z+=0.1;
        camera.position.x-=0.1;
        camera.position.z+=0.1;
        frameSx=1;
        ball.anim=false;
    }

    
};
SnowBall.prototype.moveAnimationDx = function(x,z) {
    frameSx=1;
    if(frameDx==1){
        console.log("fd: "+frameDx);
        ball.position.x-=0.1;
        console.log("x: "+ ball.position.x);
        ball.position.z+=0.1;
        camera.position.x-=0.1;
        camera.position.z+=0.1;
        frameDx+=1;
    }
    else if(frameDx==2){
        console.log("fd: "+frameDx);
        ball.position.x-=0.1;
        console.log("x: "+ ball.position.x);
        ball.position.z+=0.1;
        camera.position.x-=0.1;
        camera.position.z+=0.1;
        frameDx+=1;
    }
    else if(frameDx==3){
        console.log("fd: "+frameDx);
        ball.position.x-=0.1;
        console.log("x: "+ ball.position.x);
        ball.position.z+=0.1;
        camera.position.x-=0.1;
        camera.position.z+=0.1;
        frameDx+=1;
    }
    else if(frameDx==4){
        console.log("fd: "+frameDx);
        ball.position.x-=0.05;
        console.log("x: "+ ball.position.x);
        ball.position.z+=0.1;
        camera.position.x-=0.05;
        camera.position.z+=0.1;
        frameDx+=1;
    }
    else if(frameDx==5){
        console.log("fd: "+frameDx);
        ball.position.x-=0.025;
        console.log("x: "+ ball.position.x);
        ball.position.z+=0.1;
        camera.position.x-=0.025;
        camera.position.z+=0.1;
        frameDx+=1;
    }
    else if(frameDx==6){
        console.log("fd: "+frameDx);
        ball.position.x-=0;
        ball.position.z+=0.1;
        camera.position.x-=0;
        camera.position.z+=0.1;
        frameDx+=1;
    }
    else if(frameDx==7){
        console.log("fd: "+frameDx);
        ball.position.x+=0;
        ball.position.z+=0.1;
        camera.position.x+=0;
        camera.position.z+=0.1;
        frameDx+=1;
    }
    else if(frameDx==8){
        console.log("fd: "+frameDx);
        ball.position.x+=0.025;
        ball.position.z+=0.1;
        camera.position.x+=0.025;
        camera.position.z+=0.1;
        frameDx+=1;
    }
    else if(frameDx==9){
        console.log("fd: "+frameDx);
        ball.position.x+=0.05;
        ball.position.z+=0.1;
        camera.position.x+=0.05;
        camera.position.z+=0.1;
        frameDx+=1;
    }
    else if(frameDx==10){
        console.log("fd: "+frameDx);
        ball.position.x+=0.1;
        ball.position.z+=0.1;
        camera.position.x+=0.1;
        camera.position.z+=0.1;
        frameDx+=1;
    }
    else if(frameDx==11){
        console.log("fd: "+frameDx);
        ball.position.x+=0.1;
        ball.position.z+=0.1;
        camera.position.x+=0.1;
        camera.position.z+=0.1;
        frameDx+=1;
    }
     else if(frameDx==12){
        console.log("fd: "+frameDx);
        ball.position.x+=0.1;
        ball.position.z+=0.1;
        camera.position.x+=0.1;
        camera.position.z+=0.1;
        frameDx=1;
        ball.anim=false;
    }
};
SnowBall.prototype.move = function() {
    var s=1;
    if (ball.moveRight) {
        ball.position.x += s;
        camera.position.x += s;
    }
    if (ball.moveLeft) {
        ball.position.x += -s;
        camera.position.x += -s;
    }
    if(ball.diagDx){
        ball.position.x += s;
        camera.position.x += s;
        ball.position.z += s;
        camera.position.z += s;
    }
    if(!ball.diagDx){
        ball.position.x += -s;
        camera.position.x += -s;
        ball.position.z += s;
        camera.position.z += s;
    }
};