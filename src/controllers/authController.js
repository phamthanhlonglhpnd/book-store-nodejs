 const jwtHelper = require("../helpers/jwt.helper");
 import userService from '../services/userService';

 // Biến cục bộ trên server này sẽ lưu trữ tạm danh sách token
 // Trong dự án thực tế, nên lưu chỗ khác, có thể lưu vào Redis hoặc DB
 let tokenList = {};
 
 // Thời gian sống của token
 const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
 // Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
 const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "BOOKSTOREPOALRBEAR";
 
 // Thời gian sống của refreshToken
 const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
 // Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
 const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "POLARBEARBOOKSTORE";
 
 let login = async (req, res) => {
   try {   
    let email = req.body.email;
    let password = req.body.password;
 
    let user = await userService.loginService(email, password);
    
    const access_token = user?.userData?.access_token;
    const refresh_token = user?.userData?.refresh_token;

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
      maxAge: 7*24*60*60*1000
    })

    res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        secure: true,
        maxAge: 7*24*60*60*1000
    })
    
    return res.status(200).json(user);
     
   } catch (error) {
     return res.status(500).json(error);
   }
 }

 let logout = async (req, res) => {
   try {
    res.cookie('access_token', 'none', {
      expires: new Date(Date.now() + 3 * 1000),
      httpOnly: true,
    })
    res.cookie('refresh_token', 'none', {
      expires: new Date(Date.now() + 3 * 1000),
      httpOnly: true,
    })
    return res.status(200).json({
      errCode: 0,
      errMessage: "Logout success!"
    })
   } catch(e) {
    return res.status(500).json(error);
   }
 }
 
 let refreshToken = async (req, res) => {
   // User gửi mã refresh token kèm theo trong body
   const refreshTokenFromClient = req.body.refreshToken;
   // debug("tokenList: ", tokenList);
   
   // Nếu như tồn tại refreshToken truyền lên và nó cũng nằm trong tokenList của chúng ta
   if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
     try {
       // Verify kiểm tra tính hợp lệ của cái refreshToken và lấy dữ liệu giải mã decoded 
       const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);
 
       // Thông tin user lúc này các bạn có thể lấy thông qua biến decoded.data
       // có thể mở comment dòng debug bên dưới để xem là rõ nhé.
       // debug("decoded: ", decoded);
       const userFakeData = decoded.data;
 
       debug(`Thực hiện tạo mã Token trong bước gọi refresh Token, [thời gian sống vẫn là 1 giờ.]`);
       const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);
 
       // gửi token mới về cho người dùng
       return res.status(200).json({accessToken});
     } catch (error) {
       // Lưu ý trong dự án thực tế hãy bỏ dòng debug bên dưới, mình để đây để debug lỗi cho các bạn xem thôi
       debug(error);
 
       res.status(403).json({
         message: 'Invalid refresh token.',
       });
     }
   } else {
     // Không tìm thấy token trong request
     return res.status(403).send({
       message: 'No token provided.',
     });
   }
 };
 
 module.exports = {
   login: login,
   refreshToken: refreshToken,
   logout: logout
 }