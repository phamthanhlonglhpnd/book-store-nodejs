import jwtHelper from '../helpers/jwt.helper';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "BOOKSTOREPOALRBEAR";

let checkRole = async (req, res) => {
    const tokenFromClient = req.body.token || req.headers["x-access-token"] || req.cookies['access_token'];
}