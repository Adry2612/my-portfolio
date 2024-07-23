import { initMongoose } from '@/lib/mongoose';
import Tecnology from '@/models/Tecnology';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await initMongoose();
    const tecnologies = await Tecnology.find().lean();

    return NextResponse.json({ tecnologies });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
