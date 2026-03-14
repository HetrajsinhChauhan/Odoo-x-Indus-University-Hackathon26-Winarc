import Admin from "./admin.model.js"
import Otp from "./../Otp/otp.model.js"
import { sendOtpEmail } from "./../utils/sendEmail.js"
import { ApiError } from "./../utils/ApiError.js";
import { ApiResponse } from "./../utils/ApiResponse.js";
import { asyncHandler } from "./../utils/asyncHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (adminId) => {
  try {
    const admin = await Admin.findById(adminId);

    if (!admin) {
      throw new Error("Admin not found");
    }

    const accessToken = admin.generateAccessToken();
    const refreshToken = admin.generateRefreshToken();

    // 🔐 Hash refresh token before saving
    admin.refreshToken = await bcrypt.hash(refreshToken, 10);

    await admin.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log("TOKEN ERROR:", error);
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

const registerSendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if(!email){
    throw new ApiError(400, "email is required")
  }

  const admin = await Admin.findOne({ email });

  if (admin) {
    throw new ApiError(404, "Admin already exists with this email");
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  let otpDoc = await Otp.findOne({ email });

  if (!otpDoc) {
    otpDoc = new Otp({ email });  //make new email
  }

  await otpDoc.setOtp(otp);   
  await otpDoc.save();

  try {
    await sendOtpEmail(email, otp);
  } catch (error) {
    await otpDoc.deleteOne();
    throw new ApiError(500, "Failed to send OTP email");
  }

  return res.status(200).json(
    new ApiResponse(200, null, "OTP sent successfully")
  );
});

const register = asyncHandler(async (req, res) => {
  const { email, otp, name, password, bussiness } = req.body;

  if(!email){
    throw new ApiError(401, "Email is required")
  }

  if(!otp || !name || !password || !bussiness){
    throw new ApiError(401, "All feild are required")
  }

  const otpDoc = await Otp.findOne({ email }).select("+otp");

  if (!otpDoc) {
    throw new ApiError(404, "OTP not found or expired");
  }

  const isValid = await otpDoc.isOtpValid(otp); 

  if (!isValid) {
    throw new ApiError(400, "Invalid or expired OTP");
  }

  const admin = await Admin.create({
    name,
    password,
    bussiness,
    email,
  });

  // Now delete OTP after successful creation
  await otpDoc.deleteOne();

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        {
          admin,
        },
        "Admin registered successfully"
      )
    );
});

const refreshAccessToken = asyncHandler(async (req, res) => {

  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const admin = await Admin
      .findById(decodedToken?._id)
      .select("+refreshToken");

    if (!admin) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (!admin.refreshToken) {
      throw new ApiError(401, "Refresh token missing");
    }

    // line ~127
    const isValid = await bcrypt.compare(
      incomingRefreshToken,
      admin.refreshToken
    );

    if (!isValid) {
      throw new ApiError(401, "Refresh token expired or used");
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshTokens(admin._id);

    const options = {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000 ,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access Token Refreshed Successfully"
        )
      );

  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Refresh Token");
  }

});

const login = asyncHandler(async (req, res) => {
  const {email, password} = req.body

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const adminLogin =  await Admin.findOne({email}).select("+password");

  if(!adminLogin){
    throw new ApiError(401, "Invalid email or password");
  }


  const isPassValid = await adminLogin.isPasswordCorrect(password);

  if(!isPassValid){
    throw new ApiError(401, "Invalid email or password")
  }

  const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(adminLogin._id)
  
    const loggedInAdmin = await Admin.findById(adminLogin._id).select("-password -refreshToken")

    // const options = {
    //     httpOnly: true,
    //     secure: true
    // }

    const options = {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    };


    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                superAdmin: loggedInAdmin, accessToken
            },
            "Gym logged in Successfully"
         )
    )
})

const logout = asyncHandler(async (req, res) => {

  await Admin.findByIdAndUpdate(
    req.admin._id,
    { $unset: { refreshToken: 1 } },
    { new: true }
  );

  return res
  .clearCookie("accessToken")
  .clearCookie("refreshToken")
  .status(200)
  .json(
    new ApiResponse(200, null, "Logout successfully")
  );
});

const getUser = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(
            200,
            req.admin,
            "Current Admin fetched successfully"
        )
    );
});

export{
  refreshAccessToken,
  registerSendOtp,
  register,
  login,
  logout,
  getUser,
}