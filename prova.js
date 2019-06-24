 
            var scene;
            var canvas ;
            var engine ;
            var ball;
            var terrain;
            var camera;
                   

            // createScene function that creates and return the scene
            var createScene = function(){
                // create a basic BJS Scene object
                canvas= document.getElementById('renderCanvas');
                engine= new BABYLON.Engine(canvas, true);
                scene = new BABYLON.Scene(engine);
                var skyColor = new BABYLON.Color4( .4, .6, .9, 1.0);
                scene.clearColor = skyColor;

                 scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
                 scene.fogDensity = 0.013;
                 scene.fogColor = new BABYLON.Color3(0.8,0.83,0.8);


                camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-30), scene);

                
                camera.setTarget(new BABYLON.Vector3(0,0,20));
                camera.attachControl(canvas, true);
                camera.maxZ = 1000;
                camera.speed = 4;
                // create a basic light, aiming 0,1,0 - meaning, to the sky
                var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
                light.intensity = 0.75;
                light.specular = BABYLON.Color3.Black();


                 var mapSubX = 1000;             // point number on X axis
                 var mapSubZ = 800;              // point number on Z axis


                // Texture and material
                var url = "https://thumbs.dreamstime.com/t/groomed-snow-ski-slope-close-up-groomed-snow-ski-resort-slope-banner-background-texture-125764946.jpg";
                var terrainTexture = new BABYLON.Texture(url, scene);
                var terrainMaterial = new BABYLON.StandardMaterial("tm", scene);
                terrainMaterial.diffuseTexture = terrainTexture;


                var terrain;
                var terrainSub=120;

                var createTerrain = function(mapData, mapSubX, mapSubZ) {
                var params = {
                    mapData: mapData,               // data map declaration : what data to use ?
                    mapSubX: mapSubX,               // how are these data stored by rows and columns
                    mapSubZ: mapSubZ,
                    terrainSub: 120                 // how many terrain subdivisions wanted
                    };

                terrain = new BABYLON.DynamicTerrain("terrain", params, scene);
                terrain.createUVMap();             // compute the UVs to stretch the image on the whole map
                terrain.mesh.material = terrainMaterial;
                terrain.update(true);
                };

                var hmURL = "https://www.babylonjs-playground.com/textures/worldHeightMap.jpg";
                var mapWidth = 500;
                var mapHeight = 3000;
                var nbPoints = 500;
                var hmOptions = {
                     width: mapWidth, height: mapHeight,          // map size in the World 
                     subX: nbPoints, subZ: nbPoints,              // number of points on map width and height
                     onReady: createTerrain                       // callback function declaration
                 };

                var mapData = new Float32Array(nbPoints * nbPoints * 3); // the array that will store the generated data
                BABYLON.DynamicTerrain.CreateMapFromHeightMapToRef(hmURL, hmOptions, mapData, scene);
                

                window.addEventListener('resize', function(){
                engine.resize();
                });

                //ball movement
                //var sphere = BABYLON.VertexData.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
                //sphere.position =new BABYLON.Vector3(0,1.6,2);
                ball = new SnowBall(scene);




                var assetsManager = new BABYLON.AssetsManager(scene);

                /*var meshBallTask = assetsManager.addMeshTask("ball task", "", "assets/", "ball.babylon");
                
                meshBallTask.onSuccess = function (task) {
                    task.loadedMeshes[0].position= new BABYLON.Vector3(0,1,1);
                };
               
                meshBallTask.onError = function (task, message, exception) {
                    console.log(message, exception);
                };


                var meshCarrotTask = assetsManager.addMeshTask("carrott task", "", "assets/", "carrot.babylon");
                
                meshCarrotTask.onSuccess = function (task) {
                    task.loadedMeshes[0].position= new BABYLON.Vector3(1,0,0);
                };
               
                meshCarrotTask.onError = function (task, message, exception) {
                    console.log(message, exception);
                };

                var meshHatTask = assetsManager.addMeshTask("hat task", "", "assets/", "hat.babylon");
                
                meshHatTask.onSuccess = function (task) {
                    task.loadedMeshes[0].position= new BABYLON.Vector3(0,2,0);
                };
               
                meshHatTask.onError = function (task, message, exception) {
                    console.log(message, exception);
                };

                var meshRockTask = assetsManager.addMeshTask("rock task", "", "assets/", "hordes-rock.babylon");
                
                meshRockTask.onSuccess = function (task) {
                    task.loadedMeshes[0].position= new BABYLON.Vector3(2,0,1);
                };
               
                meshRockTask.onError = function (task, message, exception) {
                    console.log(message, exception);
                };

                var meshRockBisTask = assetsManager.addMeshTask("rock bis task", "", "assets/", "rock.babylon");
                
                meshRockBisTask.onSuccess = function (task) {
                    task.loadedMeshes[0].position= new BABYLON.Vector3(-3,0,-1);
                };
               
                meshRockBisTask.onError = function (task, message, exception) {
                    console.log(message, exception);
                };

                var meshTreeTask = assetsManager.addMeshTask("tree task", "", "assets/", "tree.babylon");
                
                meshTreeTask.onSuccess = function (task) {
                    task.loadedMeshes[0].position= new BABYLON.Vector3(0,-3,-5);
                };
               
                meshTreeTask.onError = function (task, message, exception) {
                    console.log(message, exception);
                };

                var meshTreeBisTask = assetsManager.addMeshTask("tree bis task", "", "assets/", "tree2.babylon");
                
                meshTreeBisTask.onSuccess = function (task) {
                    task.loadedMeshes[0].position= new BABYLON.Vector3(-1,-1,-1);
                };
               
                meshTreeBisTask.onError = function (task, message, exception) {
                    console.log(message, exception);
                };

                var meshTreeToonTask = assetsManager.addMeshTask("tree toon task", "", "assets/", "tree-toon.babylon");
                
                meshTreeToonTask.onSuccess = function (task) {
                    task.loadedMeshes[0].position= new BABYLON.Vector3(4,3,3);
                };
               
                meshTreeToonTask.onError = function (task, message, exception) {
                    console.log(message, exception);
                };
                */

                engine.runRenderLoop(function(){

                    if (! ball.crash) {
                        ball.move();

                        camera.position.z += ball.speed;
                        ball.position.z += ball.speed;
                        //sphere.position.z += ball.speed;
                        //terrain.position.z += ball.speed;
        }
                scene.render();
            });
                assetsManager.load();
                
                //var ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene);

                // return the created scene
                return scene;
            };

            