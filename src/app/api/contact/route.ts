import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, companyName, formData, result } = body;

    const sql = getDb();
    
    // Try to update the latest estimate with contact info if db is available
    if (sql) {
      try {
        await sql`
          UPDATE estimates
          SET email = ${email}, company_name = ${companyName}
          WHERE business_type = ${formData.businessType}
            AND platform = ${formData.platform}
            AND estimated_cost_min = ${result.estimatedCostMin}
        `;
      } catch (dbError) {
        console.error('Database update error:', dbError);
      }
    }

    // In a real application, you would:
    // 1. Send an email notification to your sales team
    // 2. Add to a CRM system
    // 3. Send a confirmation email to the user

    return NextResponse.json({
      success: true,
      message: 'Contact information received. We will reach out within 24 hours.',
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit contact information' },
      { status: 500 }
    );
  }
}
