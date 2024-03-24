"use client";

import { Button } from "@/components/ui/button";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { toast } from "sonner";

const PoapAction = ({
  poap,
  hideBorder,
}: {
  poap: any;
  hideBorder?: boolean;
}) => {
  const [checkedIn, setCheckedIn] = useState(false);
  const [hide, setHide] = useState(false);

  if (hide) return null;

  return (
    <div
      key={poap.eventId}
      className={`grid grid-cols-4 px-4 pb-4 text-left ${hideBorder ? "" : "border-b border-gray-100"}`}
    >
      {/* eslint-disable-next-line  */}
      <img
        src={poap.image_url}
        alt={poap.eventName}
        className="w-18 col-span-1 aspect-square rounded-full object-cover"
        loading="lazy"
      />

      <div className="col-span-3 place-content-start text-left">
        {poap.city || poap.country ? (
          <div className="mt-3 line-clamp-2 text-ellipsis px-5 text-sm font-semibold">
            {poap.city ? poap.city + ", " : ""}
            {poap.country}
          </div>
        ) : null}
        <p className="mt-3 line-clamp-2 text-ellipsis px-5 text-sm text-gray-500">
          {poap.eventName}
        </p>

        {!checkedIn ? (
          <div className="ml-5 mt-2 flex space-x-5">
            <Button
              onClick={() => {
                toast.success("Checked in successfully");
                setCheckedIn(true);
              }}
              variant={"ghost"}
              size={"sm"}
            >
              <CheckIcon className="mr-2" /> Check In
            </Button>
            <Button
              onClick={() => {
                toast.success("Closed successfully");
                setHide(true);
              }}
              variant={"ghost"}
              size={"sm"}
            >
              <Cross2Icon className="mr-2" /> Close
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PoapAction;
