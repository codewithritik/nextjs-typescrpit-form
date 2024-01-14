import { NextRequest, NextResponse } from 'next/server';
import User from '@/model/user';
import { connectMongoDB } from '@/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { typeUser } from '@/common/types';

connectMongoDB();

type ResponseData = {
  message: string
}


export async function GET(req: NextRequest) {
  try {
    return NextResponse.json({ message: 'login', status: 200 });
  }
  catch (err: any) {
    return NextResponse.json({ message: err, status: 500 });
  }
};


export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { name, age, email, password } = reqBody;
    const insertBody: typeUser = await User.create({
      name,
      age, 
      email,
      password
    });

    return NextResponse.json({ data: insertBody });
  }
  catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
