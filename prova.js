     
    var scene;
    var canvas ;
    var engine ;
    var ball;
    var terrain;
    var camera;
    var InputTreesNumber;
    var difficulty; 
    var audiocontext;
    var musiccrash;
    var music;
    var points; 
    var crashingCoinId;   
    var textPoint;
    var coinsArray=[];
    var rocksArray=[];
    var booleanRocksArray=[];
    var carrot;
    var hat;
    var lefteye;
    var leftdisc;
    var righteye;
    var rightdisc;
    var fence;
    var tongue;
    var shadowGenerator;
                // createScene function that creates and return the scene
                var createScene = function(){
                    canvas= document.getElementById('renderCanvas');
                    difficulty=canvas.value;
                    engine= new BABYLON.Engine(canvas, true);
                    scene = new BABYLON.Scene(engine);
                    points=0;
                    music = new BABYLON.Sound("Music", "sounds/crystallize-trimmered.mp3", scene, null, {loop:true, autoplay:true});
                    
                    

                    Start();
                     var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
                     var rect1 = new BABYLON.GUI.Rectangle();
                     rect1.width = "150px";
                     rect1.height = "40px";
                     rect1.cornerRadius = 20;
                     rect1.color = "GoldenRod";
                     rect1.thickness = 4;
                     rect1.background = "White";
                     rect1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                     rect1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
                     rect1.top = "25px";
                     rect1.left = "50px";
                     advancedTexture.addControl(rect1);

                     
                     textPoint = new BABYLON.GUI.TextBlock();
                     textPoint.text="Points: "+points;
                     textPoint.color = "black";
                     textPoint.fontSize = 20;
                     textPoint.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                     textPoint.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
                     textPoint.top = "33px";
                     textPoint.left = "72px";
                     advancedTexture.addControl(textPoint);              

                    // Skybox
                    var skybox = BABYLON.MeshBuilder.CreateBox("skyBox",{size:1000}, scene);
                    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
                    skybox.infiniteDistance=true;
                    skyboxMaterial.backFaceCulling = false;
                    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("https://www.babylonjs-playground.com/textures/skybox", scene);
                    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
                    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
                    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
                    skybox.material = skyboxMaterial;

                    scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
                    scene.fogDensity = 0.001;
                    scene.fogColor = new BABYLON.Color3(0.8,0.83,0.8);


                    var sky = BABYLON.Mesh.CreatePlane("sky", {width:100, heigth:30000}, scene);
                    sky.position = new BABYLON.Vector3(0, 50, 0);

        // Create a particle system
        var particleSystem = new BABYLON.ParticleSystem("particles", 50000, scene);

        //Texture of each particle
        particleSystem.particleTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/flare.png", scene);

        // Where the particles come from
        particleSystem.emitter = sky; // the starting object, the emitter
        particleSystem.minEmitBox = new BABYLON.Vector3(-100, 0, -100); // Starting all from
        particleSystem.maxEmitBox = new BABYLON.Vector3(100, 0, 30000); // To...

        // Colors of all particles
        particleSystem.color1 = new BABYLON.Color4(1, 1, 1.0, 1.0);
        particleSystem.color2 = new BABYLON.Color4(1, 1, 1.0, 0.5);
        particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

        // Size of each particle (random between...
        particleSystem.minSize = 0.1;
        particleSystem.maxSize = 0.5;

        // Life time of each particle (random between...
        particleSystem.minLifeTime = 3;
        particleSystem.maxLifeTime = 15;

        // Emission rate
        particleSystem.emitRate = 5000;

        // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
        particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

        // Set the gravity of all particles
        particleSystem.gravity = new BABYLON.Vector3(0, -15, 0);

        // Direction of each particle after it has been emitted
        particleSystem.direction1 = new BABYLON.Vector3(-7, -8, 3);
        particleSystem.direction2 = new BABYLON.Vector3(7, -8, -3);

        // Angular speed, in radians
        particleSystem.minAngularSpeed = 0;
        particleSystem.maxAngularSpeed = Math.PI;

        // Speed
        particleSystem.minEmitPower = 2;
        particleSystem.maxEmitPower = 3;
        particleSystem.updateSpeed = 0.007;

        // Start the particle system
        particleSystem.start();
    //////////////////////////////////////////////////////////////////////////////////////////////////////////


    camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-30), scene);


    camera.setTarget(new BABYLON.Vector3(0,0,20));
    camera.attachControl(canvas, true);
    camera.maxZ = 1000;
    camera.speed = 4;
                    // create a basic light, aiming 0,1,0 - meaning, to the sky
                    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,-1), scene);
                    light.position = new BABYLON.Vector3(0,10,10);
                    //light.intensity = 0.75;
                    light.specular = BABYLON.Color3.Black();

                    var d1 = new BABYLON.DirectionalLight("dir", new BABYLON.Vector3(1, -1, 4), scene);
                    d1.position = new BABYLON.Vector3(-300,300,600);
                    shadowGenerator = new BABYLON.ShadowGenerator(2048, d1);
                    shadowGenerator.transparencyShadow = true;
                    shadowGenerator.getShadowMap().refreshRate = 1;

                    

                    var image = new BABYLON.StandardMaterial('groundimage', scene);
                    var texture = new BABYLON.Texture('https://thumbs.dreamstime.com/t/groomed-snow-ski-slope-close-up-groomed-snow-ski-resort-slope-banner-background-texture-125764946.jpg', scene);
                    image.diffuseTexture = texture;

                    var ground = BABYLON.Mesh.CreateGround("ground", 100, 30000, 1, scene);
                    ground.material =image;
                    //ground.material.diffuseColor = BABYLON.Color3.FromInts(255, 255, 255);
                    ground.material.specularColor = BABYLON.Color3.Black();

                    ground.receiveShadows = true;
                    

                    window.addEventListener('resize', function(){
                        engine.resize();
                    });

                    //ball movement
                    //var sphere = BABYLON.VertexData.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
                    //sphere.position =new BABYLON.Vector3(0,1.6,2);
                    ball = new SnowBall(scene,shadowGenerator);
                    // ROTATION AND SCALING
                    ball.scaling = new BABYLON.Vector3(0.4, 0.4, 0.4);
                    var angle=0.065;   
                    var axis = new BABYLON.Vector3(1,0,0);

                    ball.actionManager = new BABYLON.ActionManager(scene);
                    var clickTrigger = {trigger:BABYLON.ActionManager.OnPickTrigger, parameter: ball};
                    var execution = new BABYLON.SwitchBooleanAction(clickTrigger, ball, "startball");
                    ball.actionManager.registerAction(execution);
                    
                   /* scene.registerAfterRender(function() {
                     ball.rotate(axis, angle, BABYLON.Space.LOCAL);  
                 });
                        DISATTIVATO PER POSIZIONAMENTO MODELLO GERARCHICO
                 */




                    var numberOfTrees, numberOfRocks;
                    if(difficulty=="easy") {numberOfTrees=100; numberOfRocks=7;}
                    else if(difficulty=="medium") {numberOfTrees=200; numberOfRocks=8;}
                    else if(difficulty=="hard") {numberOfTrees=250; numberOfRocks=9;}
                    else if(difficulty=="extreme") {numberOfTrees=300; numberOfRocks=10;}
                    var tg = new TreeGenerator(scene, shadowGenerator, ball,numberOfTrees);   
                    var numberOfCoins=15;             
                    var assetsManager = new BABYLON.AssetsManager(scene);
                    
                    //var Coins_array=[];
                    var positionZ,positionX;

                    

       
        for (var j = 0; j < numberOfCoins; j++) {         
            var positionable=true;
                        for (var i=0; i<tg._trees.length;i++){
                            if(tg._trees[i].position.z==positionZ && tg._trees[i].position.x==positionX)
                                { positionable=false;}

                        }
            if(positionable){
            var coin = BABYLON.MeshBuilder.CreateCylinder("cone", {diameterTop:1, height: 0.1, tessellation: 24,sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
            coin.rotation.z=Math.PI*1.5;
            coin.rotation.y=Math.PI/2.8;
            coin.material=new BABYLON.StandardMaterial("coin", scene);
            coin.material.diffuseColor = BABYLON.Color3.FromInts(230, 184, 0);
            positionZ = randomNumber(20, 3000);
            positionX=randomNumber(-48, 48);
            coin.position= new BABYLON.Vector3(positionX,2,positionZ);
            coin.scaling = new BABYLON.Vector3(2.5, 2.5, 2.5);
            coin.actionManager=new BABYLON.ActionManager(scene);
            shadowGenerator.getShadowMap().renderList.push(coin);


            
        coinsArray.push(coin);
      

        }
        else{j--; console.log("collision found, recalculating position");}

    }
    
        var angleY = Math.PI/4;
    scene.registerAfterRender(function() {
        for(var l=0; l<coinsArray.length;l++){
            coinsArray[l].rotate(BABYLON.Axis.Y, angleY/20, BABYLON.Space.WORLD);
        }
    });
        
        var boxleft = BABYLON.MeshBuilder.CreateBox("", {height: 3, width: 0.5, depth: 100, updatable: true});
        boxleft.material=new BABYLON.StandardMaterial("coin", scene);
        boxleft.position=new BABYLON.Vector3(-50,0,-20);
        //boxleft.rotation.z=Math.PI*0.5;
        boxleft.material.diffuseColor = BABYLON.Color3.FromInts(128,43,0);

        var boxright = BABYLON.MeshBuilder.CreateBox("", {height: 3, width: 0.5, depth: 100, updatable: true});
        boxright.material=new BABYLON.StandardMaterial("coin", scene);
        boxright.position=new BABYLON.Vector3(50,0,-20);
        //boxright.rotation.z=Math.PI*0.5;
        boxright.material.diffuseColor = BABYLON.Color3.FromInts(128,43,0);
        
        var counterposition=-20;
        for (var i = 0; i < 30; i++) {         
                counterposition+=100;
                var box = BABYLON.MeshBuilder.CreateBox("", {height: 3, width: 0.5, depth: 100, updatable: true});
                box.material=new BABYLON.StandardMaterial("coin", scene);
                //box.rotation.z=Math.PI*0.5;
                box.material.diffuseColor = BABYLON.Color3.FromInts(128,43,0);
                box.position=new BABYLON.Vector3(-50,0,counterposition);

                }
        counterposition=-20;
        for (var i = 0; i < 30; i++) {         
                counterposition+=100;
                var box = BABYLON.MeshBuilder.CreateBox("", {height: 3, width: 0.5, depth: 100, updatable: true});
                box.material=new BABYLON.StandardMaterial("coin", scene);
                //box.rotation.z=Math.PI*0.5;
                box.material.diffuseColor = BABYLON.Color3.FromInts(128,43,0);
                box.position=new BABYLON.Vector3(50,0,counterposition);
                    
                
                
            
        }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        //ROCK CODE
        
        for (var i = 0; i < numberOfRocks; i++) { 
            var rock = BABYLON.MeshBuilder.CreateSphere("sphere", {segments:2}, scene);
            rock.material=new BABYLON.StandardMaterial("coin", scene);
            rock.material.diffuseColor = BABYLON.Color3.FromInts(109, 113, 120);
            //positionX= randomNumber(-48, 48);
            positionZ = randomNumber(20, 3000);
            var booleanaRoccia; 
            var randomX=Math.random();
            randomX=randomX*1000;
            console.log("randomX: ", randomX);
            if(randomX>=500){
                positionX = 48;
                booleanaRoccia=false;
                console.log("Roccia a destra");
            }
            else if (randomX<500){
                positionX = -48;
                booleanaRoccia=true;
                console.log("Roccia a sinistra");
            }
            rock.position= new BABYLON.Vector3(positionX,1.3,positionZ); 
            console.log("posX: ",positionX);
            console.log("rock posX: ",rock.position.x);
            rock.scaling = new BABYLON.Vector3(4.0, 4.0, 4.0);
            rock.actionManager=new BABYLON.ActionManager(scene);
            shadowGenerator.getShadowMap().renderList.push(rock);      
            rocksArray.push(rock);
            booleanRocksArray.push(booleanaRoccia);
        }
        var axisRockSx= new BABYLON.Vector3(1, -1, -1);
        var axisRockDx= new BABYLON.Vector3(1, 1, 1);
        scene.registerAfterRender(function() {
            for(var l=0; l<rocksArray.length;l++){
                if(rocksArray[l].position.x==-48){
                    rocksArray[l].rotate(axisRockSx, angle, BABYLON.Space.LOCAL); 
                } 
                else{
                    rocksArray[l].rotate(axisRockDx, angle, BABYLON.Space.LOCAL); 
                }
            }
        });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


       

        BABYLON.SceneLoader.ImportMesh("", "assets/", "flag.babylon", scene, function (newMeshes) {

        var mesh = newMeshes[0];
        mesh.position= new BABYLON.Vector3(13,0,-7);
        mesh.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3);
        shadowGenerator.getShadowMap().renderList.push(mesh);
        for (var j = 0; j < 2; j++) {         
            
                var clone = mesh.clone("newname");
                shadowGenerator.getShadowMap().renderList.push(clone);
           if(j==0){     
        clone.position= new BABYLON.Vector3(40,0,3010);
        clone.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3);
    } else{
        clone.position= new BABYLON.Vector3(-40,0,3010);
        clone.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3);
    }
            
        }
    });





                    
                    
        BABYLON.SceneLoader.ImportMesh("", "assets/", "hat.babylon", scene, function (newMeshes) {
                    hat = newMeshes[0];
                    hat.parent=ball;
                    hat.position= new BABYLON.Vector3(0,1.5,0);
                    hat.scaling = new BABYLON.Vector3(1.7, 1.7, 1.7);
        });

        BABYLON.SceneLoader.ImportMesh("", "assets/", "tongue.babylon", scene, function (newMeshes) {
                    tongue = newMeshes[0];
                    tongue.parent=ball;
                    tongue.position= new BABYLON.Vector3(0,-0.5,1.5);
                    tongue.material=new BABYLON.StandardMaterial("coin", scene);
                    tongue.material.diffuseColor = BABYLON.Color3.Red();
                    tongue.getScene().getMaterialByID("pony_tongue.Texture_0").diffuseColor=new BABYLON.Color3.Red();
                    tongue.scaling=new BABYLON.Vector3(0.1, 0.1, 0.1);
                    tongue.rotation.x=Math.PI*1.5;
        });

    carrot = BABYLON.MeshBuilder.CreateCylinder("cone", {diameterBottom:0.014,diameterTop:0.6, height: 1.7, tessellation: 96}, scene);
    carrot.material=new BABYLON.StandardMaterial("coin", scene);
    carrot.parent=ball;
    carrot.material.diffuseColor = BABYLON.Color3.FromInts(235, 150, 37);
    carrot.position= new BABYLON.Vector3(0,0.1,1.7);
    carrot.rotation.x=Math.PI*1.5;


    lefteye = BABYLON.MeshBuilder.CreateSphere({diameter:3}, scene);
    lefteye.position= new BABYLON.Vector3(-0.5,0.3,1);
    lefteye.rotation.x=Math.PI*0.5;
    lefteye.parent=ball;
    leftdisc = BABYLON.MeshBuilder.CreateTorus("torus", {thickness: 0.08, tessellation:36, diameter:0.3}, scene);
    leftdisc.material=new BABYLON.StandardMaterial("coin", scene);
    leftdisc.material.diffuseColor = BABYLON.Color3.FromInts(0,0,0);
    leftdisc.parent=lefteye;
    leftdisc.position.y=0.5;

    righteye = BABYLON.MeshBuilder.CreateSphere({diameter:3}, scene);
    righteye.position= new BABYLON.Vector3(0.5,0.3,1);
    righteye.rotation.x=Math.PI*0.5;
    righteye.parent=ball;
    rightdisc = BABYLON.MeshBuilder.CreateTorus("torus", {thickness: 0.08, tessellation:36, diameter:0.3}, scene);
    rightdisc.material=new BABYLON.StandardMaterial("coin", scene);
    rightdisc.material.diffuseColor = BABYLON.Color3.FromInts(0,0,0);
    rightdisc.parent=righteye;
    rightdisc.position.y=0.5;

     
    			
                  
                    var axisY= new BABYLON.Vector3(0,1,0);
                    var axisDx= new BABYLON.Vector3(1,-1,-1);
                    var axisSx= new BABYLON.Vector3(1,1,1);
                    var explosion=false;
                    engine.runRenderLoop(function(){

                        if (!ball.crash && ball.startball) {
                            ball.move();
                            /*for(var l=0;l<Rock_Array.size();l++){
        
                                    if(Rock_Array[l].loadedMeshes[0].position.z==ball.position.z-10){
                                        var objRock=Rock_Array[l].loadedMeshes[0];
                                        if(objRock.position.x==48) moveLeft(objRock);
                                        else if(objRock.position.x==-48) moveRight(objRock);

                                    }
                                }


                                */
                                //NUOVO PEZZO CODICE
                                for (var k=0; k<coinsArray.length; k++){
                                    
                                    if(coinsArray[k].intersectsMesh(ball, false)){
                                            points+=100;
                                            textPoint.text="Points: "+points;
                                            coinsArray[k].dispose();
                                            var deleted=coinsArray.splice(k,1);
                                    }
                                }

                                for (var g=0; g<rocksArray.length; g++){
                                        if(rocksArray[g].intersectsMesh(ball, false)){
                                                console.log("collision");
                                                ball.crash=true;
                                                //var deleted=rocksArray.splice(k,1);
                                        }
                                        if(rocksArray[g].position.z-ball.position.z<50){
                                            if(booleanRocksArray[g]){
                                                rockMoveDx(rocksArray[g]);
                                            }
                                            else if(!booleanRocksArray[g]){
                                                rockMoveSx(rocksArray[g]);   
                                            }
                                            //rockMove(rocksArray[g]);
                                        }
                                }

                                camera.position.z += ball.speed;
                                ball.position.z += ball.speed;
                                if(ball.position.x<=-50 || ball.position.x>=50){ball.crash=true;}
                                if(ball.diagDx){ ball.rotate(axisDx, angle, BABYLON.Space.LOCAL);  }
                                if(!ball.diagDx){ ball.rotate(axisSx, angle, BABYLON.Space.LOCAL);  }
                                if(ball.position.z >= 3010){ 
                                   ball.startball=false;
                                   Finish();
                               }
                           }
                           if(ball.crash){
                            //ball.rotate(axis, 0, BABYLON.Space.LOCAL);
                            if(!explosion){
                                explosion=true;
                                var particleSystem2 = new BABYLON.ParticleSystem("particles2", 2000, scene);

                                //Texture of each particle
                                particleSystem2.particleTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/sparkle2.jpg", scene);
                                   // particleSystem2.particleTexture = new BABYLON.Texture("https://freepngimg.com/thumb/snowflakes/12-snowflake-png-image-thumb.png", scene);
                                // Where the particles come from
                                particleSystem2.emitter = new BABYLON.Vector3(ball.position.x, ball.position.y, ball.position.z); // the starting object, the emitter
                                particleSystem2.minEmitBox = new BABYLON.Vector3(-5, -5, -5); // Starting all from
                                particleSystem2.maxEmitBox = new BABYLON.Vector3(5, 5, 5); // To...
                                particleSystem2.emitRate = 1000;
                                particleSystem2.maxSize = 0.5;
                                musiccrash = new BABYLON.Sound("MusicCrash", "sounds/jab.mp3", scene,null,{autoplay:true});
                                // Start the particle system
                                particleSystem2.start();
                                //particleSystem.stop();

                                /*scene.removeMesh(ball);
                                scene.removeMesh(hat);
                                scene.removeMesh(lefteye);
                                scene.removeMesh(leftdisc);
                                scene.removeMesh(righteye);
                                scene.removeMesh(rightdisc);
                                scene.removeMesh(carrot);*/
                                tongue.dispose();
                                ball.dispose();
                            }

                            Crash();
                        }
                        //VECCHIO PEZZO CODICE
                        /*if(ball.crashCoin){
                            points+=100;
                            textPoint.text="Points: "+points;
                            crashCoin=false;
                            console.log("points: "+points);
                            //scene.removeMesh(Coins_array[ball.index]);
                            ball.index=-1;
                           // Coins_array[crashingCoinId].dispose();

                        }*/

                        scene.render();
                    });
                    assetsManager.load();
                    
                    //var ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene);

                    // return the created scene
                    return scene;
                };


                function Start(){
                  $("#play").dialog({
                    dialogClass: "no-close",
                    closeOnEscape: false,
                    open: function(event, ui) {
                       $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
                   },
                   width: 512
               });

                  $("#buttonPlay").click(function(event){
                      //start=true;
    						//music = new BABYLON.Sound("Music", "sounds/crystallize.mp3", scene, null, {loop:true, autoplay:true});
                          $("#play").dialog("close");
                      });


              }

              function Crash(){
               $("#crashing").dialog({
                dialogClass: "no-close",
                width: 512
            });

               $("#restartLevel").click(function(event){
                  location.reload();
              });

               $("#home").click(function(event){
                  window.location.href="mainpage.html";
              });

           }

           function Finish(){
            points+=3000;
            textPoint.text="Points: "+points;
            console.log(points);

            $("#finishing").dialog({
                dialogClass: "no-close",
                width: 512
            });

            $("#restartLevel2").click(function(event){
              location.reload();
          });

            $("#home2").click(function(event){
              window.location.href="mainpage.html";
          });

        }

        var randomNumber = function (min, max) {
            if (min == max) {
                return (min);
            }
            var random = Math.random();
            return ((random * (max - min)) + min);
        };
   /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
    
   //CODICE ROCCE
   
    var rockMoveSx = function(r) {
        r.position.x -= 0.4;
        console.log(r.position.x);
        console.log(r.position);
        r.position.z += 0.6;
            if(r.position.x<=-50){
                r.dispose();
            }
    };

    var rockMoveDx = function(r) {
        r.position.x += 0.4;
        console.log(r.position.x);
        console.log(r.position);
        r.position.z += 0.6;
            if(r.position.x>=50){
                r.dispose();
            }
        
    };
 /*
    var rockMove = function(r) {
        r.position.z -= 1.2;
        if(r.position.z<=20){
            scene.removeMesh(r);
        }
        
    };*/

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        
