// This example adds hide() and show() methods to a custom overlay's prototype.
// These methods toggle the visibility of the container <div>.
// overlay to or from the map.

import { classroom_data, searchClassroomsIndex, node_data, searchNodeIndex, pathFinder } from "./Classroom_Data.JS";


function initMap() {

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 18,
    center: { lat: 43.119896426752995, lng: -77.54944500476694 },
    mapTypeId: "satellite",
  });

  const input1 = document.getElementById("input_search1")
  const input2 = document.getElementById("input_search2")
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
  })


  const latSouth = 43.11901762438026
  const latNorth = 43.12045260645478
  const lngWest = -77.54985904953162
  const lngEast = -77.5484469979196

  const overlayCoordSW = new google.maps.LatLng(latSouth, lngWest)
  const overlayCoordNE = new google.maps.LatLng(latNorth, lngEast)
  const imgWidth = lngEast - lngWest;
  const imgHeight = latNorth - latSouth;

  const classroomMarkers = []
  const nodeMarkers = []
  const classroomInfos = []
  const nodeInfos = []
  const opened = []
  const nodeOpened = []

  //set up bubbles for each of the rooms
  for (let i = 0; i < classroom_data.length; i++) {
    let classroom = classroom_data[i]

    //initialize all markers
    classroomMarkers[i] = new google.maps.Marker({
      position: new google.maps.LatLng(classroom.coord.lat,
        classroom.coord.lng),
      map: map,
      label: classroom.Names[0]
    })
    classroomMarkers[i].setVisible(false)

    //setting the infoWindow content
    let infoContent = ""
    for (const [key, value] of Object.entries(classroom_data[i])) {
      if (value.length > 0) {
        infoContent += key + ": "
        for (const valueterm of value) {
          infoContent += valueterm + ", "
        }
        infoContent = infoContent.substring(0, infoContent.length - 2) + "\n"
      }
    }

    opened[i] = false
    //initialize the infoWindow
    classroomInfos[i] = new google.maps.InfoWindow({
      content: infoContent
    })

    //call the infowindow when marker is clicked
    classroomMarkers[i].addListener("click", () => {
      if (opened[i]) {
        opened[i] = false;
        classroomInfos[i].close()
      } else {
        opened[i] = true;
        classroomInfos[i].open({
          anchor: classroomMarkers[i],
          map,
          shouldFocus: false,
        })
      }
    })
  }

  //set up bubbles for each of the nodes
  for (let i = 0; i < Object.keys(node_data).length; i++) {
    let [name, node] = Object.entries(node_data)[i];
    //initialize all markers
    nodeMarkers[i] = new google.maps.Marker({
      position: new google.maps.LatLng(node.coord.lat,
        node.coord.lng),
      map: map,
      label: node.description
    })
    nodeMarkers[i].setVisible(false)

    //setting the infoWindow content
    let infoContent = ""

    if (node.imgURL.length !== 0) {
      infoContent = `<div class = imgFrame><img src='${node.imgURL}' class = img></div>`
    }

    nodeOpened[i] = false
    //initialize the infoWindow
    nodeInfos[i] = new google.maps.InfoWindow({
      content: infoContent
    })

    //call the infowindow when marker is clicked
    nodeMarkers[i].addListener("click", () => {
      if (nodeOpened[i]) {
        nodeOpened[i] = false;
        nodeInfos[i].close()
      } else {
        nodeOpened[i] = true;
        nodeInfos[i].open({
          anchor: nodeMarkers[i],
          map,
          shouldFocus: false,
        })
      }
    })
  }

  input1.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      inputProcess()
    }
  })
  input2.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      inputProcess()
    }
  })

  function inputProcess() {
    input1.blur()
    input2.blur()
    //if there are things on input 2, which enables pathfinder
    if (input2.value !== "") {
      if (input1.value === "") {
        alert("must enter a starting point")
      } else {
        
        let result = pathFinder(node_data, input1.value, input2.value)
        /* Uncomment to test Result
        document.getElementById("debugText").innerHTML += "result returned" + result
        if (result.length === 0) {
          document.getElementById("debugText").innerHTML += "no available path found"
        } else {
          document.getElementById("debugText").innerHTML += "result returned" + result
        } */
        
        
      }
    }
    //if only input 1 is filled, perform a search
    else {
      let hlIndex = searchClassroomsIndex(input1.value)
      let nodeIndex = searchNodeIndex(input1.value)

      document.getElementById("debugText").innerHTML += nodeIndex
      if (hlIndex.length === 0 && nodeIndex.length === 0) {
        alert("result not found")
      }
      for (let i = 0; i < classroomMarkers.length; i++) {
        if (hlIndex.indexOf(i) !== -1) {
          classroomMarkers[i].setVisible(true)
        } else {
          classroomMarkers[i].setVisible(false)
        }
      }
      for (let i = 0; i < nodeMarkers.length; i++) {
        if (nodeIndex.indexOf(i) !== -1) {
          nodeMarkers[i].setVisible(true)
        } else {
          nodeMarkers[i].setVisible(false)
        }
      }
    }
  }

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
  map.controls[google.maps.ControlPosition.TOP].push(input1);
  map.controls[google.maps.ControlPosition.TOP].push(input2);
  map.controls[google.maps.ControlPosition.LEFT].push(debugText);

}

window.initMap = initMap;