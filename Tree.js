Tree = function(sizeBranch, sizeTrunk, radius, scene, sd, ball) {
    // Call the super class BABYLON.Mesh
    BABYLON.Mesh.call(this, "tree", scene);

    this._init(sizeBranch);

    this.ball=ball;

    this.material = new BABYLON.StandardMaterial("mat", scene);
    this.material.diffuseColor = BABYLON.Color3.Green();
    this.material.specularColor = BABYLON.Color3.Black();
    this.position.y = 9;

    var trunk = BABYLON.Mesh.CreateCylinder("trunk", sizeTrunk, radius-2<1?1:radius-2, radius, 7, 2, scene );
    trunk.parent = this;
    trunk.position.y = -6;


    trunk.actionManager = new BABYLON.ActionManager(scene);

        // on collision with ball
    var trigger = {trigger:BABYLON.ActionManager.OnIntersectionEnterTrigger, parameter: ball};
    var exec = new BABYLON.SwitchBooleanAction(trigger, ball, "crash");
    trunk.actionManager.registerAction(exec);
    


    trunk.material = new BABYLON.StandardMaterial("trunk", scene);
    trunk.material.diffuseColor = BABYLON.Color3.FromInts(128,0,0);
    trunk.material.specularColor = BABYLON.Color3.Black();
    trunk.convertToFlatShadedMesh();

    this.trunk = trunk;

    sd.getShadowMap().renderList.push(this);
    sd.getShadowMap().renderList.push(this.trunk);

};

// Our object is a BABYLON.Mesh
Tree.prototype = Object.create(BABYLON.Mesh.prototype);
Tree.prototype.constructor = Tree;


Tree.prototype._init = function(sizeBranch) {

    var vertexData = BABYLON.VertexData.CreateSphere(2,sizeBranch);
    vertexData.applyToMesh(this, false);

    var positions = this.getVerticesData(BABYLON.VertexBuffer.PositionKind);
    var indices = this.getIndices();
    var numberOfPoints = positions.length/3;

    var map = [];
    var v3 = BABYLON.Vector3;
    var max = [];

    for (var i=0; i<numberOfPoints; i++) {
        var p = new v3(positions[i*3], positions[i*3+1], positions[i*3+2]);

        if (p.y >= sizeBranch/2) {
            max.push(p);
        }

        var found = false;
        for (var index=0; index<map.length&&!found; index++) {
            var array = map[index];
            var p0 = array[0];
            if (p0.equals (p) || (p0.subtract(p)).lengthSquared() < 0.01){
                array.push(i*3);
                found = true;
            }
        }
        if (!found) {
            var array = [];
            array.push(p, i*3);
            map.push(array);
        }

    }

    var randomNumber = function (min, max) {
        if (min == max) {
            return (min);
        }
        var random = Math.random();
        return ((random * (max - min)) + min);
    };

    var that = this;
    map.forEach(function(array) {
        var index, min = -sizeBranch/10, max = sizeBranch/10;
        var rx = randomNumber(min,max);
        var ry = randomNumber(min,max);
        var rz = randomNumber(min,max);

        for (index = 1; index<array.length; index++) {
            var i = array[index];
            positions[i] += rx;
            positions[i+1] += ry;
            positions[i+2] += rz;
        }
    });

    this.setVerticesData(BABYLON.VertexBuffer.PositionKind, positions);
    var normals = [];
    BABYLON.VertexData.ComputeNormals(positions, indices, normals);
    this.setVerticesData(BABYLON.VertexBuffer.NormalKind, normals);
    this.convertToFlatShadedMesh();

};