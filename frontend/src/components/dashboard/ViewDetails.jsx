import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ViewDetails({ data, title, open, onClose }) {
  if (!data) return null;

  // Function to format values
  const formatValue = (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (key === "address") {
        return (
          <div>
            <p className="font-semibold">Permanent Address:</p>
            <p>
              {value?.permanentAddress?.permanentAddress},{" "}
              {value?.permanentAddress?.city}, {value?.permanentAddress?.state}{" "}
              - {value?.permanentAddress?.zipCode}
            </p>
            <p className="font-semibold mt-2">Current Address:</p>
            <p>
              {value?.currentAddress?.currentAddress},{" "}
              {value?.currentAddress?.city}, {value?.currentAddress?.state} -{" "}
              {value?.currentAddress?.zipCode}
            </p>
          </div>
        );
      } else if (key === "teacherId") {
        return (
          <div>
            <p>
              <span className="font-semibold">Name:</span> {value?.fullName}
            </p>
            <p>
              <span className="font-semibold">Contact:</span>{" "}
              {value?.phoneNumber}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {value?.email}
            </p>
            <p>
              <span className="font-semibold">Designation:</span>{" "}
              {value?.designation}
            </p>
          </div>
        );
      }
      return JSON.stringify(value, null, 2);
    }
    return value || "N/A";
  };

  // Exclude these fields
  const excludedFields = [
    "_id",
    "__v",
    "password",
    "profileImage",
    "document",
    "createdAt",
    "updatedAt",
    "classId",
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
          <DialogDescription>Complete {title}</DialogDescription>
        </DialogHeader>

        <div className="rounded-lg overflow-hidden border border-gray-300">
          <table className="w-full border-collapse">
            <tbody>
              {Object.entries(data).map(([key, value]) => {
                if (excludedFields.includes(key)) return null;

                return (
                  <tr key={key} className="border-b border-gray-200">
                    <td className="font-semibold p-3 bg-gray-200 capitalize md:whitespace-nowrap">
                      {key.replace(/([A-Z])/g, " $1")}
                    </td>
                    <td className="p-3">{formatValue(key, value)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
