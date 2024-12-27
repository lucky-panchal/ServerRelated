const mongoose=require ('mongoose');
const foodSchema = mongoose.Schema({
    Food: {
        Starter :{
            Springroll :{
                name : String,
                price : Number,
                rating: String,
                PreparedBy: String
                },
                Vegitarian:{
                    name : String,
                    price : Number,
                    rating: String,
                    PreparedBy: String
                    },  
                Nonvegitarian :{
                    name : String,
                    price : Number,
                    rating: String,
                    PreparedBy: String
                    }
                }, 
        Mainfood:{
            PunjabiThali:{
                name : String,
                price : Number,
                rating: String,
                PreparedBy: String                
            },
            ChickenKabab:{
                name : String,
                price : Number,
                rating: String,
                PreparedBy: String
                },
            },
        Desert:{
            GulabJumun:{
                name : String,
                price : Number,
                rating: String,
                PreparedBy: String
                },
            Waffle:{
                name : String,
                price : Number,
                rating: String,
                PreparedBy: String
                },
            }    
            
                }
                }  
)