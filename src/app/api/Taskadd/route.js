import { NextResponse } from "next/server";

import jwt from "jsonwebtoken";
import { Db_connection } from "@/app/libs/Db_connection";
import { Taskmodel } from "@/app/model/Task_add";

export const POST = async (req, res) => {
  try {
    await Db_connection();

    const findcookies = req.cookies.get("authtoken")?.value;
    if (!findcookies) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const tokendecode = jwt.verify(findcookies, "Abdullah");
    const userId = tokendecode._id;
    const { Task_Tittle, Task_description, Task_Satut } = await req.json();

    const datasend = new Taskmodel({
      user_iD: userId,
      Task_Tittle,
      Task_description,
      Task_Satut,
    });
    const Tasksave = await datasend.save();
    return NextResponse.json(Tasksave, {
      message: "Task sucessfully Save",
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      message: "Fail to add_Task",
    });
  }
};
