Rock = function(scene, sd, ball, positionX, positionZ, index,assetsManager) {
    // Call the super class BABYLON.Mesh
    //BABYLON.Mesh.call(this, "rock", scene);
    this.scene=scene;
    this.index=index;
    this.ball=ball;
    this.positionX=positionX;
    this.positionZ=positionZ;
    var assetsManagerBis=new BABYLON.AssetsManager(scene);
    var rockTask = assetsManagerBis.addMeshTask("rock task"+index+"", "", "assets/", "rock.babylon");
                
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
    assetsManagerBis.load();

};