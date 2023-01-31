classroom_data = 
[
    {
    "relativeCoord":
    {
        "width":0.386046520499296,
        "length":0.5786163644881662
    },
    "Names" : 
    [
        "Court Yard"
    ],
    "teachers":
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
        "length":0.3647798722737984
    },
    "Names" : 
    [
        "Dining Hall"
    ],
    "teachers":
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
        "width":0.22558139091314272,
        "length":0.4725965772125354
    },
    "Names" : 
    [
        "Biology Room"
    ],
    "teachers":
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
}
]

function searchClassrooms(inputValue){
    const searchkey = new RegExp(`\\b${inputValue}\\b`, 'gi');
    let result = [];
    for(const tempRoom of classroom_data){
        for(const[property, values] of Object.entries(tempRoom))
        for(const value of values){
            if (value.search(searchkey) !== -1){
                result.push(JSON.stringify(tempRoom))
            }
        }
    }    
    resultString = JSON.stringify(result);
    resultString = resultString.replace(searchkey, "<b>" +inputValue +"</b>")
    return resultString
}


