import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CreditCard, IndianRupee } from "lucide-react";

export function PayPendingFees({
  open,
  onClose,
  pendingAmount,
  setPendingAmount,
  paymentMode,
  setPaymentMode,
  transactionId,
  setTransactionId,
  isLoading,
  handleSubmit,
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-6 max-w-md rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold mb-4 text-center">
            Pay Pending Fees
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            {/* Pending Amount */}
            <div>
              <Label htmlFor="pendingAmount">Pending Amount</Label>
              <Input
                id="pendingAmount"
                type="number"
                placeholder="Enter Payment Amount"
                value={pendingAmount}
                onChange={(e) => setPendingAmount(Number(e.target.value))}
                className="mt-1 w-full"
              />
            </div>

            {/* Payment Mode & Transaction ID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Payment Mode */}
              <div>
                <Label htmlFor="paymentMode">Payment Mode*</Label>
                <Select value={paymentMode} onValueChange={setPaymentMode}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Payment Mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Online">Online</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Transaction ID */}
              <div>
                <Label htmlFor="utrNo">UTR/Bank Tran. No. (Online)</Label>
                <Input
                  type="text"
                  id="utrNo"
                  name="utrNo"
                  placeholder="Enter UTR/Bank Tran. No."
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  disabled={paymentMode === "Cash"}
                  className="mt-1 w-full"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button
              type="button"
              disabled={isLoading}
              onClick={() => onClose(!open)}
              variant="outline"
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
            > <IndianRupee size={18} />Pay Now
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
