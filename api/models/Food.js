const { Schema, model } =require('mongoose');

const foodSchema = new Schema({
  name:{
    type: String,
    required: true,
  },
  donatedBy: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  servings:{
    type: String,
   
  },
  imageUrl: {
    type: String,
  },
  ingredients: {

    type: String,
    // required: true,
  },
  
  expiry:{
    type: String,
    
  },
}, {
  timestamps: true
});

const Food = model('Food', foodSchema);

module.exports = Food;