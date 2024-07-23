import { initMongoose } from '@/lib/mongoose';
import { NextResponse } from 'next/server';
import Job from '@/models/Job';

export async function GET() {
  try {
    await initMongoose();
    const jobs = await Job.find().lean();

    return NextResponse.json({ jobs });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
