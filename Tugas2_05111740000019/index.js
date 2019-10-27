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

    function line()
    {
      gl.useProgram(program2);
      var linesVertices = new Float32Array([
        //kiri luar
        -0.65,0.5,        1.0, 0.0, 1.0,  
        -0.85,-0.6,       1.0, 0.0, 1.0, 
        //kanan luar
        -0.65,0.5,        0.1, 0.0, 1.0,
        -0.45,-0.6,       0.1, 0.0, 1.0,
        //kiri dalam
        -0.85,-0.6,       0.1, 1.0, 0.6,
        -0.65, -0.1,      0.1, 1.0, 0.6,
        //kanan dalam
        -0.45,-0.6,       1.0, 0.0, 1.0,
        -0.65, -0.1,      1.0, 0.0, 1.0,
        //kanan kecil
        -0.65,0.3,        0.1, 0.0, 1.0,
        -0.6,0,           0.1, 0.0, 1.0,
        //kiri kecil
        -0.65,0.3,        0.1, 1.0, 0.6,
        -0.7,0,           0.1, 1.0, 0.6,
        //kiri kecil bawah
        -0.7,0,           1.0, 0.0, 1.0,
        -0.65,0.1,        1.0, 0.0, 1.0,
        //kanan kecil bawah
        -0.6,0,           0.1, 0.0, 1.0,
        -0.65,0.1,        0.1, 0.0, 1.0
      ]);

      var linesVerticesBufferObject = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, linesVerticesBufferObject);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(linesVertices), gl.STATIC_DRAW);

      var vPosition = gl.getAttribLocation(program2, 'vPosition');
      var vColor = gl.getAttribLocation(program2, 'vColor');
      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
      //(vPosition, 2, type, normalized, stride, offset);
      gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);

      gl.enableVertexAttribArray(vPosition);
      gl.enableVertexAttribArray(vColor);

      sudut += Math.PI * 0.0019; // 0.0(3 digit NRP)
      gl.uniform1f(sudutLoc2, sudut);
    }
    
    function triangle()
    {
      gl.useProgram(program);

      var triangleVertices = new Float32Array([
        -0.55,0.6,
        -0.4,0,
        -0.35, 0.1,
        -0.35,-0.1,
        -0.35, 0.1,
        -0.3,0,
        -0.15,0.6,
        -0.35,-0.5,
        -0.35,-0.3,
        -0.3,0,
        -0.35,-0.3,
        -0.35,-0.5,
        -0.4,0,
        -0.55,0.6,
        -0.35,-0.5,
        -0.35,-0.3
      ]);

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

      
      if (scale >= 1) membesar = -1;
      else if (scale <= -1) membesar = 1;
      scale = scale + (membesar * 0.0019); // 0.0(3 digit NRP)
      gl.uniform1f(scaleLoc, scale);
      
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
      gl.clear(gl.COLOR_BUFFER_BIT);


      line();
      gl.drawArrays(gl.LINES, 0, 16);

      triangle();
      gl.drawArrays(gl.TRIANGLE_STRIP, 0,16);
      
      requestAnimationFrame(render);
    }
    render();
  }

})();
