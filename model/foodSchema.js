const mongoose=require ('mongoose');
const foodSchema = mongoose.Schema({
    Food: {
        Starter :{
            Springroll :{
                name : String,
                price : Number
                },
                Vegitarian:{
                    name : String,
                    price : Number
                    },
                Nonvegitarian :{
                    name : String,
                    price : Number
                    }
                }, 
        Mainfood:{
            PunjabiThali:{
                name : String,
                price : Number                
            },
            ChickenKabab:{
                name : String,
                price : Number
                },
            },
        Desert:{
            GulabJumun:{
                name : String,
                price : Number
                },
            Waffle:{
                name : String,
                price : Number
                },
            }    
                }
                }  
)