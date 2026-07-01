import { db } from "@/lib/db";
import { blogCategories } from "@/lib/db/schema";
import { desc, count } from "drizzle-orm";
import { DocumentDuplicateIcon, PencilIcon } from "@heroicons/react/24/outline";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { buttonVariants } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { DeleteButton } from "@/components/admin/delete-button";
import { BlogCategoryForm } from "@/components/admin/blog-category-form";
import { deleteBlogCategory } from "./actions";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function BlogCategoriesPage(props: Props) {
  const searchParams = await props.searchParams;
  const pageParam = typeof searchParams.page === "string" ? searchParams.page : "1";
  const currentPage = Number.parseInt(pageParam, 10) || 1;
  const itemsPerPage = 8;
  const offset = (currentPage - 1) * itemsPerPage;

  let data: Array<typeof blogCategories.$inferSelect> = [];
  let totalItems = 0;
  let totalPages = 1;

  try {
    const [countResult, categoriesResult] = await Promise.all([
      db.select({ value: count() }).from(blogCategories),
      db.select()
        .from(blogCategories)
        .orderBy(desc(blogCategories.createdAt))
        .limit(itemsPerPage)
        .offset(offset),
    ]);

    totalItems = countResult[0].value;
    totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
    data = categoriesResult;
  } catch (error) {
    console.warn("Blog categories table is not ready yet.", error);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kategori Blog</h1>
          <p className="mt-2 text-muted-foreground">
            Kelola kategori yang muncul di artikel blog dan halaman publik.
          </p>
        </div>
        <BlogCategoryForm />
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
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                      <DocumentDuplicateIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium">Belum ada kategori blog</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Tambahkan kategori supaya konten blog lebih rapi.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center text-muted-foreground">
                    {offset + index + 1}
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    <code>{item.slug}</code>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(item.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <BlogCategoryForm
                        initialData={item}
                        trigger={(
                          <button className={buttonVariants({ variant: "outline", size: "sm" })}>
                            <PencilIcon className="mr-1 h-4 w-4" />
                            Edit
                          </button>
                        )}
                      />
                      <DeleteButton id={item.id} action={deleteBlogCategory} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {totalPages > 1 ? (
          <div className="border-t border-border py-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={currentPage > 1 ? `/admin/blog-categories?page=${currentPage - 1}` : "#"}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink href={`/admin/blog-categories?page=${index + 1}`} isActive={currentPage === index + 1}>
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href={currentPage < totalPages ? `/admin/blog-categories?page=${currentPage + 1}` : "#"}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        ) : null}
      </div>
    </div>
  );
}
