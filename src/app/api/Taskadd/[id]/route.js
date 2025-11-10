import { Db_connection } from "@/app/libs/Db_connection";
import { Taskmodel } from "@/app/model/Task_add";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  try {
    await Db_connection();

    const resolvedParams = await params;
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

export const PUT = async (req, {params}) => {
  try {
    await Db_connection();


    const { id } = await params;

    // ✅ ID clean (agar kabhi ending me } ho)
    const cleanId = id

    const { Task_Tittle, Task_description, Task_Satut } = await req.json();

    const updatedTask = await Taskmodel.findByIdAndUpdate(
      cleanId,
      {
        Task_Tittle,
        Task_description,
        Task_Satut,
      },
      { new: true }
    );

    if (!updatedTask) {
      return NextResponse.json(
        { message: "Task ID exist nahi karta" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Task Update Successfully ✅", data: updatedTask },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Update Failed", error: error.message },
      { status: 500 }
    );
  }
};


