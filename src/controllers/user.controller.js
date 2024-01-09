import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //steps: metion below.
  // 1. get user details.
  // 2.  validation - not empty.
  // 3.  check if user already exists: username, email.
  // 4.  check for images, check for avatar.
  // 5. upload them to cloudinary, avatar.
  // 6. create user object - create entry in db.
  // 7. remove password and refresh token field from response.
  // 8.  check for user creation.
  // 9. return response.

  const { username, email, fullname, password } = req.body;
  console.log("email: ", email);
  // req.body mai mill jayega user data, except ki data (url format) se aarha ho.usko hmm baad m dekhenge.

  if (
    [username, email, fullname, password].some((field) => {
      field?.trim() === "";
    })
  ) {
    throw new apiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new apiError(409, "User with email or username already exists");
  }

  const avatarlocalPath = req.files?.avatar[0]?.path;
  const coverImagelocalPath = req.files?.coverImage[0]?.path;

  if (!avatarlocalPath) {
    throw new apiError(400, "avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarlocalPath);
  const coverImage = await uploadOnCloudinary(coverImagelocalPath);

  if (!avatar) {
    throw new apiError(400, "avatar file is required");
  }

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new apiError(500, "something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new apiResponse(200, createdUser, "user registered successfully."));
});

export { registerUser };
