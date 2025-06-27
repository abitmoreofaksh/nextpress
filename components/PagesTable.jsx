"use client";
import {
  Search,
  Filter,
  Clock,
  CheckCircle,
  Pause,
  CircleDashed,
  TrashIcon,
  ExternalLink,
  Edit,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import DeleteDialog from "./DeleteDialog";
import AddDialog from "./Dialog";

const PagesTable = ({ pages, onSuccess }) => {
  const filteredProjects = pages?.data;
  const [addOpen, setAddOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const getStatusIcon = (status) => {
    switch (status) {
      case "Published":
        return <CheckCircle className="w-4 h-4" />;
      case "Draft":
        return <Pause className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Published":
        return "bg-green-600/20 text-green-600 border-green-600/30";
      case "Draft":
        return "bg-yellow-600/20 text-yellow-600 border-yellow-600/30";
      default:
        return "bg-neutral-500/20 text-neutral-400 border-neutral-500/30";
    }
  };
  const handleAdd = () => {
    setAddOpen(true);
  };
  const handleOpen = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };
  const onClose = () => {
    setDeleteModal(false);
    setDeleteId(null);
  };
  const onAddClose = () => {
    setAddOpen(false);
  };
  return (
    <>
      <DeleteDialog
        isOpen={deleteModal}
        onClose={onClose}
        id={deleteId}
        onSuccess={onSuccess}
      />
      <AddDialog isOpen={addOpen} onClose={onAddClose} onSuccess={onSuccess} />
      <div className="rounded-2xl border border-black shadow-dark bg-gradient-to-br from-neutral-900 to-neutral-900/50 backdrop-blur-sm overflow-hidden">
        {/* Table Header Controls */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-white">All Pages</h2>
            <span className="px-3 py-1 text-xs bg-neutral-800 text-neutral-300 rounded-full">
              {pages?.total_pages === 1
                ? pages?.total_pages + " Page"
                : pages?.total_pages + " Pages"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg transition-colors"
              onClick={handleAdd}
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm">Add Page</span>
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                placeholder="Search projects..."
                //   value={searchTerm}
                //   onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-300 placeholder-neutral-500 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600"
              />
            </div>

            <button className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg transition-colors">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filter</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="text-left py-4 px-6 text-sm font-medium text-neutral-400 uppercase tracking-wider">
                  Page Slug
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-neutral-400 uppercase tracking-wider">
                  Published By
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-neutral-400 uppercase tracking-wider">
                  Published On
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-neutral-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-neutral-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects?.map((project, index) => (
                <tr
                  key={index}
                  className={`border-b border-neutral-800/50 hover:bg-neutral-800/30 transition-colors ${
                    index % 2 === 0 ? "bg-neutral-900/50" : "bg-transparent"
                  }`}
                >
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-3">
                      <CircleDashed className="w-4 h-4 text-neutral-400" />
                      <span className="font-medium text-white capitalize">
                        {project.url.replaceAll("-", " ")}
                      </span>
                    </div>
                  </td>

                  <td className="py-5 px-6">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-white capitalize">
                        {project.published_by ? project.published_by : "---"}
                      </span>
                    </div>
                  </td>

                  <td className="py-5 px-6">
                    <span className="text-neutral-300">
                      {project?.updatedAt
                        ? new Date(project?.updatedAt).toDateString()
                        : "---"}
                    </span>
                  </td>
                  <td className="py-5 px-6">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(
                        project.status
                      )}`}
                    >
                      {getStatusIcon(project.status)}
                      {project.status}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Link href={`/preview/${project.url}`}>
                        <button className="border border-black shadow-dark w-8 h-8 flex items-center justify-center cursor-pointer rounded-lg text-neutral-500 hover:bg-green-600/20 hover:border-green-600/20">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </Link>
                      <Link href={`/editor/${project.url}`}>
                        <button className="border border-black shadow-dark w-8 h-8 flex items-center justify-center cursor-pointer rounded-lg text-neutral-500 hover:bg-blue-600/20 hover:border-blue-600/20">
                          <Edit className="w-4 h-4" />
                        </button>
                      </Link>
                      <button
                        className="border border-black shadow-dark w-8 h-8 flex items-center justify-center cursor-pointer rounded-lg text-neutral-500 hover:bg-red-600/20 hover:border-red-600/20"
                        onClick={() => handleOpen(project._id)}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PagesTable;
