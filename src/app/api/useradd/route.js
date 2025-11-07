import { UserModel } from "@/app/model/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Db_connection } from "@/app/libs/Db_connection";

export const POST = async (req, res) => {
  try {
    await Db_connection();
    const { user_name, user_Email, user_password, user_Gender } =
      await req.json();

    const exitsemail = await UserModel.findOne({ user_Email });

    if (exitsemail) {
      return NextResponse.json("User already exists");
    }

    const salt = await bcrypt.genSalt(10);

    const hashpasword = await bcrypt.hashSync(user_password, salt);

    const useradd = new UserModel({
      user_name,
      user_Email,
      user_password: hashpasword,
      user_Gender,
    });

    const usersave = await useradd.save();

    const jwtt = jwt.sign(
      {
        _id: usersave._id,
        user_name: usersave.user_name,
        user_Email: usersave.user_Email,
        user_Gender: usersave.user_Gender,
      },
      "Abdullah",
      {
        expiresIn: "1d",
      }
    );
    const response = NextResponse.json({
      message: "User Registered Successfully",
      jwtt,
    });

    response.cookies.set("authtoken", jwtt);
    return response;
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      message: "error",
    });
  }
};
