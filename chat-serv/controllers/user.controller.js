import { User } from "../models/User.model.js";
import cloudinary from "../utils/cloudinary.js";
import { throwCustomError } from "../utils/throwCustomError.js";

export async function updateProfile(req, resp, next) {
  const { profilePic } = req.body;
  const userId = req.user._id; //we set the user property on the request in the isAuthenticated middleware

  if (!profilePic)
    return throwCustomError("Profile picture is required", 400, true, next);

  try {
    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      { new: true }
    ); //this new = true option returns the latest updated document

    return resp.status(200).json({
      message: "Profile picture updated successfully",
      success: true,
      data: {
        user: {
          fullName: updatedUser.fullName,
          email: updatedUser.email,
          profilePic: updatedUser.profilePic,
        },
      },
    });
  } catch (error) {
    console.log("error in api/user/updateProfile", error.message);
    next(error);
  }
}
