"use client";

import { useState, useEffect } from "react";
import { FaBoxes, FaClock, FaChartLine, FaPercentage } from "react-icons/fa";

const stats = [
  {
    title: "Total Rooms",
    value: 285,
    icon: <FaBoxes className="text-xl text-gray-600 mr-2" />,
  },
  {
    title: "Pending Approval",
    value: 120,
    icon: <FaClock className="text-xl text-yellow-500 mr-2" />,
  },
  {
    title: "Demanded Room this month",
    value: 89,
    icon: <FaChartLine className="text-xl text-green-500 mr-2" />,
  },
  {
    title: "Presence Rate",
    value: "46%",
    icon: <FaPercentage className="text-xl text-blue-500 mr-2" />,
  },
];

interface Workspace {
  id: number;
  name: string;
  departement: string;
  floor: number | null;
  capacity: number | null;
  status: boolean;
  available: number | null;
}

interface NewWorkspace {
  name: string;
  departement: string;
  floor: string;
  capacity: string;
  status: boolean;
  available: number | null;
}

export default function AVLSpace() {
  const [showAddWorkspace, setShowAddWorkspace] = useState(false);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [newWorkspace, setNewWorkspace] = useState<NewWorkspace>({
    name: "",
    departement: "",
    floor: "",
    capacity: "",
    available: null,
    status: true,
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [RH_USER_ID, setRH_USER_ID] = useState<string | null>(null);
  const [successMessageDelete, setSuccessMessageDelete] = useState<
    string | null
  >(null);

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const RH_USER_ID =
      localStorage.getItem("id") || sessionStorage.getItem("id");
    setToken(token);
    setRH_USER_ID(RH_USER_ID);
  }, []);

  // Fetch workspaces on component mount
  useEffect(() => {
    if (!RH_USER_ID || !token) return;

    const fetchWorkspaces = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/RH/spaces?userId=${RH_USER_ID}`, {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (response.ok) {
          setWorkspaces(data.data);
        } else {
          setError(data.msg || "Failed to fetch workspaces");
        }
      } catch (err) {
        setError("Network error occurred");
        console.error("Error fetching workspaces:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkspaces();
  }, [RH_USER_ID, token]);

  const handleAddWorkspace = async (e: React.FormEvent) => {
    e.preventDefault();

    // Save current state for potential rollback
    const previousWorkspaces = workspaces;

    // Optimistic update
    if (editingId !== null) {
      setWorkspaces((prevWorkspaces) =>
        prevWorkspaces.map((ws) =>
          ws.id === editingId
            ? {
                ...ws,
                name: newWorkspace.name,
                departement: newWorkspace.departement,
                floor: Number(newWorkspace.floor) || null,
                capacity: Number(newWorkspace.capacity) || null,
                status: newWorkspace.status,
              }
            : ws
        )
      );
    }

    try {
      setIsLoading(true);
      const method = editingId !== null ? "PUT" : "POST";

      const response = await fetch(`/api/RH/spaces`, {
        method,
        headers: {
          Authorization: token!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: RH_USER_ID,
          workspaceId: editingId,
          name: newWorkspace.name,
          departement: newWorkspace.departement,
          floor: newWorkspace.floor,
          capacity: newWorkspace.capacity,
          status: newWorkspace.status,
          available: newWorkspace.available,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Operation failed");
      }

      // Final update with server data (in case of any transformations)
      if (editingId !== null) {
        setWorkspaces((prevWorkspaces) =>
          prevWorkspaces.map((ws) => (ws.id === editingId ? data.data : ws))
        );
      } else {
        setWorkspaces((prevWorkspaces) => [...prevWorkspaces, data.data]);
      }

      // Show success message and reset form (same as before)
      // ...
    } catch (err) {
      // Rollback on error
      setWorkspaces(previousWorkspaces);
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error in workspace operation:", err);
    } finally {
      setIsLoading(false);
      setShowAddWorkspace(false);
    }
  };
  const modifyWorkspace = (id: number) => {
    const workspaceToEdit = workspaces.find((ws) => ws.id === id);
    if (workspaceToEdit) {
      setNewWorkspace({
        name: workspaceToEdit.name,
        departement: workspaceToEdit.departement,
        floor: workspaceToEdit.floor?.toString() || "",
        capacity: workspaceToEdit.capacity?.toString() || "",
        status: workspaceToEdit.status,
        available: workspaceToEdit.available,
      });
      setEditingId(id);
      setShowAddWorkspace(true);
    }
  };

  const deleteWorkspace = async (id: number) => {
    if (!confirm("Are you sure you want to delete this workspace?")) return;

    try {
      setIsLoading(true);
      const response = await fetch(`/api/RH/spaces`, {
        method: "DELETE",
        headers: {
          Authorization: token!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: RH_USER_ID,
          workspaceId: id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.reservationCount > 0) {
          throw new Error(
            `Cannot delete - workspace has ${data.reservationCount} active reservation(s)`
          );
        }
        throw new Error(data.msg || "Delete failed");
      }

      // Update the frontend state immediately without refreshing
      setWorkspaces((prevWorkspaces) =>
        prevWorkspaces.filter((ws) => ws.id !== id)
      );

      // Show success message
      setSuccessMessageDelete("Workspace deleted successfully!");
      setTimeout(() => setSuccessMessageDelete(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
      console.error("Error deleting workspace:", err);
    } finally {
      setIsLoading(false);
      setShowAddWorkspace(false);
    }
  };

  if (isLoading && workspaces.length === 0) {
    return (
      <div className="flex h-screen bg-gray-100">
        <main className="flex-1 p-6">
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gray-100">
        <main className="flex-1 p-6">
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 p-6">
        <div className="bg-white p-4 rounded-xl shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg p-4 flex flex-col items-center justify-center"
              >
                <div className="flex items-center mb-2">
                  {stat.icon}
                  <span className="text-sm font-medium text-gray-700">
                    {stat.title}
                  </span>
                </div>
                <div className="text-2xl font-bold text-black">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
        <section className="bg-gray-200 p-4 rounded flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Workspace Management</h3>
          <button
            onClick={() => setShowAddWorkspace(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "+ Add Workspace"}
          </button>
        </section>

        {showAddWorkspace && (
          <div className="bg-teal-100 p-6 rounded shadow-lg w-80 absolute right-4 top-20 z-10">
            <form
              className="flex flex-col space-y-4"
              onSubmit={handleAddWorkspace}
            >
              <h3 className="font-bold text-lg">
                {editingId !== null ? "Edit Workspace" : "Add New Workspace"}
              </h3>

              <label className="font-bold">Workspace Name:</label>
              <input
                type="text"
                className="p-2 border rounded"
                value={newWorkspace.name}
                onChange={(e) =>
                  setNewWorkspace({ ...newWorkspace, name: e.target.value })
                }
                required
              />

              <label className="font-bold">Department:</label>
              <input
                type="text"
                className="p-2 border rounded"
                value={newWorkspace.departement}
                onChange={(e) =>
                  setNewWorkspace({
                    ...newWorkspace,
                    departement: e.target.value,
                  })
                }
                required
              />

              <label className="font-bold">Floor:</label>
              <input
                type="number"
                className="p-2 border rounded"
                value={newWorkspace.floor}
                onChange={(e) =>
                  setNewWorkspace({ ...newWorkspace, floor: e.target.value })
                }
                min="1"
              />

              <label className="font-bold">Capacity:</label>
              <input
                type="number"
                className="p-2 border rounded"
                value={newWorkspace.capacity}
                onChange={(e) =>
                  setNewWorkspace({ ...newWorkspace, capacity: e.target.value })
                }
                min="1"
              />

              <label className="font-bold">Available:</label>
              <input
                type="number"
                className="p-2 border rounded"
                value={newWorkspace.available || ""}
                onChange={(e) =>
                  setNewWorkspace({
                    ...newWorkspace,
                    available: Number(e.target.value),
                  })
                }
                min="0"
              />

              <label className="font-bold flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={newWorkspace.status}
                  onChange={(e) =>
                    setNewWorkspace({
                      ...newWorkspace,
                      status: e.target.checked,
                    })
                  }
                />
                Active
              </label>

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading
                  ? "Processing..."
                  : editingId !== null
                  ? "Update Workspace"
                  : "Add Workspace"}
              </button>

              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                onClick={() => {
                  setShowAddWorkspace(false);
                  setEditingId(null);
                  setNewWorkspace({
                    name: "",
                    departement: "",
                    floor: "",
                    capacity: "",
                    available: null,
                    status: true,
                  });
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workspaces.map((workspace) => (
            <div key={workspace.id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-bold">{workspace.name}</h3>
              <p>Department: {workspace.departement}</p>
              <p>Floor: {workspace.floor || "N/A"}</p>
              <p>Capacity: {workspace.capacity || "N/A"}</p>
              <p>Available: {workspace.available || "N/A"}</p>
              <p>Status: {workspace.status ? "Active" : "Inactive"}</p>
              <div className="flex justify-between mt-4">
                <button
                  className="text-purple-600 p-2 bg-gray-100 rounded hover:bg-purple-100"
                  onClick={() => modifyWorkspace(workspace.id)}
                  disabled={isLoading}
                >
                  Modify
                </button>
                <button
                  className="text-red-600 p-2 bg-gray-100 rounded hover:bg-red-100"
                  onClick={() => deleteWorkspace(workspace.id)}
                  disabled={isLoading}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
