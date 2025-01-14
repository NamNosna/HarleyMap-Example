// This example adds hide() and show() methods to a custom overlay's prototype.
// These methods toggle the visibility of the container <div>.
// overlay to or from the map.

import { node_data, searchNodeIndex, pathFinder } from "./Classroom_Data.JS";


function initMap() {

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 18,
    center: { lat: 43.119896426752995, lng: -77.54944500476694 },
    mapTypeId: "satellite",
  });

  const input1 = document.getElementById("input_search1")
  const debugText = document.getElementById("debugText")
  const pathEndsDisplay = document.getElementById("pathEndsDisplay")


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

    reset()
  })


  const infowindow = new google.maps.InfoWindow({
    content: "hello"
  });

  infowindow.addListener("closeclick", () => {
  })


  const nodeMarkers = []
  const nodeInfos = []
  const nodeOpened = []


  let selectedLocKey = "";
  let startKey = ""
  let endKey = ""
  
  //set Start and end of path Finders
  const setStartButton = document.getElementById("setStartButton");
  const setEndButton = document.getElementById("setEndButton");
  const startDescription = document.getElementById("startDescription")
  const endDescription = document.getElementById("endDescription")

  setStartButton.addEventListener("click", () => {

    if(selectedLocKey.length !=0){
      startKey = selectedLocKey
      const node = node_data[selectedLocKey]
      startDescription.innerText = "start: " + node.names[0]
      document.getElementById("startFrame").setAttribute("class", "imgFrame")
      document.getElementById("startImgDisplay").setAttribute("src", node.imgURL)
    }
    reset()
  })

  setEndButton.addEventListener("click", () => {

    if(selectedLocKey.length !=0){
      endKey = selectedLocKey
      const node = node_data[selectedLocKey]
      endDescription.innerText = "end: " + node.names[0]
      document.getElementById("endFrame").setAttribute("class", "imgFrame")
      document.getElementById("endImgDisplay").setAttribute("src", node.imgURL)
    }
    reset()
  })



  //set up bubbles for each of the nodes
  for (let i = 0; i < Object.keys(node_data).length; i++) {
    let [name, node] = Object.entries(node_data)[i];
    //initialize all markers
    nodeMarkers[i] = new google.maps.Marker({
      position: new google.maps.LatLng(node.coord.lat,
        node.coord.lng),
      map: map,
      label: node.names[0]
    })
    nodeMarkers[i].setVisible(false)

    //setting the infoWindow content
    let infoContent = ""

    if (node.imgURL.length !== 0) {
      infoContent = `<div class = imgFrame><img src="${node.imgURL}" class = img></div>`
    }
    if (!node.isNode){
      if(node.classroomInfo.Teachers.length !== 0){
        infoContent += `<p>Teacher(s): ${JSON.stringify(node.classroomInfo.Teachers)}</p>`
      }
      if(node.classroomInfo.Courses.length !== 0){
        infoContent += `<p>Courses(s): ${JSON.stringify(node.classroomInfo.Courses)}</p>`
      }
    }
    nodeOpened[i] = false
    //initialize the infoWindow
    nodeInfos[i] = new google.maps.InfoWindow({
      content: infoContent
    })

    google.maps.event.addListener(nodeInfos[i],"closeclick", () => {
      nodeOpened[i] = false;
    })

    //call the infowindow when marker is clicked
    nodeMarkers[i].addListener("click", () => {
      reset()
      selectedLocKey = name;
      nodeMarkers[i].setOpacity(0.5)
      rotateTo(node.Floor)
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

  //reset
  function reset() {
    selectedLocKey = ""
    for(let i =0; i < nodeMarkers.length; i ++){
      nodeMarkers[i].setOpacity(1)
    }
  }

  //path search
  const searchButton = document.getElementById("searchButton")
  searchButton.addEventListener("click", () => {

    if(startKey === "" || endKey === ""){
      debugText.innerText = "void keys"
      return
    }

    let route = searchNodeIndex(pathFinder(startKey, endKey))
    startKey = ""
    endKey = ""
    debugText.innerText += route
    for (let i = 0; i < nodeMarkers.length; i++) {
      if (route.indexOf(i) !== -1) {
        nodeMarkers[i].setVisible(true)
      } else {
        nodeMarkers[i].setVisible(false)
      }
    }
    document.getElementById("startImgDisplay").removeAttribute("src")
    document.getElementById("endImgDisplay").removeAttribute("src")
    document.getElementById("endFrame").setAttribute("class", "hide")
    document.getElementById("startFrame").setAttribute("class", "hide")
    endDescription.innerText = "End: "
    startDescription.innerText = "Start: "
    reset()
  })

  input1.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      inputProcess()
    }
    reset()
  })

  function inputProcess() {
    input1.blur()

    let nodeIndex = searchNodeIndex(input1.value)

    document.getElementById("debugText").innerHTML = nodeIndex
    if (nodeIndex.length === 0) {
      alert("result not found")
    }
    for (let i = 0; i < nodeMarkers.length; i++) {
      if (nodeIndex.indexOf(i) !== -1) {
        nodeMarkers[i].setVisible(true)
      } else {
        nodeMarkers[i].setVisible(false)
      }
    }
  }

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

  const bounds = [];
  bounds[0] = new google.maps.LatLngBounds(
    new google.maps.LatLng(43.11901762438026, -77.54985904953162),// southwest
    new google.maps.LatLng(43.12045260645478, -77.5484469979196) // northeast
  );
  bounds[1] = new google.maps.LatLngBounds(
    new google.maps.LatLng(43.11907597448908, -77.55025507563087),// southwest
    new google.maps.LatLng(43.12070696554435, -77.54857088522893) // northeast
  );
  bounds[2] = new google.maps.LatLngBounds(
    new google.maps.LatLng( 43.11916215247135, -77.55021611743767),// southwest
    new google.maps.LatLng(43.12066087790673,  -77.54857787829819) // northeast
  )

  const images = ["Ground_Floor.jpg", "First_Floor.jpg", "Second_Floor.jpg"]
  const overlays = [new HarleyOverlay(bounds[0], images[0]), new HarleyOverlay(bounds[1], images[1]), new HarleyOverlay(bounds[2], images[2])]
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
  function rotateTo(index){
    for(let i = 0; i < overlays.length; i++){
      if (i == index) {
        overlays[i].setMap(map);
      }
      else {
        overlays[i].setMap(null);
      }
    }
  }


  const switchFloorsButton = document.createElement("button");
  switchFloorsButton.textContent = "Switch Floor"
  switchFloorsButton.classList.add("custom-map-control-button");
  switchFloorsButton.addEventListener("click", () => {
    rotate()
  })

  const toggleButton = document.createElement("button");

  toggleButton.textContent = "Toggle";
  toggleButton.classList.add("custom-map-control-button");

  const clearButton = document.createElement("button");
  clearButton.textContent = "Clear User Input"
  clearButton.classList.add("custom-map-control-button");
  clearButton.addEventListener("click", ()=>{
    for(let i =0; i < nodeMarkers.length; i ++){
      nodeMarkers[i].setOpacity(1)
      nodeMarkers[i].setVisible(false)
      nodeOpened[i] = false;
      nodeInfos[i].close()
    }
    selectedLocKey = ""
    startKey = ""
    endKey = ""
    document.getElementById("startImgDisplay").removeAttribute("src")
    document.getElementById("endFrame").setAttribute("class", "hide")
    document.getElementById("startFrame").setAttribute("class", "hide")
    document.getElementById("endImgDisplay").removeAttribute("src")
    endDescription.innerText = "end: "
    startDescription.innerText = "start: "  
  })
  

  toggleButton.addEventListener("click", () => {
    overlays[0].toggle();
    overlays[1].toggle()
    overlays[2].toggle()
  });


  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(switchFloorsButton);
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(toggleButton);
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(clearButton);
  map.controls[google.maps.ControlPosition.TOP].push(input1);
  map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(debugText);
  map.controls[google.maps.ControlPosition.LEFT].push(pathEndsDisplay);

}

window.initMap = initMap;