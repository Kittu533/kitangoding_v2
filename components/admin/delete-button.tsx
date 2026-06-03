"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { TrashIcon } from "@heroicons/react/24/outline";

type DeleteButtonProps = {
  id: string;
  action: (id: string) => Promise<{ success: boolean; error?: string }>;
};

export function DeleteButton({ id, action }: DeleteButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) return;
    
    setLoading(true);
    const response = await action(id);
    setLoading(false);

    if (response.success) {
      toast.success("Data berhasil dihapus");
    } else {
      toast.error(response.error || "Gagal menghapus data");
    }
  };

  return (
    <Button 
      variant="destructive" 
      size="sm" 
      onClick={handleDelete} 
      disabled={loading}
    >
      <TrashIcon className="h-4 w-4 mr-1" />
      {loading ? "Menghapus..." : "Hapus"}
    </Button>
  );
}
