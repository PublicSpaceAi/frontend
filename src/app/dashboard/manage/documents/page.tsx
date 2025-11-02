"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  Download,
  Search,
  FileText,
  Upload,
  Eye,
} from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadDate: string;
  category: "academic" | "administrative" | "announcement" | "other";
  status: "active" | "archived";
}

export default function ManageDocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Academic Calendar 2024-2025",
      type: "PDF",
      size: "2.4 MB",
      uploadedBy: "Admin",
      uploadDate: "2024-01-10",
      category: "academic",
      status: "active",
    },
    {
      id: "2",
      name: "Course Syllabus - Mathematics",
      type: "PDF",
      size: "1.8 MB",
      uploadedBy: "Dr. Smith",
      uploadDate: "2024-01-15",
      category: "academic",
      status: "active",
    },
    {
      id: "3",
      name: "School Policies & Procedures",
      type: "DOCX",
      size: "3.2 MB",
      uploadedBy: "Admin",
      uploadDate: "2024-01-05",
      category: "administrative",
      status: "active",
    },
    {
      id: "4",
      name: "Holiday Schedule",
      type: "PDF",
      size: "0.8 MB",
      uploadedBy: "Admin",
      uploadDate: "2024-02-01",
      category: "announcement",
      status: "active",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [newDocument, setNewDocument] = useState({
    name: "",
    category: "academic" as "academic" | "administrative" | "announcement" | "other",
  });

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === "all" || doc.category === filterCategory)
  );

  const handleUploadDocument = () => {
    if (newDocument.name) {
      const document: Document = {
        id: String(documents.length + 1),
        name: newDocument.name,
        type: "PDF",
        size: "0 MB",
        uploadedBy: "Admin",
        uploadDate: new Date().toISOString().split("T")[0],
        category: newDocument.category,
        status: "active",
      };
      setDocuments([...documents, document]);
      setNewDocument({ name: "", category: "academic" });
      setIsUploadingFile(false);
    }
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  const handleArchiveDocument = (id: string) => {
    setDocuments(
      documents.map((doc) =>
        doc.id === id
          ? { ...doc, status: doc.status === "active" ? "archived" : "active" }
          : doc
      )
    );
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "academic":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "administrative":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "announcement":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Manage Documents
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Upload, organize, and manage academic and administrative documents
          </p>
        </div>
        <button
          onClick={() => setIsUploadingFile(!isUploadingFile)}
          className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 font-medium text-white hover:bg-purple-700 transition-colors"
        >
          <Upload size={20} />
          Upload Document
        </button>
      </div>

      {/* Upload Form */}
      {isUploadingFile && (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Upload New Document
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Document Name
              </label>
              <input
                type="text"
                value={newDocument.name}
                onChange={(e) =>
                  setNewDocument({ ...newDocument, name: e.target.value })
                }
                placeholder="Enter document name"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select
                  value={newDocument.category}
                  onChange={(e) =>
                    setNewDocument({
                      ...newDocument,
                      category: e.target.value as
                        | "academic"
                        | "administrative"
                        | "announcement"
                        | "other",
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="academic">Academic</option>
                  <option value="administrative">Administrative</option>
                  <option value="announcement">Announcement</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  File
                </label>
                <input
                  type="file"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleUploadDocument}
                className="rounded-lg bg-purple-600 px-4 py-2 font-medium text-white hover:bg-purple-700 transition-colors"
              >
                Upload
              </button>
              <button
                onClick={() => setIsUploadingFile(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-gray-900 placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <option value="all">All Categories</option>
          <option value="academic">Academic</option>
          <option value="administrative">Administrative</option>
          <option value="announcement">Announcement</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                    <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {doc.type} • {doc.size}
                    </p>
                  </div>
                </div>
              </div>

              {/* Category Badge */}
              <div className="mb-3">
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryBadgeColor(
                    doc.category
                  )}`}
                >
                  {doc.category.charAt(0).toUpperCase() +
                    doc.category.slice(1)}
                </span>
              </div>

              {/* Meta Info */}
              <div className="mb-4 space-y-1">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Uploaded by: <span className="font-medium">{doc.uploadedBy}</span>
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Date: <span className="font-medium">{doc.uploadDate}</span>
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 border-t border-gray-200 pt-3 dark:border-gray-700">
                <button className="flex-1 flex items-center justify-center gap-1 rounded py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors dark:text-blue-400 dark:hover:bg-blue-900/20">
                  <Eye size={16} />
                  View
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 rounded py-1.5 text-sm font-medium text-green-600 hover:bg-green-50 transition-colors dark:text-green-400 dark:hover:bg-green-900/20">
                  <Download size={16} />
                  Download
                </button>
                <button
                  onClick={() => handleArchiveDocument(doc.id)}
                  className="flex-1 flex items-center justify-center gap-1 rounded py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors dark:text-gray-400 dark:hover:bg-gray-700"
                  title={
                    doc.status === "active" ? "Archive" : "Unarchive"
                  }
                >
                  {doc.status === "active" ? "Archive" : "Restore"}
                </button>
                <button
                  onClick={() => handleDeleteDocument(doc.id)}
                  className="flex items-center justify-center rounded py-1.5 px-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
            <FileText className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-400">
              No documents found
            </p>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Documents
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {documents.length}
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Active Documents
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {documents.filter((d) => d.status === "active").length}
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Academic Docs
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {documents.filter((d) => d.category === "academic").length}
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Archived Docs
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {documents.filter((d) => d.status === "archived").length}
          </p>
        </div>
      </div>
    </div>
  );
}
