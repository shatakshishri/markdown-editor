const { verifyBody } = require("../utils/verifyBody");
const { error: errorHandler } = require("../utils/error");
const UserService = require("../services/authService");
const TokenService = require("../services/tokenService");
const UserDTO = require("../dtos/userDTO");

class AuthController {
  async login(req, res) {
    if (!verifyBody(req.body, ["provider", "email"])) {
      return res.status(400).json({ msg: "error" });
    }
    try {
      let user;
      user = await UserService.findUser({ email: req.body.email });
      if (!user) {
        user = await UserService.createUser(req.body);
      }
      const { accessToken, refreshToken } = TokenService.generateTokens({
        _id: user._id,
        displayName: user.displayName,
        email: user.email,
        avatar: user.avatar,
      });
      await TokenService.storeRefreshToken(refreshToken, user?._id);
      res.status(200).json({
        user: new UserDTO(user),
        tokens: { at: accessToken, rt: refreshToken },
      });
    } catch (err) {
      errorHandler(res, err);
    }
  }

  async refresh(req, res) {
    if (!verifyBody(req.body, ["rt"])) {
      return res.status(400).json({ msg: "error" });
    }
    try {
      const { rt: refreshTokenFromCookie } = req.body;
      const userData = await TokenService.verifyRefreshToken(
        refreshTokenFromCookie
      );

      if (!userData) {
        return res.status(400).json({ msg: "error" });
      }

      const token = await TokenService.findRefreshToken(userData._id);
      if (!token) {
        return res.status(400).json({ msg: "error" });
      }

      const user = await UserService.findUser({ _id: userData._id });
      if (!user) {
        return res.status(400).json({ msg: "error" });
      }

      const { refreshToken, accessToken } = TokenService.generateTokens({
        _id: userData?._id,
        displayName: user?.displayName,
        email: user?.email,
        avatar: user?.avatar,
        provider: user?.provider,
      });

      await TokenService.updateRefreshToken(userData?._id, refreshToken);
      res.status(200).json({
        user: new UserDTO(user),
        tokens: { at: accessToken, rt: refreshToken },
      });
    } catch (err) {
      errorHandler(res, err);
    }
  }

  async logout(req, res){
    const {rt: refreshToken} = req.body
    // delte refresh token from db
    try {
      await TokenService.removeToken(refreshToken)
      res.status(200).json({auth: true})
    } catch (err) {
      errorHandler(res, err);
    }
}
}

module.exports = new AuthController();
