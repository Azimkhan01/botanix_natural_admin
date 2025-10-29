"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export default function ContactLog() {
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("/api/contact");
    const data = await res.json();
    setContacts(data);
    setSelected([]);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelected(selected.length === contacts.length ? [] : contacts.map((c) => c.id));
  };

  const markCompleted = async (id) => {
    await fetch(`/api/contact/${id}`, { method: "PATCH" });
    toast("✅ Marked Completed");
    fetchData();
  };

  const deleteSelected = async () => {
    await fetch(`/api/contact`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: selected }),
    });
    toast("🗑️ Deleted Successfully");
    fetchData();
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Contact Log</h1>

        {/* ✅ REFRESH BUTTON */}
        <Button variant="outline" disabled={loading} onClick={fetchData}>
          {loading ? "Refreshing..." : "Refresh 🔄"}
        </Button>
      </div>

      {selected.length > 0 && (
        <Button variant="destructive" onClick={deleteSelected}>
          Delete Selected ({selected.length})
        </Button>
      )}

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-center">
                <Checkbox
                  checked={selected.length === contacts.length && contacts.length > 0}
                  onCheckedChange={toggleAll}
                />
              </th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Product</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {contacts.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-3 text-center">
                  <Checkbox
                    checked={selected.includes(c.id)}
                    onCheckedChange={() => toggleSelect(c.id)}
                  />
                </td>
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.email}</td>
                <td className="p-3">{c.phone}</td>
                <td className="p-3">{c.product}</td>
                <td className="p-3">
                  {c.status === "completed" ? "✅ Completed" : "⏳ Pending"}
                </td>
                <td className="p-3 text-right">
                  {c.status !== "completed" && (
                    <Button size="sm" onClick={() => markCompleted(c.id)}>
                      Mark Completed
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
