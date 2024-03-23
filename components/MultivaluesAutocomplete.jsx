"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { Tag, TagLabel, TagCloseButton } from "@chakra-ui/react";

const MultivaluesAutocomplete = ({
  options,
  isShowOpt,
  onUpdateForm,
  defaultOpt = [],
}) => {
  const [optList, setOptList] = useState(
    defaultOpt.length == 0 ? [] : defaultOpt
  );
  const [filterList, setFilterList] = useState(options);
  const [genreKeyWord, setGenreKeyWord] = useState("");
  // console.log(optList)
  useEffect(() => {
    onUpdateForm(form => {
      delete form.figureType;
      return { ...form, genre: optList };
    });
    setGenreKeyWord("");
  }, [optList]);

  useEffect(() => {
    if (genreKeyWord === "") setFilterList(options);
    else {
      const filterGenre = options.filter(genre => {
        return genre.toLowerCase().indexOf(genreKeyWord.toLowerCase()) !== -1;
      });
      setFilterList(filterGenre);
    }
  }, [genreKeyWord]);
  return (
    <div className="relative mt-2">
      <div className="rounded-md mt-1 p-2 gap-1 flex flex-wrap items-center bg-white max-w-lg has-[:focus]:outline has-[:focus]:outline-blue-600">
        {optList.map((val, idx) => (
          <Tag
            size="md"
            height="fit-content"
            key={idx}
            paddingY={1}
            borderRadius="full"
            variant="solid"
            colorScheme="linkedin"
          >
            <TagLabel>{val}</TagLabel>
            <TagCloseButton
              onClick={() => {
                const newArr = optList.filter(genre => {
                  return genre !== val;
                });
                setOptList(newArr);
              }}
            />
          </Tag>
        ))}

        <input
          id="genre-input"
          type="text"
          className="flex-grow rounded-sm focus:outline-none"
          placeholder="Search Genre/Type"
          autoComplete="off"
          value={genreKeyWord}
          onChange={e => {
            setGenreKeyWord(e.target.value);
          }}
        />
      </div>
      <ul
        id="recom-keyword"
        className={`bg-secondary-100 w-full max-w-lg rounded-md px-2 py-2 max-h-48 overflow-y-scroll absolute z-10 border-4 border-stone-300 ${
          !isShowOpt ? "hidden" : ""
        }`}
      >
        {filterList.length == 0 ? (
          <li className="flex">
            <button
              onClick={() => {
                setOptList(old => {
                  let newOptionList = [...old];
                  if (old.indexOf(genreKeyWord) == -1)
                    newOptionList = [...old, genreKeyWord];
                  return newOptionList;
                });
              }}
              className="bg-teal-800 justify-center inline text-white px-4 py-1 rounded-full hover:bg-teal-900"
            >
              Add new genre
            </button>
          </li>
        ) : (
          filterList.map((val, idx) => (
            <li
              key={idx}
              onClick={() => {
                const filterInput = document.querySelector("#genre-input");
                filterInput.value = "";
                setFilterList(options);
                setOptList(old => {
                  let newOptionList = [...old];
                  if (old.indexOf(val) == -1) newOptionList = [...old, val];
                  return newOptionList;
                });
              }}
              className="hover:bg-slate-300 px-2 py-1 rounded-md"
            >
              {val}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default MultivaluesAutocomplete;
