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
            'f2'
        ],
        "Floor":
            [
                "1"
            ],
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
            'f1'
        ],
        "Floor":
            [
                "1"
            ],
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
    },
    'f6': {
        "coord": {
            "lat":0,
            "lng": 0
        },
        "description": "",
        "imgURL": "",
        "adjacency": [
            
        ],
        "Floor": [
            "1"
        ],
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


export { classroom_data, searchClassroomsIndex, searchNodeIndex, node_data }