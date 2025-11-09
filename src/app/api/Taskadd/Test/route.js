import { Db_connection } from "@/app/libs/Db_connection";
import { Taskmodel } from "@/app/model/Task_add";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const GET = async (req) => {
  try {
    await Db_connection();

    const findcookies = req.cookies.get("authtoken")?.value;
    if (!findcookies) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const tokendecode = jwt.verify(findcookies, "Abdullah");

    const finddata = await Taskmodel.find({ user_iD: tokendecode._id });

    if (!finddata || finddata.length === 0) {
      return NextResponse.json(
        { message: "No tasks found for this user." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Tasks fetched successfully", data: finddata },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message, message: "Fail to fetch tasks" },
      { status: 500 }
    );
  }
};
