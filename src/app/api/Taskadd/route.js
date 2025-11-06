import { NextResponse } from "next/server";

import jwt from "jsonwebtoken";
import { Db_connection } from "@/app/libs/Db_connection";
import { Taskmodel } from "@/app/model/Task_add";

export const POST = async (req, res) => {
  try {
    await Db_connection();

    const cookiesfind = req.cookies.get("authtoken")?.value;

    const jwtverify = jwt.verify(cookiesfind, "Abdullah");

    const { Task_Tittle, Task_description, Task_Satut } = await req.json();

    const taskadd = new Taskmodel({
      user_iD: jwtverify._id,
      Task_Tittle,
      Task_description,
      Task_Satut,
    });
    const Tasksave = await taskadd.save();

    console.log(taskadd);
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
