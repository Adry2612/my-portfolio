import { initMongoose } from '@/lib/mongoose';
import { NextResponse } from 'next/server';
import Education from '@/models/Education';

export async function GET() {
  try {
    await initMongoose();
    const education = await Education.find().lean();

    return NextResponse.json({ education });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
