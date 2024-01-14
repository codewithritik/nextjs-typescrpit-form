import { NextRequest, NextResponse } from 'next/server';
import User from '@/model/user';
import { connectMongoDB } from '@/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { Student, initialFormData } from '@/common/types';
import studentModel from '@/model/student';
// const studentModel = require('@/model/student')

connectMongoDB();

// const StudentWithID  = Student & 

type Id = {
  _id: string
}

type StudentWithID  =  Student & Id;
type ResponseData = {
  message: string
}

export async function GET(req: Request) {
  try {
    let data:any;
    data = await studentModel.find({})
    if (data.length === 0) {
      return NextResponse.json({ message: 'No student data found.', status: 404 });
    }

    return NextResponse.json({
      message: 'Student data retrieved successfully.',
      status: 200,
      data
    });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error || 'Internal Server Error', status: 500 });
  }
}


export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { firstName, lastName, age, gender, grade, email, contactNumber, address } = reqBody;
    const insertBody: initialFormData = await studentModel.create({
      firstName, lastName, age, gender, grade, email, contactNumber, address
    });

    return NextResponse.json({ data: insertBody });
  }
  catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
