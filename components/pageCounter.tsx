import React from 'react';

const PageCounter: React.FC<{
  pageNum: number;
  setPage: (e: any) => any;
  disable: boolean;
}> = ({ pageNum, setPage, disable }) => {
  return (
    <div className="flex justify-center">
      <button
        className="text-md font-semibold my-3 mx-2 py-2 px-5 border rounded bg-teal-500 text-white hover:cursor-pointer"
        disabled={pageNum - 1 === 0}
        onClick={() => setPage(pageNum - 1)}
      >
        Anterior
      </button>
      <div className="text-md font-semibold my-3 mx-2 py-2 px-5 border-2 rounded border-teal-500 bg-transparent text-teal-500 hover:cursor-pointer">
        {pageNum}
      </div>
      <button
        className="text-md font-semibold my-3 mx-2 py-2 px-5 border rounded bg-teal-500 text-white hover:cursor-pointer"
        disabled={disable}
        onClick={() => setPage(pageNum + 1)}
      >
        Proximo
      </button>
    </div>
  );
};

export default PageCounter;
