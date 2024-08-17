import { searchFriends } from "../../utils/api";

function Pagination({
  hrefNext,
  hrefPrevious,
}: {
  hrefNext: string;
  hrefPrevious: string;
}) {
  function returnHREFWithPage(href: string | undefined | null) {
    if (href && href.includes("page")) {
      console.log(href);
      return (
        "http://localhost:4321/friends/add/" +
        href.split("?")[1].split("&")[1].split("=")[1]
      );
    }
    return "http://localhost:4321/friends/add/";
  }

  return (
    <div className="w-full h-20 flex justify-between items-center">
      {hrefPrevious ? (
        <a
          href={returnHREFWithPage(hrefPrevious)}
          className="justify-self-end w-12 h-12 p-1 border border-gray-600 hover:border-white transition-all rounded-md items-center"
        >
          <img
            src="/arrow-narrow-left.svg"
            alt="Flecha izquierda"
            className="w-10 h-10"
          />
        </a>
      ) : (
        <div className=" w-12 h-12"></div>
      )}

      {hrefNext ? (
        <a
          href={returnHREFWithPage(hrefNext)}
          className="self-start w-12 h-12 p-1 border border-gray-600 hover:border-white transition-all rounded-md items-center"
        >
          <img
            src="/arrow-narrow-right.svg"
            alt="Flecha izquierda"
            className="w-10 h-10"
          />
        </a>
      ) : (
        <div className=" w-12 h-12"></div>
      )}
    </div>
  );
}

export default Pagination;
