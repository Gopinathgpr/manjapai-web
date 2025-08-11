import React from 'react';
import './related-govt-departments.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { useGetDepartmentsQuery } from '../../../Api/DepartmentsApi/departmentsApi';
import DepartmentSkeleton from '../../common/DepartmentSkeleton';

function Departments() {
  const { data: departments = [], error, isLoading, isError, refetch } = useGetDepartmentsQuery();

  return (
    <div className="departments-total-section">
      <h3 className="departments-title">
        {localStorage.getItem('language') === 'Tamil'
          ? 'தொடர்புடைய அரசு துறைகள்'
          : 'Related Government Departments'}
      </h3>

      <div className="container formobileonly">
        {isError && (
          <div className="error-message">
            <p>Failed to load departments: {error?.message || 'Unknown error'}</p>
            <button onClick={refetch}>Retry</button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={5}
            breakpoints={{
              1024: { slidesPerView: 5 },
              768: { slidesPerView: 3 },
              480: { slidesPerView: 2 },
            }}
          >
            {[...Array(5)].map((_, index) => (
              <SwiperSlide key={index}>
                <DepartmentSkeleton />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Data State */}
        {!isLoading && !isError && (
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={5}
            navigation
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop
            breakpoints={{
              1024: { slidesPerView: 5 },
              768: { slidesPerView: 3 },
              480: { slidesPerView: 2 },
            }}
          >
            {departments.map((department, index) => (
              <SwiperSlide key={index}>
                {department.departmentLink ? (
                  <a href={department.departmentLink} target="_blank" rel="noopener noreferrer">
                    <img
                      className="departments-image"
                      src={department.filePath + department.departmentImage}
                      alt={department.departmentName || 'Department'}
                    />
                  </a>
                ) : (
                  <img
                    className="departments-image"
                    src={department.filePath + department.departmentImage}
                    alt={department.departmentName || 'Department'}
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}

export default Departments;
