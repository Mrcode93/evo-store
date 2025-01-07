import React, { useState } from "react";
import { Link } from "react-router-dom";

const DropdownHeader = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Dropdown data
  const dropdownData = [
    {
      title: "Categories",
      items: [
        { name: "Electronics", link: "/categories/electronics" },
        { name: "Fashion", link: "/categories/fashion" },
        { name: "Home Appliances", link: "/categories/home-appliances" },
      ],
    },
    {
      title: "Brands",
      items: [
        { name: "Apple", link: "/brands/apple" },
        { name: "Samsung", link: "/brands/samsung" },
        { name: "Sony", link: "/brands/sony" },
      ],
    },
    {
      title: "Offers",
      items: [
        { name: "Today's Deals", link: "/offers/today" },
        { name: "Clearance", link: "/offers/clearance" },
        { name: "Flash Sales", link: "/offers/flash" },
      ],
    },
  ];

  return (
    <div className="w-full bg-primary border-b border-neutral shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {dropdownData.map((dropdown, index) => (
          <div
            key={index}
            className="relative group"
            onMouseEnter={() => setActiveDropdown(index)}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="text-secondary font-semibold hover:text-accent transition duration-300">
              {dropdown.title}
            </button>
            {activeDropdown === index && (
              <div className="absolute left-0 top-full mt-3 w-56 bg-light-primary shadow-lg rounded-lg overflow-hidden z-50 border border-light-neutral">
                <ul className="py-2">
                  {dropdown.items.map((item, i) => (
                    <li key={i} className="px-4 py-3 hover:bg-light-accent/20 transition duration-300">
                      <Link
                        to={item.link}
                        className="block text-light-secondary hover:text-accent font-medium"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownHeader;
