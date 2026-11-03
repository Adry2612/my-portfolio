import { initMongoose } from '@/lib/mongoose';
import { parseSpanishDate } from '@/lib/dateOrder';
import { NextResponse } from 'next/server';
import Job from '@/models/Job';

export async function GET() {
  try {
    await initMongoose();
    const jobs = (await Job.find().lean()).sort(
      (a, b) => parseSpanishDate(b.startDate) - parseSpanishDate(a.startDate),
    );

    return NextResponse.json({ jobs });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
