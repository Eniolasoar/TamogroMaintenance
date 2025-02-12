import jwt from 'jsonwebtoken';

const { verify } = jwt;

export function authMiddleWare(requiredRoles) {
    return (req, res, next) => {
        const token = req.header('x-auth-token');
        if (!token) return res.status(401).json({ message: 'Unauthorized' });

        try {
            const decoded = verify(token, process.env.SECRET_KEY);
            req.user = decoded;

            // Check if requiredRoles is an array or a single role
            if (
                requiredRoles &&
                ![].concat(requiredRoles).includes(decoded.role)
            ) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            next();
        } catch (error) {
            console.error(error.message);
            res.status(400).json({ message: 'Invalid Token' });
        }
    };
}
