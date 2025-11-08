import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { UserModel } from "@/app/model/userModel";

export const GET = async (request) => {
  try {
    const authtoken = request.cookies.get("authtoken")?.value;
    const decodetoken = jwt.verify(authtoken, "Abdullah");
    const findid = await UserModel.findById(decodetoken._id);
    return NextResponse.json(findid);
  } catch (error) {
    return NextResponse.json({
      error: error.message,
    });
  }
};
