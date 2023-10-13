import Link from "next/link";
import React from "react";
import { terminologyDownloadZip } from "../utils/api";
import { GoDownload } from "react-icons/go";

interface Props {
  data: Terminology;
}
export default function TerminologyCard({ data }: Props) {
  return (
    <div className="flex my-10 flex-col text-lg w-[50%] bg-[#1f115e] gap-4 p-5 rounded-lg h-fit">
      <div className="text-[1.2em] flex flex-row">
        <div className="flex flex-col  w-[33%]">
          <Link
            className="hover:underline"
            href={
              data.uri
                ? data.uri.replace(
                    /(\/\/)(esante)/,
                    (match: any, prefix: any, domain: any) => {
                      if (domain !== "smt.esante") {
                        return prefix + "smt." + domain;
                      } else {
                        return match;
                      }
                    }
                  )
                : "#"
            }
          >
            {data.title}
          </Link>
          <div className="text-[0.7em]">Date : {data.date}</div>
        </div>
        <div className=" text-[0.7em] flex flex-col  w-[33%]">
          <div>Version : {data.version}</div>
          <div>Licence : {data.licence.label}</div>
        </div>
        <div className=" text-[0.7em] flex flex-col  w-[33%]">
          <div>Thème : {data.theme ? data.theme : "Aucun thème"}</div>
          <div>
            Pers. morale(s) :{" "}
            {data.legalPersons.map((d, i) => {
              return (
                <>
                  <Link
                    className="hover:underline"
                    href={d.homepage ? d.homepage : "#"}
                  >
                    {d.label}
                  </Link>
                  {i == data.legalPersons.length - 1 ? "" : ", "}
                </>
              );
            })}
          </div>
        </div>
      </div>
      <Link
        href={terminologyDownloadZip(data.terminologyId, data.version)}
        className="flex text-[2em] justify-center"
      >
        <div className="flex text-[1em] justify-center">
          <GoDownload />{" "}
        </div>
        <div className="text-[0.5em] items-center flex justify-center">
          Télécharger {data.terminologyId}.zip
        </div>
      </Link>
    </div>
  );
}
