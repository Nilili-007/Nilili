import { useState } from "react";
import { CoursePlaceInfo, MobileCourseToggleBtn } from "../common";
import { ItemCard } from "../post/PostCourse";

const CourseMobile = ({ course, filteredIdx, setFilteredIdx }: any) => {
  const [openCourse, setOpenCourse] = useState(false);
  const lists = JSON.parse(course?.courseList);

  return (
    <div className="lg:hidden 3xl:hidden xs:flex xs:flex-col">
      <ItemCard>
        <CoursePlaceInfo
          lists={lists}
          item={lists[filteredIdx]}
          idx={filteredIdx}
        />

        <p className="mt-1">{lists[filteredIdx]?.memo}</p>
      </ItemCard>
      <MobileCourseToggleBtn
        lists={lists}
        openCourse={openCourse}
        setOpenCourse={setOpenCourse}
      />
      {lists.length > 0 ? (
        <>
          {openCourse && (
            <>
              {lists.map((item: any, idx: number) => {
                return (
                  <ItemCard key={idx} onClick={() => setFilteredIdx(idx)}>
                    <div className="flex">
                      <div>
                        <h4 className="font-bold text-[20px]">
                          #{idx + 1} {item.name}
                        </h4>
                        <div className="w-full h-auto mt-1 text-gray-04 text-sm">
                          <p>{item.address}</p>
                          <p>{item.road}</p>
                          <p>{item.phone}</p>
                        </div>
                        <p className="mt-1">{item.memo}</p>
                      </div>
                    </div>
                  </ItemCard>
                );
              })}
            </>
          )}
        </>
      ) : null}
    </div>
  );
};

export default CourseMobile;
