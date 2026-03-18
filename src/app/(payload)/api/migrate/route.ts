import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export async function POST(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  const secret = process.env.PAYLOAD_SECRET || 'dev-secret';
  if (token !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const payload = await getPayload({ config: configPromise });
    const db = payload.db;
    
    const log: string[] = [];

    const migrations = [
      `ALTER TABLE pages ADD COLUMN IF NOT EXISTS meta_image_id integer`,
      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS meta_image_id integer`,
      `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS meta_image_id integer`,
      `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS noindex boolean DEFAULT true`,
      `ALTER TABLE homepage_services_items ADD COLUMN IF NOT EXISTS page_id integer`,
    ];

    for (const sql of migrations) {
      try {
        await db.drizzle.execute({ sql } as unknown as Parameters<typeof db.drizzle.execute>[0]);
        log.push(`OK: ${sql.substring(0, 60)}...`);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        if (msg.includes('already exists')) {
          log.push(`SKIP (exists): ${sql.substring(0, 40)}...`);
        } else {
          log.push(`ERR: ${msg}`);
        }
      }
    }

    return NextResponse.json({ success: true, log });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
