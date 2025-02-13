import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2 } from "lucide-react";

const DeleteClassModal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  isPending,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-2xl p-6">
        <DialogHeader className="flex flex-col items-center text-center">
          <AlertTriangle className="text-red-500 w-12 h-12" />
          <DialogTitle className="text-lg font-semibold mt-4">
            Are you sure you want to delete this {message}?
          </DialogTitle>
          <p className="text-gray-500 text-sm">
            This action cannot be undone. All associated data will be lost.
          </p>
        </DialogHeader>
        <DialogFooter className="flex justify-center gap-4 mt-4">
          <Button variant="outline" onClick={onClose} className="w-full cursor-pointer">
            Cancel
          </Button>
          <Button
            disabled={isPending}
            variant="destructive"
            onClick={onConfirm}
            className="w-full cursor-pointer"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 size={18} className="animate-spin" />
                Please Wait...
              </span>
            ) : (
              "Yes, Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteClassModal;
