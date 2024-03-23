"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddPatientForm = () => {
  return (
    <form className="flex flex-col w-[1000px] gap-3">
      <div className="flex gap-4">
        <div className="w-full">
          <label className="font-semibold" htmlFor="">
            First Name
          </label>
          <Input />
        </div>
        <div className="w-full">
          <label className="font-semibold" htmlFor="">
            Last Name
          </label>
          <Input />
        </div>
      </div>
      <div className="flex gap-4">
        <div>
          <label className="font-semibold" htmlFor="">
            Gender
          </label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full">
          <label className="font-semibold" htmlFor="">
            Phone Number
          </label>
          <Input />
        </div>
        <div className="w-full">
          <label className="font-semibold" htmlFor="">
            Date of Birth
          </label>
          <br />
          <input
            type="date"
            className="h-10 rounded-md px-3 bg-input focus:outline-ring focus:outline-offset-2 focus:outline-2"
          />
        </div>
      </div>
      <div>
        <label className="font-semibold" htmlFor="">
          SSN
        </label>
        <Input className="max-w-[400px]" />
      </div>
      <div>
        <label className="font-semibold" htmlFor="">
          Address
        </label>
        <Input />
      </div>
      <Button className="w-fit self-end" size="lg">
        Submit
      </Button>
    </form>
  );
};

export default AddPatientForm;
