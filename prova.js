 
            var scene;
            var canvas ;
            var engine ;
            var ball;
            var terrain;
            var camera;
            var InputTreesNumber;
            var start=false; 
            var difficulty; 
            var audiocontext;
            var musiccrash;
            var music;    

            // createScene function that creates and return the scene
            var createScene = function(){
                canvas= document.getElementById('renderCanvas');
                difficulty=canvas.value;
                engine= new BABYLON.Engine(canvas, true);
                scene = new BABYLON.Scene(engine);

                music = new BABYLON.Sound("Music", "sounds/crystallize-trimmered.mp3", scene, null, {loop:true, autoplay:true});
                
                

                Start();
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


                //CODICE PER FLAG
                var flagStart = BABYLON.MeshBuilder.CreateBox("myBox", {height: 5, width: 2, depth: 0.5}, scene);
                flagStart.position =new BABYLON.Vector3(13 , 1, -5);

                var flagFinish1 = BABYLON.MeshBuilder.CreateBox("myBox", {height: 5, width: 2, depth: 0.5}, scene);
                flagFinish1.position =new BABYLON.Vector3(40 , 1, 3010);

                var flagFinish2 = BABYLON.MeshBuilder.CreateBox("myBox", {height: 5, width: 2, depth: 0.5}, scene);
                flagFinish2.position =new BABYLON.Vector3(-40 , 1, 3010);
                

               

                // ROTATION AND SCALING
                ball.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2);
                var angle=0.065;   
                var axis = new BABYLON.Vector3(1,0,0);
    			scene.registerAfterRender(function() {
     		    ball.rotate(axis, angle, BABYLON.Space.LOCAL);  
   				});
    			var numberOfTrees, numberOfRocks;
   				if(difficulty=="easy") {numberOfTrees=100; numberOfRocks=2;}
   				else if(difficulty=="medium") {numberOfTrees=200; numberOfRocks=3;}
   				else if(difficulty=="hard") {numberOfTrees=300; numberOfRocks=4;}
   				else if(difficulty=="extreme") {numberOfTrees=400; numberOfRocks=5;}
                var tg = new TreeGenerator(scene, shadowGenerator, ball,numberOfTrees);

                // var rg = new RockGenerator(scene, shadowGenerator, ball ,numberOfRocks);
                
                var assetsManager = new BABYLON.AssetsManager(scene);
                var rg = new RockGenerator(scene, shadowGenerator, ball ,numberOfRocks);

                /*




				var meshFlagStartTask = assetsManager.addMeshTask("hat task", "", "assets/", "flag.babylon");
                
                meshFlagStartTask.onSuccess = function (task) {task.loadedMeshes[0].position= new BABYLON.Vector3(13,1,-5);};
                meshFlagStartTask.onError = function (task, message, exception) {console.log(message, exception);};

                var meshFlagFinish1Task = assetsManager.addMeshTask("hat task", "", "assets/", "flag.babylon");
                
                meshFlagFinish1Task.onSuccess = function (task) {task.loadedMeshes[0].position= new BABYLON.Vector3(40,1,3010);};
                meshFlagFinish1Task.onError = function (task, message, exception) {console.log(message, exception);};
                

                var meshFlagFinish2Task = assetsManager.addMeshTask("hat task", "", "assets/", "flag.babylon");
                
                meshFlagFinish2Task.onSuccess = function (task) {task.loadedMeshes[0].position= new BABYLON.Vector3(-40,1,3010);};
                meshFlagFinish2Task.onError = function (task, message, exception) {console.log(message, exception);};



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
               

               





                var axisDx= new BABYLON.Vector3(1,-1,-1);
                var axisSx= new BABYLON.Vector3(1,1,1);
                var explosion=false;
                engine.runRenderLoop(function(){

                    if (!ball.crash && start) {
                        ball.move();

                        camera.position.z += ball.speed;
                        ball.position.z += ball.speed;
                        if(ball.position.x<=-50 || ball.position.x>=50){ball.crash=true;}
                        if(ball.diagDx){ ball.rotate(axisDx, angle, BABYLON.Space.LOCAL);  }
                        if(!ball.diagDx){ ball.rotate(axisSx, angle, BABYLON.Space.LOCAL);  }
                        if(ball.position.z >= 3010){ 
                         start=false;
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
   				 		start=true;
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

            