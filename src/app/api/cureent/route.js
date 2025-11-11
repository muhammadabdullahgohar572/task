import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { UserModel } from "@/app/model/userModel";

export const GET = async (request) => {
  try {
    const authtoken = request.cookies.get("authtoken")?.value;
    if (!authtoken) {
      return NextResponse.json({ user: null });
    }

    const decodetoken = jwt.verify(authtoken, "Abdullah");
    const findid = await UserModel.findById(decodetoken._id)

    return NextResponse.json({ user: findid });
  } catch (error) {
    return NextResponse.json({ user: null });
  }
};
