import { Db_connection } from "@/app/libs/Db_connection";
import { Taskmodel } from "@/app/model/Task_add";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const GET = async (req, { params }) => {
  try {
    await Db_connection();

    const { id } = params;

    const finddata = await Taskmodel.find({ user_iD: id });

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

export const DELETE = async (req, { params }) => {
  try {
    await Db_connection();

  const resolvedParams = await params; // ✅ unwrap params
    const { id } = resolvedParams;

    const finddata = await Taskmodel.findByIdAndDelete(id);

    if (!finddata) {
      return NextResponse.json(
        { message: "No task found with this id." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Task deleted successfully", data: finddata },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message, message: "Fail to fetch tasks" },
      { status: 500 }
    );
  }
};

export const PUT = async (req, { params }) => {
  try {
    await Db_connection();

    const { id } = params;

    const token = req.cookies().get("authtoken")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decode = jwt.verify(token, "Abdullah");

    const { Task_Tittle, Task_description, Task_Satut } = await req.json();

    const updatedTask = await Taskmodel.findOneAndUpdate(
      { _id: id, user_iD: decode.id },
      {
        Task_Tittle,
        Task_description,
        Task_Satut,
      },
      { new: true }
    );

    if (!updatedTask) {
      return NextResponse.json(
        { message: "Task not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Task Updated Successfully", data: updatedTask },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Update Failed", error: error.message },
      { status: 500 }
    );
  }
};
