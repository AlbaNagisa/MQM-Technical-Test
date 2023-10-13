"use client";
import React, { useEffect } from "react";
import Input from "../components/Input";
import { terminologiesHome, terminologiesSearchRequest } from "../utils/api";
import Pagination from "../components/Pagination";
import SelectPerPage from "../components/SelectPerPage";
import TerminologyCard from "../components/TerminologyCard";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function page() {
  const [value, setValue] = React.useState("");
  const [data, setData] = React.useState<TerminologiesData>();
  const [size, setSize] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [nbPage, setNbPage] = React.useState(1);
  const [error, setError] = React.useState("");

  useEffect(() => {
    terminologiesHome()
      .then((res) => {
        setData(res as TerminologiesData);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, []);

  useEffect(() => {
    if (value != "") {
      const timer = setTimeout(() => {
        terminologiesSearchRequest(value, size, page)
          .then((res) => {
            setData(res as TerminologiesData);
          })
          .catch((e) => {
            setError(e.message);
          });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [value]);
  useEffect(() => {
    if (page > nbPage) {
      setPage(nbPage);
    }
    if (page <= 0) {
      setPage(1);
    }
    if (value != "") {
      terminologiesSearchRequest(value, size, page <= 0 ? 1 : page)
        .then((res) => {
          setData(res as TerminologiesData);
        })
        .catch((e) => {
          setError(e.message);
        });
    }
  }, [size, page]);

  useEffect(() => {
    if (data) {
      setNbPage(Math.ceil(data.numberOfTerminologies / size));
    }
  }, [data]);
  return (
    <div className="flex items-center gap-10 flex-col mt-10">
      <Link className="w-full items-center flex gap-4" href={"/"}>
        <AiOutlineArrowLeft />
        Accueil
      </Link>
      <div className="text-4xl">Catalogue de terminologies</div>
      <Input
        value={value}
        placeholder="Entrer une terminologie"
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="flex gap-5 w-[30%] justify-center text-xl items-center">
        Carte par page :
        <SelectPerPage setSize={setSize} setPage={setPage} size={size} />
      </div>

      <div className="mt-10 w-full flex justify-center h-10 text-lg text-red-500">
        {error}
      </div>
      {value != "" && data?.terminologies.length == 0 && (
        <div className="mt-10 w-full flex justify-center h-10 text-lg text-red-500">
          Aucun resultat
        </div>
      )}
      <Pagination page={page} setPage={setPage} nbPage={nbPage} data={data} />
      <div className="flex flex-col mt-10 w-full items-center">
        {data?.terminologies?.map((v: Terminology) => {
          return <TerminologyCard data={v} />;
        })}
      </div>
    </div>
  );
}
