import { UserModel } from "@/app/model/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Db_connection } from "@/app/libs/Db_connection";

export const POST = async (req, res) => {
  try {
    await Db_connection();
    const { user_Email, user_password } = await req.json();

    const findemail = await UserModel.findOne({ user_Email });

    if (!findemail) {
      return NextResponse.json({
        message: "Please Signup user account not created",
      });
    }

    const passwordmatch = await bcrypt.compareSync(
      user_password,
      findemail.user_password
    );

    if (!passwordmatch) {
      return NextResponse.json(
        {
          message: "Password ghalat hai.",
        },
        { status: 401 }
      );
    }

    const jwtt = jwt.sign(
      {
        _id: findemail._id,
        user_name: findemail.user_name,
        user_Email: findemail.user_Email,
        user_Gender: findemail.user_Gender,
      },
      "Abdullah",
      {
        expiresIn: "1d",
      }
    );

    const response = NextResponse.json({
      message: "User Login Successfully",
      jwtt,
    });

    response.cookies.set("authtoken", jwtt);
    return response;
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      message: "Fail to ",
    });
  }
};
