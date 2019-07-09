Rock = function(scene, sd, ball, positionX, positionZ) {
    // Call the super class BABYLON.Mesh
    //BABYLON.Mesh.call(this, "rock", scene);
    this.scene=scene;
    this.ball=ball;
    this.positionX=positionX;
    this.positionZ=positionZ;

    var assetsManager = new BABYLON.AssetsManager(scene);
    var rockTask = assetsManager.addMeshTask("rock task", "", "assets/", "rock.babylon");
                
                rockTask.onSuccess = function (task) {
                    task.loadedMeshes[0].position= new BABYLON.Vector3(positionX,1,positionZ);
                    var trigger = {trigger:BABYLON.ActionManager.OnIntersectionEnterTrigger, parameter: ball};
                    var exec = new BABYLON.SwitchBooleanAction(trigger, ball, "crash");
                    rockTask.actionManager.registerAction(exec);
                    //on collision with ball
                };
               
                rockTask.onError = function (task, message, exception) {
                    console.log(message, exception);
                };

        
   
    


    sd.getShadowMap().renderList.push(this);

};