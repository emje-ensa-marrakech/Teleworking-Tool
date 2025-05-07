"use client";

import { useState, useEffect } from "react";

interface Collaborator {
  id: number;
  name: string;
  email: string;
  gender: string;
  department: string;
  workshours: string;
  personalNumber: string;
  type: string;
  Reservation: { id: number }[];
}

const defaultFormData = {
  name: "",
  email: "",
  gender: "",
  personalNumber: "",
  department: "",
  workshours: "",
  password: "",
  type: "collaborateur",
};

export default function CollaboratorsPage() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [formData, setFormData] = useState(defaultFormData);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [RH_USER_ID, setRH_USER_ID] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token") || sessionStorage.getItem("token");
    const storedUserId = localStorage.getItem("id") || sessionStorage.getItem("id");
    setToken(storedToken);
    setRH_USER_ID(storedUserId);
  }, []);

  useEffect(() => {
    if (token) {
      fetchCollaborators();
    }
  }, [token]);

  const fetchCollaborators = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/RH/collaborators", {
        headers: {
          Authorization: token!,
          "Content-Type": "application/json",
        },
      });
     

      if (!response.ok) {
        throw new Error("Failed to fetch collaborators");
      }

      const { data } = await response.json();
      console.log("data collab",data);
      setCollaborators(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    if (!formData.email || !validateEmail(formData.email)) {
      setError("Please enter a valid email");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    if (!formData.name) {
      setError("Name is required");
      return false;
    }
    if (!formData.personalNumber) {
      setError("Personal number is required");
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/RH/collaborators", {
        method: "POST",
        headers: {
          Authorization: token!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          personalNumber: Number(formData.personalNumber),
          RH_USER_ID,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Operation failed");
      }

      setCollaborators(prev => [...prev, result.data]);
      setSuccess("Collaborator added successfully!");
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(defaultFormData);
    setShowForm(false);
  };

  if (loading && collaborators.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Collaborators</h1>
          <button
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            {showForm ? "Cancel" : "+ Add Collaborator"}
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded relative">
            {error}
            <button onClick={() => setError("")} className="absolute right-2 top-2 font-bold">×</button>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded relative">
            {success}
            <button onClick={() => setSuccess("")} className="absolute right-2 top-2 font-bold">×</button>
          </div>
        )}

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">Add New Collaborator</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Name*" name="name" value={formData.name} handleChange={handleChange} required />
                <InputField label="Email*" type="email" name="email" value={formData.email} handleChange={handleChange} required />
                <SelectField 
                  label="Gender*" 
                  name="gender" 
                  value={formData.gender} 
                  handleChange={handleChange} 
                  required 
                  options={[
                    {value: "", label: "Select"},
                    {value: "Male", label: "Male"},
                    {value: "Female", label: "Female"},
                    {value: "Other", label: "Other"}
                  ]}
                />
                <InputField label="Personal Number*" name="personalNumber" value={formData.personalNumber} handleChange={handleChange} required />
                <InputField label="Department*" name="department" value={formData.department} handleChange={handleChange} required />
                <InputField label="Work Hours*" name="workshours" value={formData.workshours} handleChange={handleChange} required />
                <SelectField 
                  label="User Type" 
                  name="type" 
                  value={formData.type} 
                  handleChange={handleChange} 
                  required 
                  options={[
                    {value: "collaborateur", label: "Collaborator"},
                   
                  ]}
                />
                <InputField 
                  label="Password*" 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  handleChange={handleChange} 
                  required
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm text-sm font-medium hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Processing...' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Work Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reservations</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Personal Number</th>
                
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {collaborators.length > 0 ? (
                collaborators.map(c => (
                  <tr key={c.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{c.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{c.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{c.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{c.workshours}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{c.Reservation?.length || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{c.personalNumber}</td>
                    
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    {loading ? 'Loading...' : 'No collaborators found'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function InputField({
  label,
  name,
  value,
  handleChange,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
        required={required}
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  handleChange,
  required = false,
  options = []
}: {
  label: string;
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  options?: {value: string, label: string}[];
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
        required={required}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}