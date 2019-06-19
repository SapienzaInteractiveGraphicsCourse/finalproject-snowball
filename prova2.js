// script importation
            var scene;
            var canvas ;
            var engine ;

var url = "https://cdn.rawgit.com/BabylonJS/Extensions/master/DynamicTerrain/dist/babylon.dynamicTerrain.min.js";
var s = document.createElement("script");
s.src = url;
document.head.appendChild(s);

var createScene = function() {
    canvas= document.getElementById('renderCanvas');
    engine= new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);
    var skyColor = new BABYLON.Color4( .4, .6, .9, 1.0);
    scene.clearColor = skyColor;
    var camera = new BABYLON.FreeCamera("camera1",   new BABYLON.Vector3(0.0, 10.0, 0.0), scene);
    camera.attachControl(canvas, true);
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0.0, 1.0, 0.0), scene);
    light.intensity = 0.75;
    light.specular = BABYLON.Color3.Black();
    var assetsManager = new BABYLON.AssetsManager(scene);

    var meshBallTask = assetsManager.addMeshTask("ball task", "", "https://github.com/SapienzaInteractiveGraphicsCourse/finalproject-snowball/blob/master/assets/", "ball.babylon");
                
    meshBallTask.onSuccess = function (task) {
          task.loadedMeshes[0].position= new BABYLON.Vector3(0,0,1/2);
                };
               
    meshBallTask.onError = function (task, message, exception) {
            console.log(message, exception);
                };

    // Map data creation
    // The map is a flat array of successive 3D coordinates (x, y, z).
    // It's defined by a number of points on its width : mapSubX
    // and a number of points on its height : mapSubZ

    var mapSubX = 1000;             // point number on X axis
    var mapSubZ = 800;              // point number on Z axis


    // Texture and material
    var url = "https://thumbs.dreamstime.com/t/groomed-snow-ski-slope-close-up-groomed-snow-ski-resort-slope-banner-background-texture-125764946.jpg";
    var terrainTexture = new BABYLON.Texture(url, scene);
    
    var terrainMaterial = new BABYLON.StandardMaterial("tm", scene);
    terrainMaterial.diffuseTexture = terrainTexture;


    // wait for dynamic terrain extension to be loaded
    s.onload = function() {

        // callback function : terrain creation
        var terrain;
        var createTerrain = function(mapData, mapSubX, mapSubZ) {
            var params = {
                mapData: mapData,               // data map declaration : what data to use ?
                mapSubX: mapSubX,               // how are these data stored by rows and columns
                mapSubZ: mapSubZ,
                terrainSub: 120                 // how many terrain subdivisions wanted
            };
            terrain = new BABYLON.DynamicTerrain("t", params, scene);
            terrain.createUVMap();             // compute the UVs to stretch the image on the whole map
            terrain.mesh.material = terrainMaterial;
            terrain.update(true);
        };

        // Data Map
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

    }   // onload closing bracket
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
    scene.fogDensity = 0.009;
    scene.fogColor = new BABYLON.Color3(0.8,0.83,0.8);
    return scene;
}




