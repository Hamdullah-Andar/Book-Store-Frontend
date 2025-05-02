// import React, { useState } from "react";
// import BookCard from "../books/BookCard";

// // Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";

// // import required modules
// import { Navigation, Pagination } from "swiper/modules";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";

// const categories = [
//   "Choose a Genre",
//   "Business",
//   "Fiction",
//   "Horror",
//   "Adventure",
// ];

// const TopSellers = () => {
//   const [selectedCategory, setSelectedCategory] = useState("Choose a genre");

//   const { data: books = [] } = useFetchAllBooksQuery();

//   const filterBooks =
//     selectedCategory === "Choose a genre"
//       ? books
//       : books.filter(
//           (book) => book.category === selectedCategory.toLocaleLowerCase()
//         );

//   return (
//     <div className="py-10">
//       <h2 className="text-3xl font-semibold mb-6">Top Sellers</h2>

//       {/* Category Filtering */}
//       <div className="mb-8 flex items-center">
//         <select
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           name="category"
//           id="category"
//           className="border bg-[#EAEAEA] border-gray-300 rounded-md  px-4 py-2 focus:outline-none"
//         >
//           {categories.map((category, index) => (
//             <option key={index} value={category}>
//               {category}
//             </option>
//           ))}
//         </select>
//       </div>

//       <Swiper
//         slidesPerView={1}
//         spaceBetween={30}
//         // pagination={{
//         //   clickable: true,
//         // }}
//         navigation={true}
//         breakpoints={{
//           640: {
//             slidesPerView: 1,
//             spaceBetween: 20,
//           },
//           768: {
//             slidesPerView: 2,
//             spaceBetween: 40,
//           },
//           1024: {
//             slidesPerView: 2,
//             spaceBetween: 50,
//           },
//           1280: {
//             slidesPerView: 2,
//             spaceBetween: 50,
//           },
//         }}
//         modules={[Pagination, Navigation]}
//         className="mySwiper"
//       >
//         {filterBooks.length > 0 &&
//           filterBooks.map((book, index) => (
//             <SwiperSlide key={index}>
//               <BookCard book={book} />
//             </SwiperSlide>
//           ))}
//       </Swiper>
//     </div>
//   );
// };

// export default TopSellers;




import React from "react";
import BookCard from "../books/BookCard";

// Swiper components & styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Redux
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";

// List of categories to show
const categories = ["Business", "Fiction", "Horror", "Adventure", "Technology"];

const TopSellers = () => {
  const { data: books = [] } = useFetchAllBooksQuery();

  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold mb-6">Top Sellers</h2>

      {categories.map((category) => {
        const categoryBooks = books.filter(
          (book) => book.category?.toLowerCase() === category.toLowerCase()
        );

        if (categoryBooks.length === 0) return null;

        return (
          <div key={category} className="mb-10">
            <h3 className="text-2xl font-semibold mb-4">{category}</h3>
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              navigation={true}
              breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 40 },
                1024: { slidesPerView: 2, spaceBetween: 50 },
                1280: { slidesPerView: 2, spaceBetween: 50 },
              }}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {categoryBooks.map((book, index) => (
                <SwiperSlide key={index}>
                  <BookCard book={book} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        );
      })}
    </div>
  );
};

export default TopSellers;
