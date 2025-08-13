import { NextRequest, NextResponse } from 'next/server';
import payload from 'payload';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    await payload.create({
      collection: 'form-submissions',
      data,
    });

    return NextResponse.json({ message: 'Form submitted successfully!' }, { status: 200 });
  } catch (error: any) {
    console.error('Error submitting form:', error);
    return NextResponse.json({ error: error.message || 'Something went wrong.' }, { status: 500 });
  }
}

