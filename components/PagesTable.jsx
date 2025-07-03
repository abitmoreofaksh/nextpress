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
  ChevronLeft,
  ChevronRight,
  X,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import DeleteDialog from "./DeleteDialog";
import AddDialog from "./Dialog";

const PagesTable = ({ pages: initialPages, onSuccess }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [initialLoad, setInitialLoad] = useState(true);
  // Core state - start with server-side data
  const [pages, setPages] = useState(initialPages);
  const [loading, setLoading] = useState(false);

  // UI state
  const [addOpen, setAddOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);

  // Local filter state (for UI only)
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);

  // Debounced search
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Only fetch data when filters change (not on initial load)
  const fetchData = useCallback(
    async (params) => {
      setLoading(true);
      try {
        const urlParams = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
          if (value && value !== "all" && value !== "") {
            urlParams.append(key, value.toString());
          }
        });

        const { data } = await axios.get(
          `${
            process.env.NEXT_PUBLIC_API_URL
          }/api/nextpress/get-url?${urlParams.toString()}`,
          { withCredentials: true }
        );

        setPages(data);

        // Update URL with new parameters
        const cleanParams = {};
        if (params.search) cleanParams.search = params.search;
        if (params.page > 1) cleanParams.page = params.page;
        if (params.limit !== 10) cleanParams.limit = params.limit;

        const newUrlParams = new URLSearchParams(cleanParams);
        const newUrl = `${pathname}${
          newUrlParams.toString() ? "?" + newUrlParams.toString() : ""
        }`;
        router.push(newUrl, { shallow: true });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    },
    [pathname, router]
  );

  // Handle search with debounce
  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }
    if (debouncedSearchTerm !== "") {
      console.log("Call here ");
      const params = {
        search: debouncedSearchTerm,
        page: 1,
        limit: currentLimit,
      };
      setCurrentPage(1);
      fetchData(params);
    } else if (debouncedSearchTerm === "" && searchTerm === "") {
      const params = { page: 1, limit: currentLimit };
      setCurrentPage(1);
      fetchData(params);
    }
  }, [debouncedSearchTerm, currentLimit]);

  // Event handlers
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const params = {
      search: debouncedSearchTerm,
      page: newPage,
      limit: currentLimit,
    };
    fetchData(params);
  };

  const handleLimitChange = (newLimit) => {
    setCurrentLimit(newLimit);
    setCurrentPage(1);
    const params = {
      search: debouncedSearchTerm,
      page: 1,
      limit: newLimit,
    };
    fetchData(params);
    setFilterOpen(false);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setCurrentPage(1);
    const params = {
      page: 1,
      limit: currentLimit,
    };
    fetchData(params);
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setCurrentPage(1);
    setCurrentLimit(10);
    fetchData({ page: 1, limit: currentLimit });
    router.push(pathname, { shallow: true });
  };

  // Modal handlers
  const handleAdd = () => setAddOpen(true);
  const handleDeleteOpen = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };
  const handleDeleteClose = () => {
    setDeleteModal(false);
    setDeleteId(null);
  };
  const handleAddClose = () => setAddOpen(false);

  // Refresh data after successful operations

  // Utility functions
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

  const generatePageNumbers = () => {
    const totalPages = pages?.total_pages || 1;
    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  // Check if any filters are active
  const hasActiveFilters = searchTerm || currentLimit !== 10;

  const filteredProjects = pages?.data || [];

  const handleSuccess = async () => {
    const params = {
      search: searchTerm,
      page: currentPage,
      limit: currentLimit,
    };
    fetchData(params);
  };

  return (
    <>
      <DeleteDialog
        isOpen={deleteModal}
        onClose={handleDeleteClose}
        id={deleteId}
        onSuccess={handleSuccess}
      />
      <AddDialog
        isOpen={addOpen}
        onClose={handleAddClose}
        onSuccess={handleSuccess}
      />

      <div className="rounded-2xl border border-black shadow-dark bg-gradient-to-br from-neutral-900 to-neutral-900/50 backdrop-blur-sm overflow-hidden">
        {/* Table Header Controls */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-white">All Pages</h2>
            <span className="px-3 py-1 text-xs bg-neutral-800 text-neutral-300 rounded-full">
              {pages?.total || 0} Total •{" "}
              {pages?.total_pages === 1
                ? pages?.total_pages + " Page"
                : pages?.total_pages + " Pages"}
            </span>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="px-2 py-1 text-xs bg-red-600/20 text-red-400 border border-red-600/30 rounded-full hover:bg-red-600/30 transition-colors"
              >
                Clear Filters
              </button>
            )}
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
                placeholder="Search pages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-300 placeholder-neutral-500 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 w-64"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-500 hover:text-neutral-300"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="relative">
              <button
                className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
                  hasActiveFilters
                    ? "bg-blue-600/20 border-blue-600/30 text-blue-400"
                    : "bg-neutral-800 hover:bg-neutral-700 border-neutral-700"
                }`}
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm">Filter</span>
              </button>

              {/* Filter Dropdown */}
              {filterOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg z-50">
                  <div className="p-4 space-y-4">
                    {/* Items per page */}
                    <div>
                      <div className="text-sm font-medium text-white mb-2">
                        Items per page
                      </div>
                      <div className="grid grid-cols-4 gap-1">
                        {[5, 10, 20, 50].map((limit) => (
                          <button
                            key={limit}
                            onClick={() => handleLimitChange(limit)}
                            className={`px-2 py-1 rounded text-xs transition-colors ${
                              currentLimit === limit
                                ? "bg-neutral-700 text-white"
                                : "text-neutral-300 hover:bg-neutral-700"
                            }`}
                          >
                            {limit}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto relative">
          {loading && (
            <div className="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm z-10 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-white" />
            </div>
          )}
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
              {!loading && filteredProjects.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <CircleDashed className="w-12 h-12 text-neutral-600" />
                      <div className="text-neutral-400">
                        {hasActiveFilters
                          ? "No pages found matching your filters"
                          : "No pages found"}
                      </div>
                      {hasActiveFilters && (
                        <button
                          onClick={clearAllFilters}
                          className="text-sm text-neutral-500 hover:text-neutral-300 underline"
                        >
                          Clear all filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
              {filteredProjects.map((project, index) => (
                <tr
                  key={project._id || index}
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
                        {project.publisher.username
                          ? project.publisher.username
                          : "---"}
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
                        onClick={() => handleDeleteOpen(project._id)}
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

        {/* Pagination */}
        {pages?.total_pages > 1 && (
          <div className="flex items-center justify-between p-6 border-t border-neutral-800">
            <div className="text-sm text-neutral-400">
              Showing {(currentPage - 1) * currentLimit + 1} to{" "}
              {Math.min(currentPage * currentLimit, pages?.total || 0)} of{" "}
              {pages?.total || 0} results
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="flex items-center gap-1 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="text-sm">Previous</span>
              </button>

              <div className="flex items-center gap-1">
                {generatePageNumbers().map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === pageNum
                        ? "bg-neutral-700 text-white border border-neutral-600"
                        : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700 border border-neutral-700"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= (pages?.total_pages || 1)}
                className="flex items-center gap-1 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-sm">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Click outside to close filter */}
        {filterOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setFilterOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default PagesTable;
