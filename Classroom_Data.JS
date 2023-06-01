const node_data = {
    "f1": {
        "coord":
        {
            "lat": 43.11955933165715, "lng": -77.54916891084746
        },
        "names": ["gallery",],
        "imgURL": "LocationPictures\\HarleyPic_GalleryLeft.jpg",
        "adjacency": [
            'f2',
            'f5',
            "f9"
        ],
        "Floor": 1,
        "isNode": true,
    },
    'f2': {
        "coord":
        {
            "lat": 43.11998918301855, "lng": -77.54914021849272
        },
        "names": ["library corner"],
        "imgURL": "LocationPictures\\Library_Corner.jpg",
        "adjacency": [
            'f1',
            "f4"
        ],
        "Floor": 1,
        "isNode": true,
    },
    'f3': {
        "coord":
        {
            "lat": 43.120199871931625, "lng": -77.54947828974632
        },
        "names": ["Beckerman"],
        "imgURL": "LocationPictures\\Beckerman.jpg",
        "adjacency": [
            "f4", 'f8'
        ],
        "Floor": 1,
        "isNode": true,
    },
    'f4': {
        "coord": {
            "lat": 43.119986643308565, "lng": -77.54948705531223
        },
        "names": ["English-Math-Beckerman intersection"],
        "imgURL": "LocationPictures\\English_Math_Beckerman_intersection.jpg",
        "adjacency": [
            "f3", "f2","f9"
        ],
        "Floor": 1,
        "isNode": true,
    },
    'f5': {
        "coord": {
            "lat": 43.119306533764416, "lng": -77.54887863908304
        },
        "names": ["Art Room intersection"],
        "imgURL": "LocationPictures\\Art_Room.jpg",
        "adjacency": [
            'f1'
        ],
        "Floor": 1,
        "isNode": true,
    },
    'f6': {
        "coord": {
            "lat": 0,
            "lng": 0
        },
        "names": [],
        "imgURL": "",
        "adjacency": [

        ],
        "Floor": 1,
        "isNode": true,
    },
    'f7': {
        "coord":
        {
            "lat": 43.11957086352588,
            "lng": -77.54956983554084
        },
        "names":
            [
                "Dining Hall", "Cafeteria"
            ],
        "imgURL": "LocationPictures\\cafeteria.jpg",
        "adjacency": [

        ],
        "Floor": 1,
        "isNode": true,
    },
    'f8': {
        "coord":
        {
            "lat": 43.120226123323384, 
            "lng": -77.54973271139298
        },
        "names":
            [
                "Flag Hall",
            ],
        "imgURL": "LocationPictures\\Flaghall.jpg",
        "adjacency": [
            'f3',
        ],
        "Floor": 1,
        "isNode": true,
    },
    'f9': {
        "coord":
        {
            "lat": 43.119564466252314, "lng": -77.54947748576532
        },
        "names":
            [
                "Math-Language Hallway intersection",
            ],
        "imgURL": "",
        "adjacency": [
            'f4',"f1"
        ],
        "Floor": 1,
        "isNode": true,
    },
    'Courtyard': {
        "coord":
        {
            "lat": 43.119835475136036,
            "lng": -77.5492903761625
        },
        "names":
            [
                "Courtyard",
            ],
        "imgURL": "LocationPictures\\Courtyard.jpg",
        "adjacency": [

        ],
        "Floor": 1,
        "isNode": false,
        "classroomInfo": {
            "Teachers":
                [
                    
                ],
            "Courses":
                [

                ]

        }
    },

    'BioRoom': {
        "coord":
        {
            "lat": 43.11969642252823,
            "lng": -77.549519840765
        },
        "names":
            [
                "Biology Room"
            ],
        "imgURL": "",
        "adjacency": [

        ],
        "Floor": 1,
        "isNode": false,
        "classroomInfo": {
            "Teachers":
                [
                    "Mr. Henschke",
                    "Dr. Vinton"
                ],
            "Courses":
                [
                    "AP Biology",
                    "Biology",
                    "Honors Biology",
                    "Environmental Science"
                ]
        }
    },    
    'physics': {
        "coord": {
            "lat": 43.11976884647795, "lng": -77.5495737891719
        },
        "names": ["Physics Room"],
        "imgURL": "",
        "adjacency": [

        ],
        "Floor": [
            "1"
        ],
        "isNode": false,
        "classroomInfo": {
            "Teachers":
                [
                ],
            "Courses":
                [
                    "AP Physics 1","AP Physics 1","Honors Physics","Regular Physics"
                ]
        }
    },
    'US-7': {
        "coord": {
            "lat": 43.11969366643333, "lng": -77.54942296497704
        },
        "names": ["US-7"],
        "imgURL": "",
        "adjacency": [
            "f9", "f4"
        ],
        "Floor": 1,
        "isNode": false,
        "classroomInfo": {
            "Teachers":
                [
                    "Mr.Balaji"
                ],
            "Courses":
                [
                    "PreCalculus"
                ]
        }
    },
    'US-6': {
        "coord": {
            "lat": 43.1196929742402, "lng": -77.54954031162144
        },
        "names": ["US-6"],
        "imgURL": "",
        "adjacency": [
            "f9", "f4"
        ],
        "Floor": 1,
        "isNode": false,
        "classroomInfo": {
            "Teachers":
                [
                    "JAM"
                ],
            "Courses":
                [
                    "Calculus AB","Calculus BC","Geometry"
                ]
        }
    },
    'US-8': {
        "coord": {
            "lat": 43.11976219351384, "lng": -77.54954835824849
        },
        "names": ["US-8", "SSP Room"],
        "imgURL": "",
        "adjacency": [
            "f9", "f4"
        ],
        "Floor": 1,
        "isNode": false,
        "classroomInfo": {
            "Teachers":
                [
                    "Ms. Kantor"
                ],
            "Courses":
                [
                    
                ]
        }
    },
    'US-5': {
        "coord": {
            "lat": 43.11978900654555, "lng": -77.5494254559243
        },
        "names": ["US-5"],
        "imgURL": "",
        "adjacency": [
            "f9", "f4"
        ],
        "Floor": 1,
        "isNode": false,
        "classroomInfo": {
            "Teachers":
                [
                    "Mrs.Densmore"
                ],
            "Courses":
                [
                    "Latin"
                ]
        }
    },
    'MathOffice': {
        "coord": {
            "lat": 43.11974502599434, "lng": -77.54942438882647
        },
        "names": ["Math Office"],
        "imgURL": "",
        "adjacency": [
            "f9", "f4"
        ],
        "Floor": 1,
        "isNode": false,
        "classroomInfo": {
            "Teachers":
                [
                    "Dr. Vinton", "Dr. Dobson"
                ],
            "Courses":
                [

                ]
        }
    },
    'FacultyRoom': {
        "coord": {
            "lat": 43.119814909807864, "lng": -77.549545778468
        },
        "names": ["Faculty Room"],
        "imgURL": "",
        "adjacency": [
            "f9", "f4"
        ],
        "Floor": 1,
        "isNode": false,
        "classroomInfo": {
            "Teachers":
                [

                ],
            "Courses":
                [

                ]
        }
    },
    'US-3': {
        "coord": {
            "lat": 43.11985298034218, "lng": -77.54943245513782
        },
        "names": ["US-3"],
        "imgURL": "",
        "adjacency": [
            "f9", "f4"
        ],
        "Floor": 1,
        "isNode": false,
        "classroomInfo": {
            "Teachers":
                [
                    "Mrs. Colosimo"
                ],
            "Courses":
                [
                    "French"
                ]
        }
    },
    'US-4': {
        "coord": {
            "lat": 43.119872361696, "lng": -77.54954980178222
        },
        "names": ["US-4"],
        "imgURL": "",
        "adjacency": [
            "f9", "f4"
        ],
        "Floor": 1,
        "isNode": false,
        "classroomInfo": {
            "Teachers":
                [
                    "Dr.Perkins"
                ],
            "Courses":
                [
                    "AP Statistics", "FST"
                ]
        }
    },
    'US-1': {
        "coord": {
            "lat": 43.11994144234133, "lng": -77.5494351373468
        },
        "names": ["US-1"],
        "imgURL": "",
        "adjacency": [
            "f9", "f4"
        ],
        "Floor": 1,
        "isNode": false,
        "classroomInfo": {
            "Teachers":
                [
                    "Dr. Morrison"
                ],
            "Courses":
                [
                    
                ]
        }
    },
    'US-2': {
        "coord": {
            "lat": 43.119937289199285, "lng": -77.54954242570743
        },
        "names": ["US-2"],
        "imgURL": "",
        "adjacency": [
            "f9", "f4"
        ],
        "Floor": [
            "1"
        ],
        "isNode": false,
        "classroomInfo": {
            "Teachers":
                [
                    "Profe. Gonzalez"
                ],
            "Courses":
                [

                ]
        }
    },
    'E-1': {
        "coord": {
            "lat": 43.12009326084444, "lng": -77.54934798467887
        },
        "names": ["E-1"],
        "imgURL": "",
        "adjacency": [
            "f4", "f2"
        ],
        "Floor": 1,
        "isNode": false,
        "classroomInfo": {
            "Teachers":
                [
                    "Dr. Malone"
                ],
            "Courses":
                [
                    "English 11"
                ]
        }
    },
    'E-2': {
        "coord": {
            "lat": 43.12009049208999, "lng": -77.54927824724449
        },
        "names": ["E-2"],
        "imgURL": "",
        "adjacency": [
            "f4", "f2"
        ],
        "Floor": 1,
        "isNode": false,
        "classroomInfo": {
            "Teachers":
                [
                    "Mr. O'Brien"
                ],
            "Courses":
                [
                    "English 10"
                ]
        }
    },
    'E-3': {
        "coord": {
            "lat": 43.120091634167586, "lng": -77.54920597474555
        },
        "names": ["E-3"],
        "imgURL": "",
        "adjacency": [
            "f4", "f2"
        ],
        "Floor": 1,
        "isNode": false,
        "classroomInfo": {
            "Teachers":
                [
                    "Ms. Berg"
                ],
            "Courses":
                [
                    
                ]
        }
    },
    'US-Library': {
        "coord": {
            "lat": 43.12008516700678, "lng": -77.54904065350848
        },
        "names": ["US/MS Library"],
        "imgURL": "",
        "adjacency": [
            "f2"
        ],
        "Floor": 1,
        "isNode": false,
        "classroomInfo": {
            "Teachers":
                [
                    "Mrs. Mandola"
                ],
            "Courses":
                [

                ]
        }
    },
    'ComputerLab': {
        "coord": {
            "lat": 43.119792541740914, "lng": -77.54906199483139
        },
        "names": ["Computer Lab"],
        "imgURL": "",
        "adjacency": [
            "f2", "f1"
        ],
        "Floor": 1,
        "isNode": false,
        "classroomInfo": {
            "Teachers":
                [

                ],
            "Courses":
                [

                ]
        }
    },
    'Example': {
        "coord": {
            "lat": 0, "lng": 0
        },
        "names": [],
        "imgURL": "",
        "adjacency": [

        ],
        "Floor": 1,
        "isNode": false,
        "classroomInfo": {
            "Teachers":
                [

                ],
            "Courses":
                [

                ]
        }
    },
}

