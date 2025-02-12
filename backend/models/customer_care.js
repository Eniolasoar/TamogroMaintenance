import Joi from 'joi';  
import { Schema, model } from 'mongoose';
import jwt from 'jsonwebtoken';

const {sign} = jwt;


const cPersonelSchema = new Schema({
   
    email: {
        type:String,
        unique: true,
        required: true,
        trim:true    
    },
    password: {
        type:String,
        required:true,
        minlength: 7,
        maxlength: 1024,
    },
    role: {
        type:String,
        default: 'Cpersonnel'
    },

      createdAt: {
        type: Date,
        default: Date.now
      }
});

cPersonelSchema.methods.genAuthToken = function(){
    const token = sign({ _id: this._id, role: this.role }, process.env.SECRET_KEY);
    return token;
}


const CustomerCare = model('Customer', cPersonelSchema);




function validate(customer){
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(1024).required(),
        role: Joi.string().valid('Cpersonnel').default('Cpersonnel'),
    }); 
   return schema.validate(customer);
}




export {
    CustomerCare,
    validate,   
}