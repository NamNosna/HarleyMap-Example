let classroom_data = 
[
    {
    "relativeCoord":
    {
        "width":0.386046520499296,
        "height":0.5786163644881662
    },
    "Names" : 
    [
        "Court Yard"
    ],
    "Teachers":
    [
        
    ],
    "Floor" :
    [
        "1"
    ],
    "Courses":
    [
        
    ]
},
{
    "relativeCoord":
    {
        "width":0.20348837209302326,
        "height":0.3647798722737984
    },
    "Names" : 
    [
        "Dining Hall"
    ],
    "Teachers":
    [
        
    ],
    "Floor" :
    [
    ],
    "Courses":
    [
        
    ]
},
{
    "relativeCoord":
    {
        "width":0.22558139091314272,
        "height":0.4725965772125354
    },
    "Names" : 
    [
        "Biology Room"
    ],
    "Teachers":
    [
        "Mr. Henschke",
        "Dr. Vinton"
    ],
    "Floor" :
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
    "relativeCoord":
    {

    },
    "Names" : 
    [

    ],
    "Teachers":
    [

    ],
    "Floor" :
    [
        
    ],
    "Courses":
    [
        
    ]
}
]

function searchClassroomsIndex(inputValue){
    const searchkey = new RegExp(`\\b${inputValue}+\\b`, 'gi');
    let result = [];
    for(let i = 0; i < classroom_data.length; i++){
        if (JSON.stringify(classroom_data[i]).search(searchkey) !== -1){
                result.push(i);
        }    
    }   
    return result;
}


export {classroom_data, searchClassroomsIndex}