//search Node Index:
//If input an array, it searches the keys of the nodes
//If input an string, it searches the descriptions(names) of the node 
//output an array of indexs to represent each node in order
function searchNodeIndex(inputValue) {
    const searchkey = new RegExp(`\\b${inputValue}+\\b`, 'gi');
    let result = [];

    if (Array.isArray(inputValue)) {
        for (let i = 0; i < inputValue.length; i++) {
            result.push(Object.keys(node_data).indexOf(inputValue[i]))
        }
    } else {
        for (let i = 0; i < Object.keys(node_data).length; i++) {
            let [key, value] = Object.entries(node_data)[i];
            let editedSearchString = JSON.stringify(value.names)
            if(!value.isNode){
                editedSearchString += " "+ JSON.stringify(value.classroomInfo.Teachers) + " " +JSON.stringify(value.classroomInfo.Courses)
            }
            if (editedSearchString.search(searchkey) !== -1) {
                result.push(i);
            }
        }
    }
    return result;
}

//a path finder that returns an array of location labels
//start and end refers to the property key string in node_data. e.g. f2, f5
//returns an array of property key string
function pathFinder(start, end) {


    //document.getElementById("debugText").innerHTML += "<br> search triggered"
    //refresher and tester
    let validStart = false;
    let validEnd = false;
    for (let i = 0; i < Object.keys(node_data).length; i++) {
        let key = Object.keys(node_data)[i]
        if (key.valueOf() === start.valueOf()) { validStart = true }
        if (key.valueOf() === end.valueOf()) { validEnd = true }
    }
    let result = []
    if (!(validStart && validEnd)) {
        //document.getElementById("debugText").innerHTML += "<br> search exited"
        alert("input key Error")
        return result
    }
    function innerPathFinder(start, end, currentResult) {
        //Result, current result, temp result are all array of strings,
        //each string is the key of the location,
        //the array represent the path of locations that have been navigated already
        //start is the first point of unknown path, end is the goal
        let tempResult = [].concat(currentResult)
        
        //if it has already been to start 
        if (tempResult.indexOf(start.valueOf()) !== -1) {
            return []
        }
        tempResult.push(start)
        //if it finds the end
        if (start.valueOf() === end.valueOf()) {
            return tempResult
        }
        //if it didn't find the end yet it is not a node
        if ((!node_data[start.valueOf()].isNode) && (currentResult.length > 1)){
            return []
        }

        else {
            let possibilities = []
            let returnValue = []
            //recursion to get all possible results
            for (let i = 0; i < node_data[start].adjacency.length; i++) {
                let newStart = node_data[start].adjacency[i]
                possibilities.push(innerPathFinder(newStart, end, tempResult))
            }
            //find and return the best result
            document.getElementById("debugText").innerHTML += "<br> probabilities returned" + JSON.stringify(possibilities)
            for (let i = 0; i < possibilities.length; i++) {
                if ((possibilities[i].length <= returnValue.length && possibilities[i].length !== 0) || returnValue.length === 0) {
                    returnValue = possibilities[i]
                }
            }
            //document.getElementById("debugText.innerHTML") += "<br> inner search returned" + returnValue
            return returnValue;
        }
    }


    result = innerPathFinder(start, end, result)
    //document.getElementById("debugText.innerHTML") += "<br> result gotten: " + result

    //document.getElementById("debugText.innerHTML") += "<br> search returned"
    return result
}



export { searchNodeIndex, node_data, pathFinder }
