 
            var scene;
            var canvas ;
            var engine ;

            // createScene function that creates and return the scene
            var createScene = function(){
                // create a basic BJS Scene object
                canvas= document.getElementById('renderCanvas');
                engine= new BABYLON.Engine(canvas, true);
                scene = new BABYLON.Scene(engine);

                var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-10), scene);

                
                camera.setTarget(BABYLON.Vector3.Zero());
                camera.attachControl(canvas, true);

                // create a basic light, aiming 0,1,0 - meaning, to the sky
                var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);

                window.addEventListener('resize', function(){
                engine.resize();
                });

                var assetsManager = new BABYLON.AssetsManager(scene);
                var meshBallTask = assetsManager.addMeshTask("ball task", "", "assets/", "carrot.babylon");
                
                meshBallTask.onSuccess = function (task) {
                    task.loadedMeshes[0].position= BABYLON.Vector3.Zero();
                };
               
                meshBallTask.onError = function (task, message, exception) {
                    console.log(message, exception);
                };

                engine.runRenderLoop(function(){
                scene.render();
            });
                assetsManager.load();
                
                //var ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene);

                // return the created scene
                return scene;
            };

            