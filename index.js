// This example adds hide() and show() methods to a custom overlay's prototype.
// These methods toggle the visibility of the container <div>.
// overlay to or from the map.
import { classroom_data, searchClassroomsIndex } from "./Classroom_Data.JS";
var opened = false

function initMap() {

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 18,
    center: { lat: 43.119896426752995, lng: -77.54944500476694 },
    mapTypeId: "satellite",
  });

  const input = document.getElementById("input_search")
  const debugText = document.getElementById("debugText")

  // Click to register the location (Debug Feature)
  let infoWindowCoords = new google.maps.InfoWindow({
    content: "Click the map to get Lat/Lng!",
    position: { lat: 43.119896426752995, lng: -77.54944500476694 }
  });
  map.addListener("click", (mapMouseClick) => {
    // Close the current InfoWindow.
    infoWindowCoords.close();
    // Create a new InfoWindow.
    infoWindowCoords = new google.maps.InfoWindow({
      position: mapMouseClick.latLng,
    });
    infoWindowCoords.setContent(
      JSON.stringify(mapMouseClick.latLng.toJSON(), null, 2)
    );
    infoWindowCoords.open(map);
  })


  const infowindow = new google.maps.InfoWindow({
    content: "hello"
  });

  infowindow.addListener("closeclick", () => {
    opened = false;
  })

  const marker = new google.maps.Marker({
    position: new google.maps.LatLng(43.119792619374046, -77.5492980187146),
    map,
    title: "Hello World!",
    label: "Court Yard",
  });

  marker.addListener("click", () => {
    if (opened) {
      opened = false
      infowindow.close();
    } else {
      opened = true
      infowindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
      });
    }
  });

  const latSouth = 43.11901762438026
  const latNorth = 43.12045260645478
  const lngWest = -77.54985904953162
  const lngEast = -77.5484469979196

  const overlayCoordSW = new google.maps.LatLng(latSouth, lngWest)
  const overlayCoordNE = new google.maps.LatLng(latNorth, lngEast)
  const imgWidth = lngEast - lngWest;
  const imgHeight = latNorth - latSouth;

  const classroomMarkers = []

  for (let i = 0; i < classroom_data.length; i++) {
    let classroom = classroom_data[i]
    classroomMarkers[i] = new google.maps.Marker({
      position: new google.maps.LatLng(classroom.relativeCoord.height * imgHeight + latSouth,
        classroom.relativeCoord.width * imgWidth + lngWest),
      map: map,
      label: classroom.names[0],
      title: "hello"
    })
    classroomMarkers[i].setVisible(false)
  }


  input.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      input.blur()
      let hlIndex = searchClassroomsIndex(input.value)
      if (hlIndex.length === 0) {
        alert("result not found")
      }
      for (let i = 0; i < classroomMarkers.length; i++) {
        if (hlIndex.indexOf(i) !== -1) {
          classroomMarkers[i].setVisible(true)
        } else {
          classroomMarkers[i].setVisible(false)
        }
      }
    }
  })

  const bounds = new google.maps.LatLngBounds(
    overlayCoordSW,// southwest
    overlayCoordNE // northeast
  );

  /**
   * The custom HarleyOverlay object contains the USGS image,
   * the bounds of the image, and a reference to the map.
   */
  class HarleyOverlay extends google.maps.OverlayView {
    bounds;
    image;
    div;
    constructor(bounds, image) {
      super();
      this.bounds = bounds;
      this.image = image;
    }
    /**
     * onAdd is called when the map's panes are ready and the overlay has been
     * added to the map.
     */
    onAdd() {
      this.div = document.createElement("div");
      this.div.style.borderStyle = "none";
      this.div.style.borderWidth = "0px";
      this.div.style.position = "absolute";

      // Create the img element and attach it to the div.
      const img = document.createElement("img");

      img.src = this.image;
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.position = "absolute";
      img.style.transform = "rotate(270deg)"

      this.div.appendChild(img);

      // Add the element to the "overlayLayer" pane.
      const panes = this.getPanes();

      panes.overlayLayer.appendChild(this.div);
    }
    draw() {
      // We use the south-west and north-east
      // coordinates of the overlay to peg it to the correct position and size.
      // To do this, we need to retrieve the projection from the overlay.
      const overlayProjection = this.getProjection();
      // Retrieve the south-west and north-east coordinates of this overlay
      // in LatLngs and convert them to pixel coordinates.
      // We'll use these coordinates to resize the div.
      const sw = overlayProjection.fromLatLngToDivPixel(
        this.bounds.getSouthWest()
      );
      const ne = overlayProjection.fromLatLngToDivPixel(
        this.bounds.getNorthEast()
      );

      // Resize the image's div to fit the indicated dimensions.
      if (this.div) {
        this.div.style.left = sw.x + "px";
        this.div.style.top = ne.y + "px";
        this.div.style.width = ne.x - sw.x + "px";
        this.div.style.height = sw.y - ne.y + "px";
      }
    }
    /**
     * The onRemove() method will be called automatically from the API if
     * we ever set the overlay's map property to 'null'.
     */
    onRemove() {
      if (this.div) {
        this.div.parentNode.removeChild(this.div);
        delete this.div;
      }
    }
    /**
     *  Set the visibility to 'hidden' or 'visible'.
     */
    hide() {
      if (this.div) {
        this.div.style.visibility = "hidden";
      }
    }
    show() {
      if (this.div) {
        this.div.style.visibility = "visible";
      }
    }
    toggle() {
      if (this.div) {
        if (this.div.style.visibility === "hidden") {
          this.show();
        } else {
          this.hide();
        }
      }
    }
    toggleDOM(map) {
      if (this.getMap()) {
        this.setMap(null);
      } else {
        this.setMap(map);
      }
    }

  }
  const images = ["Ground_Floor.jpg", "First_Floor.jpg", "Second_Floor.jpg"]
  const overlays = [new HarleyOverlay(bounds, images[0]), new HarleyOverlay(bounds, images[1]), new HarleyOverlay(bounds, images[2])]
  let nCurrentImg = 0;
  function rotate() {
    for (let i = 0; i < overlays.length; i++) {
      if (i == nCurrentImg) {
        overlays[i].setMap(map);
      }
      else {
        overlays[i].setMap(null);
      }
    }
    nCurrentImg = (nCurrentImg + 1) % overlays.length;
  }
  rotate()

  const switchFloorsButton = document.createElement("button");
  switchFloorsButton.textContent = "Switch Floor"
  switchFloorsButton.classList.add("custom-map-control-button");
  switchFloorsButton.addEventListener("click", () => {
    rotate()
  })

  const toggleButton = document.createElement("button");

  toggleButton.textContent = "Toggle";
  toggleButton.classList.add("custom-map-control-button");


  toggleButton.addEventListener("click", () => {
    overlays[0].toggle();
    overlays[1].toggle()
    overlays[2].toggle()
  });


  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(switchFloorsButton);
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(toggleButton);
  map.controls[google.maps.ControlPosition.TOP].push(input);
  map.controls[google.maps.ControlPosition.LEFT].push(debugText);

}

window.initMap = initMap;