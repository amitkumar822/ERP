import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "@/components/ui/table";
import { PlusCircle, Trash2, Edit, Download } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const categories = ["Fiction", "Non-Fiction", "Science", "History", "Technology"];

export default function Library() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: "", author: "", category: "", available: "Yes" });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedBooks = [...books];
      updatedBooks[editIndex] = form;
      setBooks(updatedBooks);
      setEditIndex(null);
    } else {
      setBooks([...books, form]);
    }
    setForm({ title: "", author: "", category: "", available: "Yes" });
  };

  const handleEdit = (index) => {
    setForm(books[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setBooks(books.filter((_, i) => i !== index));
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Library Book List", 14, 10);
    doc.autoTable({
      startY: 20,
      head: [["Title", "Author", "Category", "Available"]],
      body: books.map(({ title, author, category, available }) => [title, author, category, available]),
    });
    doc.save("Library_Books.pdf");
  };

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold">Manage Library Books</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Input name="title" placeholder="Book Title" value={form.title} onChange={handleChange} required />
            <Input name="author" placeholder="Author" value={form.author} onChange={handleChange} required />
            <select name="category" value={form.category} onChange={handleChange} className="border p-2 rounded" required>
              <option value="">Select Category</option>
              {categories.map((cat, idx) => <option key={idx} value={cat}>{cat}</option>)}
            </select>
            <select name="available" value={form.available} onChange={handleChange} className="border p-2 rounded" required>
              <option value="Yes">Available</option>
              <option value="No">Borrowed</option>
            </select>
            <Button type="submit" className="w-full flex gap-2">
              <PlusCircle size={18} /> {editIndex !== null ? "Update Book" : "Add Book"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Button onClick={downloadPDF} className="w-full flex gap-2 bg-green-500 text-white">
        <Download size={18} /> Download Book List
      </Button>

      {books.length > 0 && (
        <Card className="mt-4">
          <CardContent className="p-4">
            <h3 className="text-lg font-bold">Library Books</h3>
            <Table className="mt-2">
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.map((book, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.category}</TableCell>
                    <TableCell>{book.available}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(idx)}>
                        <Edit size={14} />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(idx)}>
                        <Trash2 size={14} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
