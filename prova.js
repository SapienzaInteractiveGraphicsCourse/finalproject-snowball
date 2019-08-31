     
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
                    var shadowGenerator = new BABYLON.ShadowGenerator(2048, d1);
                    

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
                    
                    scene.registerAfterRender(function() {
                     ball.rotate(axis, angle, BABYLON.Space.LOCAL);  
                 });




                    var numberOfTrees, numberOfRocks;
                    if(difficulty=="easy") {numberOfTrees=100; numberOfRocks=2;}
                    else if(difficulty=="medium") {numberOfTrees=200; numberOfRocks=3;}
                    else if(difficulty=="hard") {numberOfTrees=300; numberOfRocks=4;}
                    else if(difficulty=="extreme") {numberOfTrees=400; numberOfRocks=5;}
                    var tg = new TreeGenerator(scene, shadowGenerator, ball,numberOfTrees);   
                    var numberOfCoins=10;             
                    var assetsManager = new BABYLON.AssetsManager(scene);
                    var Rocks_array=[];
                    var Coins_array=[];
                    var positionZ,positionX;

                    

       /* BABYLON.SceneLoader.ImportMesh("", "assets/", "coin.babylon", scene, function (newMeshes) {

        var mesh = newMeshes[0];
        positionZ = randomNumber(20, 3000);
        positionX=randomNumber(-48, 48);
        mesh.position= new BABYLON.Vector3(positionX,2,positionZ);
        mesh.scaling = new BABYLON.Vector3(1.8, 1.8, 1.8);
        mesh.actionManager=new BABYLON.ActionManager(scene);
        
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        var collider = BABYLON.Mesh.CreateBox("collider_box", 0, scene, false);     
        var modele = mesh.getBoundingInfo();
        console.log(modele.boundingBox);
        collider.scaling = new BABYLON.Vector3(modele.boundingBox.maximum.x*2, modele.boundingBox.maximum.y*2, modele.boundingBox.maximum.z*2);
        collider.parent = mesh;
        collider.material = new BABYLON.StandardMaterial("collidermat", scene);
        collider.material.alpha = 0.3;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
        //mesh.showBoundingBox = true;
        coinsArray.push(mesh);
        //var trigger = {trigger:BABYLON.ActionManager.OnIntersectionEnterTrigger, parameter: ball};
        //var exec = new BABYLON.SwitchBooleanAction(trigger, ball, "crashCoin");
        //mesh.actionManager.registerAction(exec);
        */
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



            /*scene.registerAfterRender(function() {
                coin.rotate(axisY, angle, BABYLON.Space.LOCAL);  
            });*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        /*var colliderB = BABYLON.Mesh.CreateBox("collider_boxB", 0, scene, false);     
        var modeleB = clone.getBoundingInfo();
        console.log(modeleB.boundingBox);
        colliderB.scaling = new BABYLON.Vector3(modeleB.boundingBox.maximum.x*2, modeleB.boundingBox.maximum.y*2, modeleB.boundingBox.maximum.z*2);
        colliderB.parent = clone;
        colliderB.material = new BABYLON.StandardMaterial("collidermat", scene);
        colliderB.material.alpha = 0.3;*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7

        //clone.showBoundingBox = true;
        coinsArray.push(coin);
        //var triggerclone = {trigger:BABYLON.ActionManager.OnIntersectionEnterTrigger, parameter: ball};
        //var execClone = new BABYLON.SwitchBooleanAction(triggerclone, ball, "crashCoin");
        //console.log(execClone);
        
        //var execClonebis=new BABYLON.IncrementValueAction(trigger, ball,"index",j+1);

        //clone.actionManager.registerAction(execClonebis);
        //PROVARE A SETTARE VARIABILE EXEC2 CON INDICE MONETA
        //clone.actionManager.registerAction(execClone);

        }
        else{j--; console.log("collision found, recalculating position");}

    }
    //});
        var angleY = Math.PI/4;
        for(var l=0; l<coinsArray.length;l++){
            scene.registerAfterRender(function() {
                coinsArray[l].rotate(BABYLON.Axis.Y, angleY/150, BABYLON.Space.WORLD);
            });
            
        }

        BABYLON.SceneLoader.ImportMesh("", "assets/", "rock.babylon", scene, function (newMeshes) {

        var mesh = newMeshes[0];
        positionZ = randomNumber(20, 3000);
        var randomX=Math.random();
                       if(randomX%2==0){
                           positionX = 48;
                       }
                       else if (randomX%2!=0){
                           positionX = -48;
                       }
        mesh.position= new BABYLON.Vector3(positionX,2,positionZ);
        
        for (var i = 0; i < numberOfRocks-1; i++) {         
            
                var clone = mesh.clone("newname");
                positionZ = randomNumber(20, 3000);
                       var randomX=Math.random();
                       if(randomX%2==0){
                           positionX = 48;
                       }
                       else if (randomX%2!=0){
                           positionX = -48;
                       }
        clone.position= new BABYLON.Vector3(positionX,2,positionZ);
            
        }
    });

        BABYLON.SceneLoader.ImportMesh("", "assets/", "flag.babylon", scene, function (newMeshes) {

        var mesh = newMeshes[0];
        mesh.position= new BABYLON.Vector3(13,2,-7);
        mesh.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3);
        for (var j = 0; j < 2; j++) {         
            
                var clone = mesh.clone("newname");
           if(j==0){     
        clone.position= new BABYLON.Vector3(40,2,3010);
        clone.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3);
    } else{
        clone.position= new BABYLON.Vector3(-40,2,3010);
        clone.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3);
    }
            
        }
    });




/*
                    var meshBallTask = assetsManager.addMeshTask("ball task", "", "assets/", "ball.babylon");
                    
                    meshBallTask.onSuccess = function (task) {
                        task.loadedMeshes[0].position= new BABYLON.Vector3(0,1,1);
                    };
                   
                    meshBallTask.onError = function (task, message, exception) {
                        console.log(message, exception);
                    };
    				
    				                var meshCarrotTask = assetsManager.addMeshTask("carrot task", "", "assets/", "carrot.babylon");
                    
                    meshCarrotTask.onSuccess = function (task) {task.loadedMeshes[0].position= new BABYLON.Vector3(0,2.5,-15);};
                    meshCarrotTask.onError = function (task, message, exception) {console.log(message, exception);};
                    //meshCarrotTask.rotation.x=Math.PI;
                    meshCarrotTask.parent=ball;

                    var meshHatTask = assetsManager.addMeshTask("hat task", "", "assets/", "hat.babylon");
                    
                    meshHatTask.onSuccess = function (task) {task.loadedMeshes[0].position= new BABYLON.Vector3(0,4,-20);};
                    meshHatTask.onError = function (task, message, exception) {console.log(message, exception);};
                    meshHatTask.parent=ball;

                    var leftEyeTask = assetsManager.addMeshTask("left eye", "", "assets/", "hordes-rock.babylon");
                    
                    leftEyeTask.onSuccess = function (task) {task.loadedMeshes[0].position= new BABYLON.Vector3(-0.5,1.8,-18);};
                    leftEyeTask.onError = function (task, message, exception) {console.log(message, exception);};
                    leftEyeTask.parent=ball;

                    var rightEyeTask = assetsManager.addMeshTask("right eye", "", "assets/", "hordes-rock.babylon");
                    
                    rightEyeTask.onSuccess = function (task) {task.loadedMeshes[0].position= new BABYLON.Vector3(0.5,1.8,-18);};
                    rightEyeTask.onError = function (task, message, exception) {console.log(message, exception);};
                    rightEyeTask.parent=ball;

    				
                    //var snowMan= BABYLON.Mesh.MergeMeshes([ball,meshCarrotTask,meshHatTask,leftEyeTask,rightEyeTask]);

    				
                    var rockTask = assetsManager.addMeshTask("rock task", "", "assets/", "rock.babylon");
                    
                    rockTask.onSuccess = function (task) {
                        task.loadedMeshes[0].position= new BABYLON.Vector3(-3,0,-1);
                    };
                   
                    rockTask.onError = function (task, message, exception) {
                        console.log(message, exception);
                    };

                    
                    */







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
                                            console.log("collision");
                                            console.log(points);
                                            scene.removeMesh(coinsArray[k]);
                                            var deleted=coinsArray.splice(k,1);
                                    }
                                    //coinsArray[k].rotate(axisY, angle, BABYLON.Space.LOCAL)
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
                                scene.removeMesh(ball);
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

        
