import { Input } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";

import React, { useState } from "react";

const RangeWithOpt = ({ onUpdateForm, curForm, inputName }) => {
  const [filterOpt, setFilterOpt] = useState("from");
  const [betweenChoice, setBetweenChoice] = useState([false, false]);
  let inputOpt;
  if (filterOpt == "from") {
    inputOpt = (
      <Input
        borderRadius={4}
        bgColor="white"
        paddingX={2}
        size="sm"
        type="number"
        width="6rem"
        placeholder="from"
        name={`${inputName}-start`}
        onChange={e => {
          setBetweenChoice([false, false]);
          onUpdateForm(old => {
            delete old[`${inputName}-start`];
            delete old[`${inputName}-end`];
            if (e.target.value === "") {
              delete old[`${inputName}-start`];
              return {...old}
            }
            return { ...old, [e.target.name]: e.target.value };
          });
        }}
      />
    );
  } else if (filterOpt == "until")
    inputOpt = (
      <Input
        borderRadius={4}
        bgColor={"white"}
        paddingX={2}
        size="sm"
        type="number"
        width="6rem"
        placeholder="to"
        name={`${inputName}-end`}
        onChange={e => {
          setBetweenChoice([false, false]);
          onUpdateForm(old => {
            delete old[`${inputName}-start`];
            delete old[`${inputName}-end`];
            if (e.target.value === "") {
              delete old[`${inputName}-end`];
              return { ...old };
            }
            return { ...old, [e.target.name]: e.target.value };
          });
        }}
      />
    );
  else {
    if (!betweenChoice[0]) delete curForm[`${inputName}-start`];
    if (!betweenChoice[1]) delete curForm[`${inputName}-end`];
    inputOpt = (
      <>
        <Input
          borderRadius={4}
          bgColor="white"
          paddingX={2}
          size="sm"
          type="number"
          width="6rem"
          placeholder="from"
          name={`${inputName}-start`}
          onChange={e => {
            setBetweenChoice(old => [true, old[1]]);
            onUpdateForm(old => {
              if (e.target.value === "") {
                delete old[`${inputName}-start`];
                return { ...old };
              }
              return { ...old, [e.target.name]: e.target.value };
            });
          }}
        />
        <p className="text-secondary-100">-</p>
        <Input
          borderRadius={4}
          bgColor={"white"}
          paddingX={2}
          size="sm"
          type="number"
          width="6rem"
          placeholder="to"
          name={`${inputName}-end`}
          onChange={e => {
            setBetweenChoice(old => [old[0], true]);
            onUpdateForm(old => {
              if (e.target.value === "") {
                delete old[`${inputName}-end`];
                return { ...old };
              }
              return { ...old, [e.target.name]: e.target.value };
            });
          }}
        />
      </>
    );
  }
  return (
    <div className="flex items-center gap-2 mt-1">
      <Select
        size="sm"
        width="7rem"
        bgColor="white"
        borderRadius={4}
        onInput={e => {
          setFilterOpt(e.target.value);
        }}
      >
        <option value="from">From</option>
        <option value="until">To</option>
        <option value="between">Between</option>
      </Select>
      {inputOpt}
    </div>
  );
};

export default RangeWithOpt;
