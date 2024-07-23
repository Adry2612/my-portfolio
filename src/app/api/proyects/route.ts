import { initMongoose } from '@/lib/mongoose';
import { NextResponse } from 'next/server';

import Proyect from '@/models/Proyect';

export async function GET() {
  try {
    await initMongoose();
    const proyects = await Proyect.find().lean();

    return NextResponse.json({ proyects });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
