import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Temporarily disable middleware to allow admin access
  return NextResponse.next();
}

export const config = { matcher: [] };

