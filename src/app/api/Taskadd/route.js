import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Db_connection } from "@/app/libs/Db_connection";
import { Taskmodel } from "@/app/model/Task_add";


export const POST = async (req) => {
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

    return NextResponse.json(
      { message: "Task successfully saved", data: Tasksave },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: error.message, message: "Fail to add task" },
      { status: 500 }
    );
  }
};

export const GET = async (req) => {
  try {
    await Db_connection();

    const token = req.cookies().get("authtoken")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const tokendecode = jwt.verify(token, "Abdullah");

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
