import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const AddressCurrentPermanent = ({
  sameAddressChecked,
  setSameAddressChecked,
  permanentAddress,
  setPermanentAddress,
  currAddress,
  setCurrAddress,
  isPending,
}) => {
  const handleSameAddressChecked = () => {
    setSameAddressChecked((prevChecked) => !prevChecked);
  };

  return (
    <div>
      {/* Address */}
      <Card className="md:my-6 ">
        <CardHeader>
          <CardTitle>Address</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Permanent Address */}
          <div className="col-span-3">
            <Label htmlFor="permanentAddress">Permanent Address</Label>
            <Input
              id="permanentAddress"
              placeholder="Enter Permanent Address"
              value={permanentAddress.permanentAddress}
              onChange={(e) =>
                setPermanentAddress({
                  ...permanentAddress,
                  permanentAddress: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="permanentState">State</Label>
              <Input
                id="permanentState"
                placeholder="Enter State"
                value={permanentAddress.state}
                onChange={(e) =>
                  setPermanentAddress({
                    ...permanentAddress,
                    state: e.target.value,
                  })
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="permanentCity">City</Label>
              <Input
                id="permanentCity"
                placeholder="Enter City"
                value={permanentAddress.city}
                onChange={(e) =>
                  setPermanentAddress({
                    ...permanentAddress,
                    city: e.target.value,
                  })
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="permanentPincode">Pincode</Label>
              <Input
                id="permanentPincode"
                placeholder="Enter Pincode"
                value={permanentAddress.zipCode}
                onChange={(e) =>
                  setPermanentAddress({
                    ...permanentAddress,
                    zipCode: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>

          {/* Toggle Same Address */}
          <div className="col-span-3 flex items-center gap-2">
            <input
              type="checkbox"
              id="sameAddress"
              checked={sameAddressChecked}
              onChange={handleSameAddressChecked}
            />
            <label htmlFor="sameAddress" className="cursor-pointer">
              Same as Permanent Address
            </label>
          </div>

          {/* Current Address */}
          <div className="col-span-3">
            <Label htmlFor="currentAddress">Current Address</Label>
            <Input
              id="currentAddress"
              placeholder="Enter Current Address"
              value={currAddress.currentAddress}
              onChange={(e) =>
                setCurrAddress({
                  ...currAddress,
                  currentAddress: e.target.value,
                })
              }
            />
          </div>
          <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="currentState">State</Label>
              <Input
                id="currentState"
                placeholder="Enter State"
                value={currAddress.state}
                onChange={(e) =>
                  setCurrAddress({
                    ...currAddress,
                    state: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label htmlFor="currentCity">City</Label>
              <Input
                id="currentCity"
                placeholder="Enter City"
                value={currAddress.city}
                onChange={(e) =>
                  setCurrAddress({
                    ...currAddress,
                    city: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label htmlFor="currentPincode">Pincode</Label>
              <Input
                id="currentPincode"
                placeholder="Enter Pincode"
                value={currAddress.zipCode}
                onChange={(e) =>
                  setCurrAddress({
                    ...currAddress,
                    zipCode: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 📌 Submit Button */}
      <div className="text-center md:pb-0 pb-15">
        <Button
          disabled={isPending}
          type="submit"
          className="lg:w-1/4 md:w-1/2 w-full mt-4 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white px-6 py-2 rounded-lg shadow-lg"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <Loader2 size={18} className="animate-spin" />
              Please Wait...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-1">
              Submit
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default AddressCurrentPermanent;
