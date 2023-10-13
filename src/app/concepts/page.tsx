"use client";
import React, { useEffect, useState } from "react";

import { conceptSearchRequest, terminologiesList } from "../utils/api";

import ConceptsCard from "../components/ConceptsCard";
import { MultiValue } from "react-select";
import Input from "../components/Input";
import Pagination from "../components/Pagination";
import SelectPerPage from "../components/SelectPerPage";
import SelectC from "../components/SelectC";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function Page() {
  const [input, setInput] = useState("");
  const [nbPerPage, setNbPerPage] = useState(10);
  const [nbPage, setNbPage] = useState(1);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [lang, setLang] = useState("Toutes les langues");
  const [selectedOption, setSelectedOption] = useState<MultiValue<{
    value: string;
    label: string;
  }> | null>(null);

  const [options, setOptions] = useState(new Array());

  const [data, setData] = useState<ConceptsData>();

  // Fetch the list of terminologies when the component mounts
  useEffect(() => {
    terminologiesList()
      .then((res: any) => {
        let tmp = new Array();
        let resA: Terminology[] = res;
        resA.forEach((element: Terminology) => {
          tmp.push({
            value: element.terminologyId,
            label: element.title,
          });
        });

        setOptions(tmp);
      })
      .catch((error: any) => {
        setError(error.message);
      });
  }, []);

  // Perform a concept search when the input changes (debounced to avoid excessive requests)
  useEffect(() => {
    if (input != "") {
      setError("");
      const timer = setTimeout(() => {
        conceptSearchRequest(
          input,
          nbPerPage,
          1,
          lang,
          selectedOption?.map((v) => v.value)
        )
          .then((res: any) => {
            setData(res as ConceptsData);
            setPage(1);
          })
          .catch((error: any) => {
            setError(error.message);
          });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [input]);

  // Perform a concept search when page, items per page, language, or terminology options change
  useEffect(() => {
    if (input != "") {
      setError("");

      try {
        if (page > nbPage) {
          setPage(nbPage);
        }
        if (page <= 0) {
          setPage(1);
        }
        conceptSearchRequest(
          input,
          nbPerPage,
          page <= 0 ? 1 : page,
          lang,
          selectedOption?.map((v) => v.value)
        )
          .then((res: any) => {
            setData(res);
          })
          .catch((error: any) => {
            setError(error.message);
          });
      } catch (error: any) {
        setError(error.message);
      }
    }
  }, [page, nbPerPage, lang, selectedOption]);

  // Update the total number of pages based on the search results
  useEffect(() => {
    if (data?.numberOfConcepts != undefined)
      setNbPage(Math.ceil(data?.numberOfConcepts / nbPerPage));
  }, [data]);

  return (
    <div className="flex items-center flex-col mt-10">
      <Link className="w-full items-center flex gap-4" href={"/"}>
        <AiOutlineArrowLeft />
        Accueil
      </Link>
      <div className="mb-20">Catalogue de concepts</div>
      {/* input et button */}
      <div className="flex w-[80%] justify-center">
        <Input
          onChange={(e) => setInput(e.target.value)}
          placeholder="Entrer un concept"
          value={input}
        />
        <div className="flex gap-5 w-[60%] text-xl items-center">
          <div className="flex w-[50%]">
            Carte par page :
            <SelectPerPage
              setSize={setNbPerPage}
              setPage={setPage}
              size={nbPerPage}
            />
          </div>
          <div className="flex w-[50%]">
            Langue :
            <SelectC
              onChange={(newValue, actionMeta) => {
                setLang(newValue.value);
                setPage(1);
              }}
              isMulti={false}
              selectedOption={{
                value:
                  lang == "Toutes les langues"
                    ? ""
                    : lang.slice(0, 2).toLowerCase(),
                label: lang,
              }}
              options={[
                { value: "fr", label: "Francais" },
                { value: "en", label: "English" },
                { value: "", label: "Toutes les langues" },
              ]}
            />
          </div>
        </div>
      </div>
      {/* select */}
      <div className="flex justify-center text-xl mt-10 w-[50%] ">
        Filtrer par terminologie :
        <SelectC
          isMulti={true}
          onChange={(newValue, actionMeta) => setSelectedOption(newValue)}
          options={options}
          selectedOption={selectedOption}
        />
      </div>
      {/* error */}
      <div className="mt-10 w-full flex justify-center h-10 text-lg text-red-500">
        {error}
      </div>
      {input != "" && data?.concepts?.length == 0 && (
        <div className=" w-full flex justify-center h-10 text-lg text-red-500">
          Aucun resultat
        </div>
      )}

      {/* pagination */}
      <Pagination page={page} setPage={setPage} nbPage={nbPage} data={data} />
      {/* liste des concepts */}
      {data &&
        data?.concepts?.length >= 1 &&
        data?.concepts.map((item: Concept, id: number) => {
          return <ConceptsCard key={id} item={item} id={id} />;
        })}
    </div>
  );
}
