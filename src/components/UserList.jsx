import React, { useEffect, useState } from "react";
import api from "../services/api";
import UserForm from "./UserForm";
import Pagination from "./Pagination";
import FilterPopup from "./FilterPopup";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  useEffect(() => { fetchUserData(); }, []);

  useEffect(() => { handleSearchAndFilter(); }, [users, search, sortField, sortOrder]);

  const fetchUserData = async () => {
    try {
      const res = await api.get("/users");
      const mapped = res.data.map((u, i) => ({
        id: u.id,
        firstName: u.name.split(" ")[0] || "",
        lastName: u.name.split(" ")[1] || "",
        email: u.email,
        department: ["Engineering", "Sales", "HR", "Marketing"][i % 4],
      }));
      setUsers(mapped);
      setFilteredUsers(mapped);
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const addUser = (user) => {
    const newUsers = [...users, { ...user, id: Number(user.id) }];
    setUsers(newUsers);
    setFilteredUsers(newUsers);
  };

  const updateUser = (id, updatedUser) => {
    const updatedUsers = users.map(u => (u.id === id ? { ...u, ...updatedUser } : u));
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  const deleteUser = (id) => {
    const updatedUsers = users.filter(u => u.id !== id);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  const handleSearchAndFilter = () => {
    let data = [...users];
    if (search) {
      data = data.filter(
        u =>
          u.firstName.toLowerCase().includes(search.toLowerCase()) ||
          u.lastName.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase()) ||
          u.department.toLowerCase().includes(search.toLowerCase())
      );
    }
    data.sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredUsers(data);
    setPage(1);
  };

  const startIndex = (page - 1) * limit;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + limit);

  if (loading) return <p className="text-center text-blue-500">Loading users...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">👨‍💻 User Management Dashboard</h2>

      {/* Top Actions */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/3 shadow-sm"
        />
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilter(true)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded shadow"
          >
            Filter
          </button>
          <button
            onClick={() => { setShowForm(true); setEditingUser(null); }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
          >
            + Add User
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              {["id", "firstName", "lastName", "email", "department"].map(field => (
                <th
                  key={field}
                  className="p-3 text-left cursor-pointer"
                  onClick={() => {
                    setSortField(field);
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  }}
                >
                  {field.toUpperCase()} {sortField === field ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </th>
              ))}
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map(user => (
              <tr key={user.id} className="border-b hover:bg-gray-100 transition">
                <td className="p-3">{user.id}</td>
                <td className="p-3">{user.firstName}</td>
                <td className="p-3">{user.lastName}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.department}</td>
                <td className="p-3 flex justify-center gap-2">
                  <button
                    onClick={() => { setShowForm(true); setEditingUser(user); }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        total={filteredUsers.length}
        limit={limit}
        page={page}
        setPage={setPage}
        setLimit={setLimit}
      />

      {/* User Form */}
      {showForm && (
        <UserForm
          onClose={() => setShowForm(false)}
          onSubmit={editingUser ? (data) => updateUser(editingUser.id, data) : addUser}
          initialData={editingUser}
          lastId={users.length}
        />
      )}

      {/* Filter Popup */}
      {showFilter && (
        <FilterPopup
          users={users}
          setFilteredUsers={setFilteredUsers}
          onClose={() => setShowFilter(false)}
        />
      )}
    </div>
  );
};

export default UserList;
