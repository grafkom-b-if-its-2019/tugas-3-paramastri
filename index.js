var gerak2 = [0.0, 0.0, 0.0];
var xAdder = 0.02;
var yAdder = 0.003;
var zAdder = 0.004;
(function() {

    glUtils.SL.init({ callback: function() { main(); } });

    function main() {
        var canvas = document.getElementById("glcanvas");
        var gl = glUtils.checkWebGL(canvas);

        // Inisialisasi shaders dan program
        console.log("\nVERTEX SOURCE CODE:\n" + glUtils.SL.Shaders.v1.vertex);
        console.log("\nFRAGMENT SOURCE CODE:\n" + glUtils.SL.Shaders.v1.fragment);
        var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
        var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
        var vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);
        var fragmentShader2 = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v2.fragment);
        var program = glUtils.createProgram(gl, vertexShader, fragmentShader);
        var program2 = glUtils.createProgram(gl, vertexShader2, fragmentShader2);


        //LINE -> PROGRAM2
        //TRIANGLE -> PROGRAM

        function cube() {
            gl.useProgram(program2);
            var cubeVertices = [
              // x, y, z            r, g, b
            //   -0.5,  0.5,  0.5,     1.0, 0.0, 0.0,  // depan, merah, BAD BDC
            //   -0.5, -0.5,  0.5,     1.0, 0.0, 0.0,
            //    0.5, -0.5,  0.5,     1.0, 0.0, 0.0,
            //   -0.5,  0.5,  0.5,     1.0, 0.0, 0.0,
            //    0.5, -0.5,  0.5,     1.0, 0.0, 0.0,
            //    0.5,  0.5,  0.5,     1.0, 0.0, 0.0,

              -0.5,  0.5,  0.5,     1.0, 0.0, 0.0,  // depan, merah, BAD BDC
              -0.5, -0.5,  0.5,     1.0, 0.0, 0.0,
              0.5,  0.5,  0.5,     1.0, 0.0, 0.0,
              -0.5,  0.5,  0.5,     1.0, 0.0, 0.0,
               0.5, -0.5,  0.5,     1.0, 0.0, 0.0,
               0.5,  0.5,  0.5,     1.0, 0.0, 0.0,
               -0.5, -0.5,  0.5,     1.0, 0.0, 0.0,
               0.5, -0.5,  0.5,     1.0, 0.0, 0.0,

               0.5,  0.5,  0.5,     0.0, 1.0, 0.0,  // kanan, hijau, CDH CHG
               0.5, -0.5,  0.5,     0.0, 1.0, 0.0,
               0.5,  0.5, -0.5,     0.0, 1.0, 0.0,
               0.5,  0.5,  0.5,     0.0, 1.0, 0.0,
               0.5, -0.5, -0.5,     0.0, 1.0, 0.0,
               0.5,  0.5, -0.5,     0.0, 1.0, 0.0,
               0.5, -0.5,  0.5,     0.0, 1.0, 0.0,
               0.5, -0.5, -0.5,     0.0, 1.0, 0.0,

               0.5, -0.5,  0.5,     0.0, 0.0, 1.0,  // bawah, biru, DAE DEH
              -0.5, -0.5,  0.5,     0.0, 0.0, 1.0,
              0.5, -0.5, -0.5,     0.0, 0.0, 1.0,
               0.5, -0.5,  0.5,     0.0, 0.0, 1.0,
              -0.5, -0.5, -0.5,     0.0, 0.0, 1.0,
               0.5, -0.5, -0.5,     0.0, 0.0, 1.0,
               -0.5, -0.5,  0.5,     0.0, 0.0, 1.0,
               -0.5, -0.5, -0.5,     0.0, 0.0, 1.0,

              -0.5, -0.5, -0.5,     1.0, 1.0, 0.0,  // belakang, kuning, EFG EGH
              -0.5,  0.5, -0.5,     1.0, 1.0, 0.0,
              0.5, -0.5, -0.5,     1.0, 1.0, 0.0,
              -0.5, -0.5, -0.5,     1.0, 1.0, 0.0,
               0.5,  0.5, -0.5,     1.0, 1.0, 0.0,
               0.5, -0.5, -0.5,     1.0, 1.0, 0.0,
               -0.5,  0.5, -0.5,     1.0, 1.0, 0.0,
               0.5,  0.5, -0.5,     1.0, 1.0, 0.0,

              -0.5,  0.5, -0.5,     0.0, 1.0, 1.0,  // kiri, cyan, FEA FAB
              -0.5, -0.5, -0.5,     0.0, 1.0, 1.0,
              -0.5,  0.5,  0.5,     0.0, 1.0, 1.0,
              -0.5,  0.5, -0.5,     0.0, 1.0, 1.0,
              -0.5, -0.5,  0.5,     0.0, 1.0, 1.0,
              -0.5,  0.5,  0.5,     0.0, 1.0, 1.0,
              -0.5, -0.5, -0.5,     0.0, 1.0, 1.0,
              -0.5, -0.5,  0.5,     0.0, 1.0, 1.0,

               0.5,  0.5, -0.5,     1.0, 0.0, 1.0,  // atas, magenta, GFB GBC
              -0.5,  0.5, -0.5,     1.0, 0.0, 1.0,
              0.5,  0.5,  0.5,     1.0, 0.0, 1.0,
               0.5,  0.5, -0.5,     1.0, 0.0, 1.0,
              -0.5,  0.5,  0.5,     1.0, 0.0, 1.0,
               0.5,  0.5,  0.5,     1.0, 0.0, 1.0,
               -0.5,  0.5, -0.5,     1.0, 0.0, 1.0,
               -0.5,  0.5,  0.5,     1.0, 0.0, 1.0
            ];

            var cubeVBO = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, cubeVBO);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertices), gl.STATIC_DRAW);

            var vPosition = gl.getAttribLocation(program2, 'vPosition');
            var vColor = gl.getAttribLocation(program2, 'vColor');
            gl.vertexAttribPointer(
            vPosition,  // variabel yang memegang posisi attribute di shader
            3,          // jumlah elemen per attribute
            gl.FLOAT,   // tipe data atribut
            gl.FALSE,
            6 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks 
            0                                   // offset dari posisi elemen di array
            );
            gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE, 
            6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);

            gl.enableVertexAttribArray(vPosition);
            gl.enableVertexAttribArray(vColor);

            // Definisi view dan projection
            var vmLoc = gl.getUniformLocation(program2, 'view');
            var pmLoc = gl.getUniformLocation(program2, 'projection');
            var vm = glMatrix.mat4.create();
            var pm = glMatrix.mat4.create();
        
            glMatrix.mat4.lookAt(vm,
              glMatrix.vec3.fromValues(0.0, 0.0, 0.0),    // posisi kamera
              glMatrix.vec3.fromValues(0.0, 0.0, -2.0),  // titik yang dilihat; pusat kubus akan kita pindah ke z=-2
              glMatrix.vec3.fromValues(0.0, 1.0, 0.0)   // arah atas dari kamera
            );
        
            var fovy = glMatrix.glMatrix.toRadian(90.0);
            var aspect = canvas.width / canvas.height;
            var near = 0.5;
            var far = 10.0;
            glMatrix.mat4.perspective(pm,
              fovy,
              aspect,
              near,
              far
            );
        
            gl.uniformMatrix4fv(vmLoc, false, vm);
            gl.uniformMatrix4fv(pmLoc, false, pm);

        }

        function triangle() {
            gl.useProgram(program);

            var triangleVertices = new Float32Array([
                -0.45,0.6,
                -0.3,0,
                -0.25, 0.1,
                -0.25,-0.1,
                -0.25, 0.1,
                -0.2,0,
                -0.05,0.6,
                -0.25,-0.5,
                -0.25,-0.3,
                -0.2,0,
                -0.25,-0.3,
                -0.25,-0.5,
                -0.3,0,
                -0.45,0.6,
                -0.25,-0.5,
                -0.25,-0.3]);

            var triangleVertexBufferObject = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

            var vPosition = gl.getAttribLocation(program, 'vPosition');
            // var vColor = gl.getAttribLocation(program, 'vColor');
            // gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
            gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
            //(vPosition, 2, type, normalized, stride, offset);
            // gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
            // gl.enableVertexAttribArray(vPosition);

            var gerak = gl.getUniformLocation(program, 'mantul');
            if (gerak2[0] + (-0.45)  < -0.5* 1.5 || gerak2[0] + (-0.05)  > 0.5* 1.5) {
                xAdder*=-1;
            }

            gerak2[0] += xAdder;
            var middle_point = -0.3 + gerak2[0];
            var tengah = gl.getUniformLocation(program, 'tengah');
            
            gl.uniform1f(tengah, middle_point);

            // console.log(gerak2[0]);

            if (gerak2[1] + (-0.5) < -0.5*1.5 || gerak2[1] + 0.6 > 0.5*1.5) {
                yAdder*=-1;
            }

            gerak2[1] += yAdder;

            if (gerak2[2] < -0.5*1.5 || gerak2[2] > 0.5*1.5) {
                zAdder*=-1;
            }

            gerak2[2] += zAdder;
            
            gl.uniform3fv(gerak, gerak2);
            

            if (scale >= 1) membesar = -1;
            else if (scale <= -1) membesar = 1;
            scale = scale + (membesar * 0.0119); 
            gl.uniform1f(scaleLoc, scale);

            // Definisi view dan projection
            var vmLoc = gl.getUniformLocation(program, 'view');
            var pmLoc = gl.getUniformLocation(program, 'projection');
            var vm = glMatrix.mat4.create();
            var pm = glMatrix.mat4.create();

            glMatrix.mat4.lookAt(vm,
            glMatrix.vec3.fromValues(0.0, 0.0, 0.0),    // posisi kamera
            glMatrix.vec3.fromValues(0.0, 0.0, -2.0),  // titik yang dilihat; pusat kubus akan kita pindah ke z=-2
            glMatrix.vec3.fromValues(0.0, 1.0, 0.0)   // arah atas dari kamera
            );

            var fovy = glMatrix.glMatrix.toRadian(90.0);
            var aspect = canvas.width / canvas.height;
            var near = 0.5;
            var far = 10.0;
            glMatrix.mat4.perspective(pm,
            fovy,
            aspect,
            near,
            far
            );

            gl.uniformMatrix4fv(vmLoc, false, vm);
            gl.uniformMatrix4fv(pmLoc, false, pm);

        }


        var sudutLoc = gl.getUniformLocation(program, 'sudut');
        var sudutLoc2 = gl.getUniformLocation(program2, 'sudut');
        var sudut = 0;
        var scaleLoc = gl.getUniformLocation(program, 'scale');
        var scaleLoc2 = gl.getUniformLocation(program2, 'scale');
        var scale = 1;
        var membesar = 1;

        function render() {
           
            
            // Bersihkan layar jadi hitam
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            // Bersihkan buffernya canvas
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            cube();
            gl.drawArrays(gl.LINES, 0, 48);

            triangle();
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 16);
            

            requestAnimationFrame(render);
        }
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        render();
    }

})
();