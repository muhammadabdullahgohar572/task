import { Db_connection } from "@/app/libs/Db_connection";
import { Taskmodel } from "@/app/model/Task_add";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await Db_connection();

    
    const { user_iD } = params;

    console.log(user_iD);

    const finddata = await Taskmodel.find(user_iD);

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
