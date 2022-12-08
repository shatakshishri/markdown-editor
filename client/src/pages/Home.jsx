import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HomeNavbar from "../components/common/HomeNavbar";
import { FaSearch } from "react-icons/fa";
import { myAuth, myFiles } from "../states";
import { getFiles } from "../http";
import { GoMarkdown } from "react-icons/go";
import TimeAgo from "react-timeago";
import { ImSpinner8 } from "react-icons/im";

const Home = () => {
  const { username } = useParams();
  const auth = myAuth((state) => state.auth);
  const files = myFiles((state) => state.files);
  const setFiles = myFiles((state) => state.setFiles);
  const [search, setSearch] = useState("");
  const [sortedFiles, setSortedFiles] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getFiles();
        setFiles(data?.files);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    const sorted = files?.filter((file) =>
      file?.name?.toLowerCase()?.includes(search?.toLowerCase())
    );
    setSortedFiles(sorted);
  }, [search]);

  return (
    <>
      <div className="bg-black text-white">
        <div className="pt-4 mx-4 sm:mx-8">
          <HomeNavbar username={username} />
        </div>
        <hr className="mt-3 border-[#444]" />
      </div>
      <div
        className="bg-[#111] pt-6 px-4 sm:px-8"
        style={{
          minHeight: "calc(100vh - 50px)",
        }}
      >
        <SearchBar setSearch={setSearch} search={search} />
        <ShowFiles data={files} sortedFiles={sortedFiles} search={search} />
      </div>
    </>
  );
};

const SearchBar = ({ setSearch, search }) => {
  return (
    <div className="bg-black w-full border border-[#444] flex items-center space-x-2 px-4 py-3 rounded-md">
      {search ? (
        <div>
          <ImSpinner8 className="animate-spin text-gray-200 text-lg" />
        </div>
      ) : (
        <FaSearch className="text-gray-200" />
      )}
      <input
        type="search"
        placeholder="Search..."
        className="bg-black text-white w-full outline-none"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

const ShowFiles = ({ data, sortedFiles, search }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
      {!search
        ? data?.map((file) => {
            return <Card file={file} />;
          })
        : sortedFiles?.map((file) => {
            return <Card file={file} />;
          })}
    </div>
  );
};

const Card = ({ file }) => {
  return (
    <div className="text-white bg-black border border-[#444] rounded-md h-[150px] p-3 cursor-pointer flex flex-col justify-between hover:border-2 hover:border-white">
      <Link to={`/editor?fileId=${file?.fileId}`}>
        <div className="flex space-x-2">
          <GoMarkdown className="text-xl" />
          <p>{file?.name}</p>
        </div>
        <div>
          <p className="opacity-50">Id: {file?.fileId?.toString()}</p>
        </div>
      </Link>
      <div className="flex justify-between items-center">
        <TimeAgo date={file?.updatedAt} />
      </div>
    </div>
  );
};

export default Home;
