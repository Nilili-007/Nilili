import React, { Dispatch, SetStateAction, useState } from "react";

interface IPlacelist {
  name: string;
}

interface PostProps {
  setTargetPlace: Dispatch<SetStateAction<string>>;
  placeList: IPlacelist[];
  setPlaceList: Dispatch<SetStateAction<any>>;
}

const Plan = ({ setTargetPlace, placeList, setPlaceList }: PostProps) => {
  const [drag, setDrag] = useState<any | null>(null);

  const onDragOver = (e: any) => {
    e.preventDefault();
  };

  const onDragStart = (e: any) => {
    setDrag(e.target);
    e.target.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target);
  };

  const onDragEnd = (e: any) => {
    e.target.classList.remove("dragging");

    e.dataTransfer.dropEffect = "move";
  };

  const onDrop = (e: any) => {
    let dragPosition = Number(drag.dataset.position);
    let targetPosition = Number(e.target.dataset.position);

    let list = [...placeList];
    list[dragPosition] = list.splice(targetPosition, 1, list[dragPosition])[0];

    setPlaceList(list);
  };

  const onDragEnter = (e: any) => {
    let grabPosition = Number(drag.dataset.position);
    let targetPosition = Number(e.target.dataset.position);

    if (grabPosition < targetPosition) e.target.classList.add("move_up");
    else if (grabPosition > targetPosition) e.target.classList.add("move_down");
  };
  const onDragLeave = (e: any) => {
    e.target.classList.remove("move_up");
    e.target.classList.remove("move_down");
  };

  const onClickCircle = (e: any, key: number) => {
    setTargetPlace(placeList[key].name);
  };

  return (
    <>
      <div className="border-t border-black" />
      <div>
        <div className="flex justify-between mt-5">
          {placeList.map((item, key) => {
            return (
              <div
                onClick={(e) => onClickCircle(e, key)}
                key={key}
                className="flex flex-col justify-between cursor-pointer hover:opacity-50"
              >
                <h5
                  draggable
                  key={key}
                  data-position={key}
                  onDragOver={onDragOver}
                  onDragStart={(e: any) => onDragStart(e)}
                  onDragEnd={onDragEnd}
                  onDrop={onDrop}
                  className="font-bold text-2xl -mt-[70px]"
                >
                  #{key + 1} {item.name}
                </h5>
                <div className="flex justify-center items-center w-4 h-4 mb-3 rounded-full bg-black" />
              </div>
            );
          })}
          <div className="w-4 h-4 rounded-full bg-white border border-black -mt-7" />
        </div>
      </div>
    </>
  );
};

export default Plan;
