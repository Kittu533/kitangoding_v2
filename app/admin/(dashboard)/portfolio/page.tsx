import { db } from "@/lib/db";
import { portfolios, portfolioCategories } from "@/lib/db/schema";
import { desc, count, eq } from "drizzle-orm";
import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/outline";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { PortfolioForm } from "@/components/admin/portfolio-form";
import { DeleteButton } from "@/components/admin/delete-button";
import { deletePortfolio } from "./actions";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

type PortfolioRow = {
  id: string;
  name: string;
  categoryId: string | null;
  categoryName: string | null;
  thumbnail: string | null;
  result: string | null;
  createdAt: Date;
};

export default async function PortfolioPage(props: Props) {
  const searchParams = await props.searchParams;
  const pageParam = typeof searchParams.page === 'string' ? searchParams.page : '1';
  const currentPage = parseInt(pageParam, 10) || 1;
  const ITEMS_PER_PAGE = 5;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  let data: PortfolioRow[] = [];
  let categoriesData: Array<typeof portfolioCategories.$inferSelect> = [];
  let totalItems = 0;
  let totalPages = 1;

  try {
    const countResult = await db.select({ value: count() }).from(portfolios);
    totalItems = countResult[0].value;
    totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;

    data = await db.select({
      id: portfolios.id,
      name: portfolios.name,
      categoryId: portfolios.categoryId,
      categoryName: portfolioCategories.name,
      thumbnail: portfolios.thumbnail,
      result: portfolios.result,
      createdAt: portfolios.createdAt,
    })
      .from(portfolios)
      .leftJoin(portfolioCategories, eq(portfolios.categoryId, portfolioCategories.id))
      .orderBy(desc(portfolios.createdAt))
      .limit(ITEMS_PER_PAGE)
      .offset(offset);

    categoriesData = await db.select().from(portfolioCategories).orderBy(portfolioCategories.name);
  } catch (e) {
    console.warn("Database not ready", e);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>
          <p className="text-muted-foreground mt-2">
            Daftar proyek yang ditampilkan di website.
          </p>
        </div>
        <div>
          <PortfolioForm categories={categoriesData} />
        </div>
      </div>
      
      <div className="rounded-md border bg-card text-card-foreground shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 text-center">No</TableHead>
              <TableHead>Nama Proyek</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Result</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-48 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-3">
                      <PhotoIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium">Belum ada portfolio</p>
                    <p className="text-sm text-muted-foreground mt-1">Mulai tambahkan proyek pertama Anda.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center text-muted-foreground">
                    {offset + index + 1}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="h-12 w-12 flex-shrink-0">
                        {item.thumbnail ? (
                          <Image className="h-12 w-12 rounded-md object-cover border" src={item.thumbnail} alt="" width={48} height={48} />
                        ) : (
                          <div className="h-12 w-12 rounded-md bg-muted border flex items-center justify-center">
                            <PhotoIcon className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="font-medium">{item.name}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {item.categoryName || 'Tanpa Kategori'}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {item.result || '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <PortfolioForm 
                        initialData={item} 
                        categories={categoriesData}
                        trigger={
                          <button className={buttonVariants({ variant: "outline", size: "sm" })}> 
                            <PencilIcon className="h-4 w-4 mr-1" />
                            Edit
                          </button>
                        } 
                      />
                      <DeleteButton id={item.id} action={deletePortfolio} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {totalPages > 1 && (
          <div className="py-4 border-t border-border">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={currentPage > 1 ? `/admin/portfolio?page=${currentPage - 1}` : "#"}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href={`/admin/portfolio?page=${i + 1}`}
                      isActive={currentPage === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href={currentPage < totalPages ? `/admin/portfolio?page=${currentPage + 1}` : "#"}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}
