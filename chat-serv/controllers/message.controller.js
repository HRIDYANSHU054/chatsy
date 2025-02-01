import { Message } from "../models/Message.model.js";
import { User } from "../models/User.model.js";
import { io } from "../sockets/index.js";
import { getReceiverSocketId } from "../sockets/socketManager.js";
import cloudinary from "../utils/cloudinary.js";

export async function getUsersForSidebar(req, resp, next) {
  const { user } = req; //this prop been set in the isAuthenticated middleware if the user is authenticated
  try {
    const allOtherUsersExceptTheCurrentUser = await User.find({
      _id: { $ne: user._id },
    }).select("-password");

    return resp.status(200).json({
      message: "All users fetched successfully",
      success: true,
      data: {
        users: allOtherUsersExceptTheCurrentUser,
      },
    });
  } catch (error) {
    console.log("error in api/message/users", error.message);
    next(error);
  }
}

export async function getMessages(req, resp, next) {
  const { id: theOtherChatterId } = req.params;
  const { _id: loggedInChatterId } = req.user;
  try {
    const messages = await Message.find({
      $or: [
        { senderId: theOtherChatterId, receiverId: loggedInChatterId },
        { senderId: loggedInChatterId, receiverId: theOtherChatterId },
      ],
    }); // coz these messages can be from either the sender or the receiver

    return resp.status(200).json({
      message: "Messages fetched successfully",
      success: true,
      data: {
        messages,
      },
    });
  } catch (error) {
    console.log("error in api/message/getMessages", error.message);
    next(error);
  }
}

export async function sendMessage(req, resp, next) {
  const { _id: senderId } = req.user;
  const { id: receiverId } = req.params;
  try {
    const { text, image } = req.body;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save(); //save the message to the database

    //realtime functionality here
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      //receiver is online
      io.to(receiverSocketId).emit("newMessage", newMessage); //send the new message to the receiver
    }

    return resp.status(201).json({
      message: "Message sent successfully",
      success: true,
      data: {
        message: newMessage,
      },
    });
  } catch (error) {
    console.log("error in api/message/sendMessage", error.message);
    next(error);
  }
}
