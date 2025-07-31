import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoFilter } from "react-icons/io5";
import axios from "axios";
import { Link } from "react-router-dom";

export const PopularPost = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openSections, setOpenSections] = useState({
    month: false,
    year: false,
  });

  const [selectedFilters, setSelectedFilters] = useState({
    month: null,
    year: null,
  });

  const [latestPosts, setLatestPosts] = useState([]);
  const filterRef = useRef(null);
  const baseUrl = import.meta.env.VITE_API_BASEURL;

  // Fetch blogs and filter only is_popular == false
  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/blogs`, {
          headers: { "Content-Type": "application/json" },
        });

        const lp = response.data.data.filter((obj) => obj.is_popular == true);
        setLatestPosts(lp);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      }
    };

    fetchLatestPosts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
        setOpenSections({ month: false, year: false });
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

const handleFilterSelection = (type, value) => {
  setSelectedFilters((prev) => ({
    ...prev,
    [type]: value,
  }));
  setIsFilterOpen(false);
  setOpenSections({ month: false, year: false });
};

  const clearFilters = () => {
    setSelectedFilters({ month: null, year: null });
  };

  // Utility to extract month/year from published_date
  const getMonthYear = (dateStr) => {
    const date = new Date(dateStr);
    const month = date.toLocaleString("default", { month: "long" }); // e.g., "March"
    const year = date.getFullYear();
    return { month, year };
  };

  // Filter posts based on month and year
  const filteredPosts = latestPosts.filter((post) => {
    const { month, year } = getMonthYear(post.published_date);
    return (
      (!selectedFilters.month || month === selectedFilters.month) &&
      (!selectedFilters.year || year === selectedFilters.year)
    );
  });

  return (
    <main className={`latestPost ${isFilterOpen ? "blur-background" : ""}`}>
      <div className="latestPost_contents">
        <div className="content">
          <h2 className="title">Popular Posts</h2>
          <p>
            Catch up on the stories, ideas, insights, and inspiration that our readers can’t get enough of.!</p>
        </div>

        {/* Filter UI */}
        <div className="filterContainer" ref={filterRef}>
          <div className="filterTop" onClick={() => setIsFilterOpen(!isFilterOpen)}>
            <IoFilter className="filterIcon" />
            <span className="selected-date">
              {selectedFilters.month || selectedFilters.year
                ? `${selectedFilters.month || ""} ${selectedFilters.year || ""}`.trim()
                : "Select Month & Year"}
            </span>
          </div>

          {isFilterOpen && (
            <div className="filterDropdown">
              <div className="filterSection">
                <h4 onClick={() => toggleSection("month")}>
                  Month <span>{openSections.month ? "−" : "+"}</span>
                </h4>
                {openSections.month && (
                  <ul>
                    {[
                      "January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December",
                    ].map((month, index) => (
                      <li key={index} onClick={() => handleFilterSelection("month", month)}>
                        {month}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="filterSection">
                <h4 onClick={() => toggleSection("year")}>
                  Year <span>{openSections.year ? "−" : "+"}</span>
                </h4>
                {openSections.year && (
                  <ul>
                    {[2021, 2022, 2023, 2024, 2025].map((year, index) => (
                      <li key={index} onClick={() => handleFilterSelection("year", year)}>
                        {year}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Clear Filters Button */}
              <button className="clearFilterBtn" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Display Latest Blog Posts */}
        <div className="container">
          <div className="row">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => {
                const { month, year } = getMonthYear(post.published_date);
                return (
               <div key={post.id} className="col-12 mb-5">
  <div className="blog-card">
    <Link to={`/blog/${post.title.split(" ").join("_")}`}>
      <img
        src={post.banner_image}
        alt={post.title}
        className="blog-card-img"
      />
    </Link>

    <div className="blog-card-content">
      <div>
        <Link to={`/blog/${post.title.split(" ").join("_")}`} className="blog-title">
          {post.title}
        </Link>
        <p className="blog-date-text">
          {month.toUpperCase()} {post.published_date.split("-")[2].replace(/^0/, "")}, {year} &nbsp; | &nbsp; BY KEROVIT
        </p>
        <p
  className="blog-desc"
  dangerouslySetInnerHTML={{
    __html:
      post.description?.length > 300
        ? post.description.slice(0, 300) + " [...]"
        : post.description,
  }}
></p>

      </div>
      <Link to={`/blog/${post.title.split(" ").join("_")}`} className="read-more">
        READ MORE
      </Link>
    </div>
  </div>
</div>


                );
              })
            ) : (
              <p className="text-center w-100">No posts found for the selected month and year.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
