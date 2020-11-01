import React, { useEffect, useState } from "react";
import Button from "../../../components/atoms/Button";

export default function Pagination(props) {
  const { searchMovie } = props;
  const [page, setPage] = useState(props.page);
  const query = props.query;

  const Prev = async () => {
    if (page > 1) return setPage(page - 1);
    return null;
  };

  const Next = () => {
    if (page < props.data.total_pages) return setPage(page + 1);
    return null;
  };

  useEffect(() => {
    searchMovie(query, page);
    return () => {
      console.log("Clear");
    };
  }, [searchMovie, query, page]);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <Button className="page-link" onClick={Prev} aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </Button>
        </li>
        <li className="page-item">
          <Button className="page-link">
            Page {page} Of {props.data.total_pages}
          </Button>
        </li>
        <li className="page-item">
          <Button className="page-link" onClick={Next} aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </Button>
        </li>
      </ul>
    </nav>
  );
}
