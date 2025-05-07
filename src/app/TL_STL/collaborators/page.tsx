import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function CollaboratorsPage() {
  const collaborators = await prisma.user.findMany({
    where: { type: "collaborateur" },
    include: {
      Reservation: {
        select: {
          id: true,
        },
      },
    },
  });
  const loading = collaborators.length === 0;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Collaborators</h1> {/* Move the title here */}
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Work Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reservations
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Personal Number
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {collaborators.length > 0 ? (
                collaborators.map((c) => (
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
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    {loading ? "Loading..." : "No collaborators found"}
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
