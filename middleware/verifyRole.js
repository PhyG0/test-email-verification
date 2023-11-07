const verifyRole = (...allowedRoles) => {
    return (req, res, next) => {
        const roles = req.roles;
        const allowed = Object.keys(allowedRoles[0]);
        let permitted = false;

        for(let i = 0; i < allowed.length; i++){
            if(roles[allowed[i]]) {
                permitted = true;
                break;
            }
        }    
        
        if(permitted) next();
        else return res.status(401).json({'message' : 'Not allowed'})
    }
}

export default verifyRole;