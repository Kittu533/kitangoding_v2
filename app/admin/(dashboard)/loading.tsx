export default function AdminDashboardLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <div className="h-8 w-56 animate-pulse rounded-md bg-muted" />
        <div className="h-4 w-80 animate-pulse rounded-md bg-muted" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-xl border bg-card p-6">
            <div className="h-4 w-28 animate-pulse rounded-md bg-muted" />
            <div className="mt-3 h-8 w-20 animate-pulse rounded-md bg-muted" />
            <div className="mt-2 h-4 w-36 animate-pulse rounded-md bg-muted" />
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
        <div className="rounded-xl border bg-card p-6">
          <div className="h-5 w-40 animate-pulse rounded-md bg-muted" />
          <div className="mt-4 h-72 animate-pulse rounded-xl bg-muted" />
        </div>
        <div className="rounded-xl border bg-card p-6">
          <div className="h-5 w-32 animate-pulse rounded-md bg-muted" />
          <div className="mt-4 space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-16 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
