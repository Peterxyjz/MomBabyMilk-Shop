import React from "react";
import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import { HiHome } from "react-icons/hi";

const Breadcrumbs = ({ headline, link }) => {
  return (
    <div className="flex justify-between items-center py-5 h-20">
      <div className="w-1/2">
        <Breadcrumb aria-label="Default breadcrumb example" className="text-2xl">
          <BreadcrumbItem href="/" icon={HiHome} >
            <p className="text-lg">Trang chủ</p>
          </BreadcrumbItem>
          <BreadcrumbItem href={link}>
          <p className="text-lg">{headline}</p>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="w-1/2 text-right">
        <h2 className="text-2xl md:text-3xl font-bold text-black">
          {headline}
        </h2>
      </div>
    </div>
  );
};

export default Breadcrumbs;
