import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"

export default async function LeadsPage() {
  let data: Array<typeof leads.$inferSelect> = [];
  try {
    data = await db.select().from(leads).orderBy(desc(leads.createdAt));
  } catch (e) {
    console.warn("Database not ready", e);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inbox / Leads</h1>
          <p className="text-muted-foreground mt-2">
            Kelola prospek dan pesan dari calon klien.
          </p>
        </div>
      </div>
      
      <div className="rounded-md border bg-card text-card-foreground shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 text-center">No</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Kontak</TableHead>
              <TableHead>Layanan Diminati</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-48 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-3">
                      <EnvelopeIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium">Belum ada leads</p>
                    <p className="text-sm text-muted-foreground mt-1">Inbox masih kosong untuk saat ini.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((lead, index) => (
                <TableRow key={lead.id}>
                  <TableCell className="text-center text-muted-foreground">
                    {index + 1}
                  </TableCell>
                  <TableCell className="font-medium">
                    {lead.name}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{lead.email}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{lead.phone || '-'}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {lead.service || 'Umum'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={lead.status === 'Unread' ? 'destructive' : lead.status === 'Followed Up' ? 'default' : 'outline'}>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(lead.createdAt).toLocaleDateString("id-ID", {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <button className={buttonVariants({ variant: "outline", size: "sm" })}>
                      Detail
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
