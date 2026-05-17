import * as authService from "../services/auth.service.js"



export const register = async (req, res, next) => {
  try {
    const { email, password, name, phoneNumber } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
    if (password.length < 5) {
      return res.status(400).json({ error: "Password must be at least 5 characters long" });
    }

    // Phone number length (exactly 11)
    if (phoneNumber.length !== 12) {
      return res.status(400).json({ error: "Phone number must be exactly 11 characters long" });
    }
    if (password.length < 5) {

      return res.status(400).json({ error: "Password must be at least 5 characters long" });
    }

    const { user, token } = await authService.registerService(email, password, name, phoneNumber);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    //service logic 
    res.status(201).json({
      id: user._id,
      email: user.email,
      name: user.name,
      phoneNumber: user.phoneNumber,
      token,
      message: "User registered successfully",
    });

  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await authService.loginService(email, password);

    // Save JWT in Cookie
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      ...result,
      message: "Login successful",
    });
  } catch (error) {
    next(error);
  }
};
export const requestPasswordReset = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    await authService.requestReset(email);
    res.json({ message: "Password reset email sent if the email exists" });
  } catch (error) {
    next(error);
  }
}
export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json({ error: "Token and password are required" });
    }
    if (password.length < 5) {
      return res.status(400).json({ error: "Password must be at least 5 characters long" });
    }

    await authService.resetUserPassword(token, password);
    res.json({ message: "Password updated" });
  } catch (error) {
    next(error);
  }
}


export const profile = async (req, res, next) => {
  try {
    const user = await authService.getProfile(req.user.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};
