var map = L.map('map').setView([43.39161392884635, -3.7276212668677426], 18);
var puntazos = [];
var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1
}).addTo(map);

function dibujarArea() {
  var fileInput = document.getElementById("file_input");
  fileInput.addEventListener("change", (event) => {
    var file = event.target.files[0];
    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function () {
      let buffer = reader.result.split("\n");
      let puntos = [];
      for (c of buffer) {
        let coordenadas = c.split(";");
        console.info(coordenadas);
        if (c != ""){
          puntos.push([parseFloat(coordenadas[0]), parseFloat(coordenadas[1])]);
        }
      }
      puntazos = puntos;
      console.info(puntazos);
      var p = L.polygon(puntazos, { color: `green` }).addTo(map);
      map.fitBounds(p.getBounds());
      console.info(puntos);
    };
  }, false);
}

dibujarArea();