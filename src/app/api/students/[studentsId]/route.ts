import { NextRequest, NextResponse } from "next/server";
import User from "@/model/user";
import { connectMongoDB } from "@/db/db";
import { NextApiRequest, NextApiResponse } from "next";
import { Student, initialFormData } from "@/common/types";
import studentModel from "@/model/student";
// const studentModel = require('@/model/student')

connectMongoDB();

// const StudentWithID  = Student &

type Id = {
  _id: string;
};

type StudentWithID = Student & Id;
type ResponseData = {
  message: string;
};

export async function GET(req: Request, context: any) {
  try {
    const { params } = context;

    let data: any;
    if (params?.studentsId) {
      data = await studentModel.findById(params.studentsId);
    }

    if (data.length === 0) {
      return NextResponse.json({
        message: "No student data found.",
        status: 404,
      });
    }

    return NextResponse.json({
      message: "Student data retrieved successfully.",
      status: 200,
      data,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: error || "Internal Server Error",
      status: 500,
    });
  }
}

export async function PUT(req: NextRequest, context: any) {
  try {
    const reqBody = await req.json();
    const { params } = context;
    const {
      firstName,
      lastName,
      age,
      gender,
      grade,
      email,
      contactNumber,
      address,
    } = reqBody;
    const insertBody: any = await studentModel.findByIdAndUpdate(
      params.studentsId,
      {
        firstName,
        lastName,
        age,
        gender,
        grade,
        email,
        contactNumber,
        address,
      },
      { new: true, runValidators: true }
    );
    return NextResponse.json({ data: insertBody });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: any) {
  try {
    const { params } = context;
    await studentModel.findByIdAndDelete(params.studentsId);
    return NextResponse.json({ message: "Delete successful" });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
