"use client";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";

export default function EnquiryPage() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch function
  const loadData = async () => {
    setLoading(true);
    const res = await fetch("/api/enquiry");
    const json = await res.json();
    setData(json);
    setSelected([]); // clear selection on refetch
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const toggle = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const toggleAll = () => {
    setSelected(selected.length === data.length ? [] : data.map((d) => d.id));
  };

  const bulkDelete = async () => {
    await fetch("/api/enquiry/bulk-delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: selected }),
    });
    loadData(); // ✅ no reload
  };

  const bulkComplete = async () => {
    await fetch("/api/enquiry/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: selected }),
    });
    loadData(); // ✅ no reload
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Enquiry List</h1>

        {/* ✅ REFRESH BUTTON */}
        <Button onClick={loadData} variant="outline" disabled={loading}>
          {loading ? "Refreshing..." : "Refresh 🔄"}
        </Button>
      </div>

      <div className="flex gap-3">
        <Button variant="destructive" disabled={!selected.length} onClick={bulkDelete}>
          Delete Selected ({selected.length})
        </Button>
        <Button disabled={!selected.length} onClick={bulkComplete}>
          Mark Completed
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead><Checkbox checked={selected.length === data.length} onCheckedChange={toggleAll}/></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell><Checkbox checked={selected.includes(row.id)} onCheckedChange={() => toggle(row.id)} /></TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.product}</TableCell>
              <TableCell className={row.completed ? "text-green-600" : "text-yellow-600"}>
                {row.completed ? "✅ Completed" : "⏳ Pending"}
              </TableCell>
              <TableCell>{new Date(row.created_at).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
