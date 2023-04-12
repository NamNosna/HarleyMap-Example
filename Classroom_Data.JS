const classroom_data = [
    {
        "coord":
        {
            "lat": 43.119835475136036,
            "lng": -77.5492903761625
        },
        "Names":
            [
                "Court Yard"
            ],
        "Teachers":
            [

            ],
        "Floor":
            [
                "1"
            ],
        "Courses":
            [

            ]
    },
    {
        "coord":
        {
            "lat": 43.11957086352588,
            "lng": -77.54956983554084
        },
        "Names":
            [
                "Dining Hall"
            ],
        "Teachers":
            [

            ],
        "Floor":
            [
            ],
        "Courses":
            [

            ]
    },
    {
        "coord":
        {
            "lat": 43.11969642252823,
            "lng": -77.549519840765
        },
        "Names":
            [
                "Biology Room"
            ],
        "Teachers":
            [
                "Mr. Henschke",
                "Dr. Vinton"
            ],
        "Floor":
            [
                "1"
            ],
        "Courses":
            [
                "AP Biology",
                "Biology",
                "Honors Biology",
                "Environmental Science"
            ]
    },
    {
        "coord":
        {

        },
        "Names":
            [

            ],
        "Teachers":
            [

            ],
        "Floor":
            [

            ],
        "Courses":
            [

            ]
    }
]

const node_data = {
    "f1": {
        "coord":
        {
            "lat": 43.11970278298468,
            "lng": -77.54897619163009
        },
        "description": "gallery",
        "imgURL": "LocationPictures\\HarleyPic_GalleryLeft.jpg",
        "adjacency": [
            'f2',
            'f5'
        ],
        "Floor":

        [
            "1"
        ],

        "isFound": false
    },
    'f2': {
        "coord":
        {
            "lat": 43.1200601241642,
            "lng": -77.549123166763
        },
        "description": "library corner",
        "imgURL": "LocationPictures\\Library_Corner.jpg",
        "adjacency": [
            'f1',
            "f4"
        ],
        "Floor":
        [
            "1"
        ],
        "isFound": false
    },
    'f3': {
        "coord":
        {
            "lat": 43.12024755679706,
            "lng": -77.54947111696794
        },
        "description": "Beckerman",
        "imgURL": "LocationPictures\\Beckerman.jpg",
        "adjacency": [
            "f4"
        ],
        "Floor":
        [
            "1"
        ],
        "isFound": false
    },
    'f4': {
        "coord": {
            "lat": 43.12007778048073,
            "lng": -77.54946512133455
        },
        "description": "English-Math-Beckerman intersection",
        "imgURL": "LocationPictures\\English_Math_Beckerman_intersection.jpg",
        "adjacency": [
            "f3", "f2"
        ],
        "Floor": [
            "1"
        ],
        "isFound": false
    },
    'f5': {
        "coord": {
            "lat": 43.119363417375354,
            "lng": -77.54887511750276
        },
        "description": "Art Room",
        "imgURL": "LocationPictures\\Art_Room.jpg",
        "adjacency": [
            'f1'
        ],
        "Floor": [
            "1"
        ],
        "isFound": false
    },
    'f6': {
        "coord": {
            "lat": 0,
            "lng": 0
        },
        "description": "",
        "imgURL": "",
        "adjacency": [

        ],
        "Floor": [
            "1"
        ],
        "isFound": false

    }

}

function searchClassroomsIndex(inputValue) {
    const searchkey = new RegExp(`\\b${inputValue}+\\b`, 'gi');
    let result = [];
    for (let i = 0; i < classroom_data.length; i++) {
        if (JSON.stringify(classroom_data[i]).search(searchkey) !== -1) {
            result.push(i);
        }
    }
    return result;
}

function searchNodeIndex(inputValue) {
    const searchkey = new RegExp(`\\b${inputValue}+\\b`, 'gi');
    let result = [];
    for (let i = 0; i < Object.keys(node_data).length; i++) {
        let [key, value] = Object.entries(node_data)[i];
        if (value.description.search(searchkey) !== -1) {
            result.push(i);
        }
    }
    return result;
}
//a path finder that returns an array of location labels
//nodeData must be an object in this case node_data
//start and end refers to the property key string in nodeData. e.g. f2, f5
function pathFinder(nodeData, start, end){
    document.getElementById("debugText").innerHTML += "<br> search triggered"
    //refresher and tester
    let validStart = false;
    let validEnd = false;
    for (let i = 0; i < Object.keys(nodeData).length; i++) {
        let key = Object.keys(nodeData)[i]
        if(key.valueOf() === start.valueOf()){validStart = true}
        if(key.valueOf() === end.valueOf()){validEnd = true}
    }
    let result = []
    if (!(validStart && validEnd)){
        document.getElementById("debugText").innerHTML += "<br> search exited"
        return result
    }
    function innerPathFinder(nodeData, start, end, currentResult){
        let tempResult = [].concat(currentResult)
        document.getElementById("debugText").innerHTML += "<br> inner search triggered" + start + end + " overall : " + currentResult


        if (tempResult.indexOf(start.valueOf()) !== -1){
            return []
        }
        tempResult.push(start)
        if (start.valueOf() === end.valueOf()) 
        {
            return tempResult

        }
        else{
            let possibilities = []
            let returnValue = []
            //recursion to get all possible results
            for (let i = 0; i < nodeData[start].adjacency.length; i++) {
                let newStart = nodeData[start].adjacency[i]
                possibilities.push(innerPathFinder(nodeData, newStart, end, tempResult))
            }
            //find and return the best result
            document.getElementById("debugText").innerHTML += "<br> probabilities returned" + JSON.stringify(possibilities)
            for (let i = 0; i < possibilities.length; i++) {
                if((possibilities[i].length <= returnValue.length && possibilities[i].length !== 0) || returnValue.length === 0){
                    returnValue = possibilities[i]
                }
            }
            document.getElementById("debugText").innerHTML += "<br> inner search returned" + returnValue
            return returnValue;
        } 
    }

    
    result = innerPathFinder(nodeData, start, end, result)
    document.getElementById("debugText").innerHTML += "<br> result gotten: " + result

    document.getElementById("debugText").innerHTML += "<br> search returned"
    return result
}

export { classroom_data, searchClassroomsIndex, searchNodeIndex, node_data, pathFinder}
