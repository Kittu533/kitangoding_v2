import { db } from "@/lib/db";
import { portfolioCategories } from "@/lib/db/schema";
import { desc, count } from "drizzle-orm";
import { FolderIcon, PencilIcon } from "@heroicons/react/24/outline";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { buttonVariants } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { CategoryForm } from "@/components/admin/category-form";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteCategory } from "./actions";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function CategoriesPage(props: Props) {
  const searchParams = await props.searchParams;
  const pageParam = typeof searchParams.page === 'string' ? searchParams.page : '1';
  const currentPage = parseInt(pageParam, 10) || 1;
  const ITEMS_PER_PAGE = 5;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  let data: Array<typeof portfolioCategories.$inferSelect> = [];
  let totalItems = 0;
  let totalPages = 1;

  try {
    const countResult = await db.select({ value: count() }).from(portfolioCategories);
    totalItems = countResult[0].value;
    totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;

    data = await db.select()
      .from(portfolioCategories)
      .orderBy(desc(portfolioCategories.createdAt))
      .limit(ITEMS_PER_PAGE)
      .offset(offset);
  } catch (e) {
    console.warn("Database not ready", e);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kategori Portofolio</h1>
          <p className="text-muted-foreground mt-2">
            Kelola kategori untuk mengelompokkan proyek Anda.
          </p>
        </div>
        <div>
          <CategoryForm />
        </div>
      </div>
      
      <div className="rounded-md border bg-card text-card-foreground shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 text-center">No</TableHead>
              <TableHead>Nama Kategori</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Dibuat</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-48 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-3">
                      <FolderIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium">Belum ada kategori</p>
                    <p className="text-sm text-muted-foreground mt-1">Mulai tambahkan kategori pertama Anda.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center text-muted-foreground">
                    {offset + index + 1}
                  </TableCell>
                  <TableCell className="font-medium">
                    {item.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    <code>{item.slug}</code>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(item.createdAt).toLocaleDateString("id-ID", {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <CategoryForm 
                        initialData={item} 
                        trigger={
                          <button className={buttonVariants({ variant: "outline", size: "sm" })}> 
                            <PencilIcon className="h-4 w-4 mr-1" />
                            Edit
                          </button>
                        } 
                      />
                      <DeleteButton id={item.id} action={deleteCategory} />
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
                    href={currentPage > 1 ? `/admin/categories?page=${currentPage - 1}` : "#"}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href={`/admin/categories?page=${i + 1}`}
                      isActive={currentPage === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href={currentPage < totalPages ? `/admin/categories?page=${currentPage + 1}` : "#"}
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
