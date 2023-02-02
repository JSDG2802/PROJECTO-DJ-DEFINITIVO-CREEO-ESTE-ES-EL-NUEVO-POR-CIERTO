var derechaConfi = 0;
var izquierdaConfi = 0;
var remove_decimals = 0;
var muneca_derechaX = 0;
var muneca_derechaY = 0;
var muneca_izquierdaX = 0;
var muneca_izquierdaY = 0;
var mice_on_venus;
var numeroDerecha, remove_decimals, volume;

function setup() {
  video = createCapture(VIDEO);
  video.size(550, 550);
  canvas = createCanvas(550, 500);
  canvas.position(100, 270);
  PoseNet = ml5.poseNet(video, modelo_cargado);
  PoseNet.on("pose", obtain_poses);
}
function draw() {
  image(video, 0, 0, 400, 400);
  fill("red");
  stroke("blue");
  numeroDerecha = Number(muneca_derechaY);
  remove_decimals = floor(numeroDerecha);
  volume = remove_decimals;
  document.getElementById("trash").innerHTML = "volumen=" + volume;
  mice_on_venus.setVolume(volume);
  if (derechaConfi > 0.2) 
  {
    circle(muneca_derechaX, muneca_derechaY, 20);
    if (muneca_derechaY > 0 && muneca_derechaY <= 100) 
    {
      document.getElementById("trash").innerHTML = "Velocidad = 0.5x";
      mice_on_venus.rate(0.5);
    }
    if (muneca_derechaY > 100 && muneca_derechaY <= 200) 
    {
      document.getElementById("trash").innerHTML = "Velocidad = 1x";
      mice_on_venus.rate(1);
      if (muneca_derechaY > 200 && muneca_derechaY <= 300) 
      {
        document.getElementById("trash").innerHTML = "Velocidad = 1.5x";
        mice_on_venus.rate(1.5);
      }
      if (muneca_derechaY > 300 && muneca_derechaY <= 400) 
      {
        document.getElementById("trash").innerHTML = "Velocidad = 2x";
        mice_on_venus.rate(2);
      }
      if (muneca_derechaY > 400) 
      {
        document.getElementById("trash").innerHTML = "Velocidad = 2.5x";
        mice_on_venus.rate(2.5);
      }
    }
  }
  if(izquierdaConfi>0.2)
  {
   circle(muneca_izquierdaX, muneca_izquierdaY, 20);
   numeroIzquierda = Number(muneca_izquierdaY);
   remove_decimals = floor(numeroIzquierda);
   volume = remove_decimals;
   document.getElementById("rat").innerHTML = "volumen=" + volume;
   mice_on_venus.setVolume(volume);
  }
}
function preload() {
  mice_on_venus = loadSound("canción Minecraft.mp3")
}
function play() {
  mice_on_venus.play();
  mice_on_venus.setVolume(1);
   mice_on_venus.rate(1);
}
function modelo_cargado() {
  console.log("model loaded");
}
function obtain_poses(results) {
  if (results.length > 0) {
    //console.log(results);
    derechaConfi = results[0].pose.keypoints[10].score;
    izquierdaConfi = results[0].pose.keypoints[9].score;
    muneca_derechaX = results[0].pose.rightWrist.x;
    muneca_derechaY = results[0].pose.rightWrist.y;

    muneca_izquierdaX = results[0].pose.leftWrist.x;
    muneca_izquierdaY = results[0].pose.leftWrist.y;
    //console.log(muneca_izquierdaX+" "+muneca_izquierdaY)
    //console.log(muneca_derechaX+" "+muneca_derechaY)
  }
}