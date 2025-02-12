import jwt from 'jsonwebtoken';


export const generateAuthToken = (entity) => {
    
    const payload = {
        _id: entity._id,
        role: entity.role 
    }

    const token = jwt.sign(payload, process.env.SECRET_KEY,);
    return token;
};

