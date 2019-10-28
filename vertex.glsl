precision mediump float;
#define pi 3.14
attribute vec2 vPosition;
attribute vec3 vColor;
varying vec3 fColor;
uniform vec3 sudut;
uniform mat4 projection;
uniform mat4 view;
uniform float scale;
uniform vec3 mantul;
uniform float tengah;

void main() {
  fColor = vColor;
  mat4 translate = mat4(
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, -2.0, 1.0         // Kita geser setiap verteks sejau 2 unit menjauhi kamera, untuk memastikan seluruh bagian kubus ada di antara near dan far.
  );

  mat4 mantul = mat4(
    1.0, 0.0, 0.0, mantul.x,
    0.0, 1.0, 0.0, mantul.y,
    0.0, 0.0, 1.0, mantul.z,
    0.0, 0.0, 0.0, 1.0        
  );

  // p' = p
  // p' = T * p
  //float sudut=0.5*pi;
  // mat4 rotasi = mat4(
  //   cos(sudut), -sin(sudut), 0.0, 0.0,
  //   sin(sudut), cos(sudut), 0.0, 0.0,
  //   0.0, 0.0, 1.0, 0.0,
  //   0.0, 0.0, 0.0, 1.0
  // );
  // gl_Position = gl_Position * rotasi;

  
  vec4 tengah_vektor = vec4(tengah, 0, 0, 1.0);

  mat4 skalasi = mat4(
    scale, 0.0, 0.0, -(tengah_vektor.x)*scale + (tengah_vektor.x),
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  gl_Position = vec4(vPosition, 0.0, 1.0) * mantul * skalasi; //wajib diisi
  gl_Position = projection * view * translate *  gl_Position ;
}