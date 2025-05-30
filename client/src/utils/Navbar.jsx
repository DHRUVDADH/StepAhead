import React from "react";
import profilePhoto from "../assets/profile_photo.jpeg";

const Navbar = ({ backMode, isElement }) => {
  // backMode = {
  //   title: "ABCD",
  //   desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo ea amet quibusdam",
  //   mode: true,
  // };
  // isElement = {
  //   mode: false,
  //   sectionTitle: "MyDrives",
  //   sectionItem: "TCS",
  // };
  return (
    <div className="w-full h-20 flex items-center py-4 relative">
      <div className="flex justify-center items-center gap-4 absolute left-0">
        {backMode.mode && (
          <div className="text-[25px] text-custom-text-color">
            <i class="fa-solid fa-circle-arrow-left"></i>
          </div>
        )}
        {isElement.mode ? (
          <div className="flex justify-center items-center gap-3 px-3 py-3">
            <div className="text-[25px] font-semibold">
              {isElement.sectionTitle}
            </div>
            <div className="text-[20px] font-semibold">
              <i class="fa-solid fa-chevron-right"></i>
            </div>
            <div className="text-[25px] font-semibold">
              {isElement.sectionItem}
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center px-2">
            <div className="text-[25px] font-semibold">{backMode.title}</div>
            <div className="text-sm">{backMode.desc}</div>
          </div>
        )}
      </div>
      <div className="h-full w-[250px] flex justify-center items-center gap-4 absolute left-[850px]">
        <div className="h-[50px] w-[2px] bg-custom-text-color"></div>
        <div>
          <img
            className="h-14 w-auto rounded-full "
            src={profilePhoto}
            alt=""
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center justify-between">
            <div className="text-[20px] font-semibold">Abhishek</div>
            <div>
              <i class="fa-solid fa-arrow-right"></i>
            </div>
          </div>
          <div className="text-xs font-light">Information technology</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
