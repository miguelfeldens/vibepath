import { writeFileSync } from 'fs'
import { join } from 'path'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Only available in development' }, { status: 403 })
  }

  const data = await req.json()
  const filePath = join(process.cwd(), 'lib', 'curated-images.json')
  writeFileSync(filePath, JSON.stringify(data, null, 2))

  return NextResponse.json({ ok: true })
}
