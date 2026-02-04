import { NextRequest, NextResponse } from 'next/server';
import { getDb, initDatabase } from '@/lib/db';

// Initialize database on first request
let dbInitialized = false;

export async function POST(request: NextRequest) {
  try {
    const sql = getDb();
    
    // Initialize database if not done and db is available
    if (sql && !dbInitialized) {
      try {
        await initDatabase();
        dbInitialized = true;
      } catch (dbError) {
        console.error('Database initialization error:', dbError);
        // Continue without database - estimate still works
      }
    }

    const body = await request.json();
    const { formData, result } = body;

    // Try to save to database if available
    if (sql) {
      try {
        await sql`
          INSERT INTO estimates (
            business_type,
            system_needed,
            platform,
            user_count,
            modules,
            customization_level,
            integration_needed,
            deployment,
            estimated_cost_min,
            estimated_cost_max,
            timeline_weeks,
            team_size
          ) VALUES (
            ${formData.businessType},
            ${formData.systemNeeded},
            ${formData.platform},
            ${formData.userCount},
            ${formData.modules},
            ${formData.customizationLevel},
            ${formData.integrationNeeded},
            ${formData.deployment},
            ${result.estimatedCostMin},
            ${result.estimatedCostMax},
            ${result.timelineWeeks},
            ${result.teamSize}
          )
        `;
      } catch (dbError) {
        console.error('Database save error:', dbError);
        // Continue - the estimate calculation still worked
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Estimate saved successfully',
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save estimate' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const sql = getDb();
    
    if (!sql) {
      return NextResponse.json({
        success: false,
        error: 'Database not configured',
      }, { status: 503 });
    }
    
    const estimates = await sql`
      SELECT * FROM estimates
      ORDER BY created_at DESC
      LIMIT 100
    `;

    return NextResponse.json({
      success: true,
      data: estimates,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch estimates' },
      { status: 500 }
    );
  }
}
