import React from "react";
import { FaSearch } from "react-icons/fa";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { BiFirstPage, BiLastPage } from "react-icons/bi";

interface Props {
  page: number;
  setPage: (page: number) => void;
  nbPage: number;
  data: any;
}
export default function Pagination({ page, setPage, nbPage, data }: Props) {
  return (
    <div className="mt-10 text-[0.8em] flex flex-row w-[30%] justify-between">
      {page > 1 ? (
        <>
          <div className="w-[15%] flex justify-end">
            <button onClick={() => setPage(1)}>
              <BiFirstPage />
            </button>
          </div>
          <div className="w-[15%] flex justify-end">
            <button onClick={() => setPage(page - 1)}>
              <AiOutlineArrowLeft />
            </button>
          </div>
        </>
      ) : (
        <div className="w-[30%]"></div>
      )}
      {(data?.numberOfConcepts >= 1 || data?.numberOfTerminologies >= 1) && (
        <div className="w-[40%] flex justify-center">
          <input
            className="bg-[transparent] flex w-fit max-w-[40%] justify-center text-center text-white"
            type="number"
            onChange={(e) => {
              setPage(parseInt(e.target.value));
            }}
            value={page}
          />
          / {nbPage}
        </div>
      )}
      {page < nbPage ? (
        <>
          <div className="w-[15%]">
            <button onClick={() => setPage(page + 1)}>
              <AiOutlineArrowRight />
            </button>
          </div>
          <div className="w-[15%]">
            <button onClick={() => setPage(nbPage)}>
              <BiLastPage />
            </button>
          </div>
        </>
      ) : (
        <div className="w-[30%]"></div>
      )}
    </div>
  );
}
