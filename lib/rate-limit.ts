type RateLimitRecord = {
  count: number;
  resetAt: number;
};

type RateLimitOptions = {
  limit: number;
  windowMs: number;
};

type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitRecord>();

function pruneExpiredEntries(now: number) {
  for (const [key, record] of rateLimitStore.entries()) {
    if (record.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }
}

export function consumeRateLimit(key: string, options: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const { limit, windowMs } = options;

  if (rateLimitStore.size > 500) {
    pruneExpiredEntries(now);
  }

  const existingRecord = rateLimitStore.get(key);

  if (!existingRecord || now >= existingRecord.resetAt) {
    const resetAt = now + windowMs;
    rateLimitStore.set(key, { count: 1, resetAt });

    return {
      allowed: true,
      remaining: Math.max(limit - 1, 0),
      resetAt,
    };
  }

  if (existingRecord.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: existingRecord.resetAt,
    };
  }

  existingRecord.count += 1;

  return {
    allowed: true,
    remaining: Math.max(limit - existingRecord.count, 0),
    resetAt: existingRecord.resetAt,
  };
}
