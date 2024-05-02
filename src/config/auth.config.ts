export const jwConfig = () => {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.EXPIRES_IN;

    if(!secret){
        throw new Error("Missing JWT enviroment variable 'SECRET_KEY'. ");
    }

    return {secret, expiresIn};
};