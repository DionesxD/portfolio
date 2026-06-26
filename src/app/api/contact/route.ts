import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';

const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be under 100 characters'),
  email: z.email('Please provide a valid email address'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be under 2000 characters'),
  budget: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => issue.message);
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    // In production, this would send an email or save to a database.
    // For now, we log the validated data and return success.
    const { name, email, message, budget } = result.data;
    console.log('[Contact Form Submission]', { name, email, message, budget });

    return NextResponse.json(
      {
        success: true,
        message: 'Message received successfully.',
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, errors: ['Invalid request body.'] },
      { status: 400 }
    );
  }
}