import Link from "next/link";
import React from "react";
interface Props {
  item: Concept;
  id: number;
}
export default function ConceptsCard({ item, id }: Props) {
  return (
    <div
      className={
        "flex flex-col text-lg w-[50%] bg-[#1f115e] gap-4 p-5 rounded-lg h-fit" +
        (id == 0 ? " mt-32 mb-5" : " my-5")
      }
    >
      <div className="text-[1.2em]">
        {item.prefLabel} ({item.terminologyLabel})
      </div>
      <div>
        Lien complementaire :
        <Link
          target="_blank"
          href={item.id}
          className="flex break-all flex-wrap text-[#757575]"
        >
          {item.id}
        </Link>
        <div className="flex break-all flex-wrap text-[#757575]">
          {item.code + (item.dcType ? " - " + item.dcType : "")}
        </div>
      </div>
      <div className="text-[0.8em]">
        {item.definition != "" ? item.definition : "Aucune definition"}
      </div>
    </div>
  );
}
