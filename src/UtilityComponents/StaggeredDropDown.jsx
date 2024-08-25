import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const StaggeredDropDown = () => {
  return (
    <div className="relative">
      <FlyoutLink href="#" FlyoutContent={PricingContent}>
        Pricing
      </FlyoutLink>
    </div>
  );
};

const FlyoutLink = ({ children, href, FlyoutContent }) => {
  const [open, setOpen] = useState(false);

  const showFlyout = FlyoutContent && open;

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative"
    >
      <a href={href} className="text-gray-700 hover:text-indigo-600">
        {children}
      </a>
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white shadow-lg z-50 mt-2"
          >
            <div className="w-64 p-6">
              <div className="mb-3 space-y-3">
                <h3 className="font-semibold">For Individuals</h3>
                <a href="#" className="block text-sm hover:underline">
                  Introduction
                </a>
                <a href="#" className="block text-sm hover:underline">
                  Pay as you go
                </a>
              </div>
              <div className="mb-6 space-y-3">
                <h3 className="font-semibold">For Companies</h3>
                <a href="#" className="block text-sm hover:underline">
                  Startups
                </a>
                <a href="#" className="block text-sm hover:underline">
                  SMBs
                </a>
                <a href="#" className="block text-sm hover:underline">
                  Enterprise
                </a>
              </div>
              <button className="w-full rounded-lg border-2 border-neutral-950 px-4 py-2 font-semibold transition-colors hover:bg-neutral-950 hover:text-white">
                Contact sales
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PricingContent = () => (
  <div className="w-64 bg-white p-6 shadow-xl">
    <div className="mb-3 space-y-3">
      <h3 className="font-semibold">For Individuals</h3>
      <a href="#" className="block text-sm hover:underline">
        Introduction
      </a>
      <a href="#" className="block text-sm hover:underline">
        Pay as you go
      </a>
    </div>
    <div className="mb-6 space-y-3">
      <h3 className="font-semibold">For Companies</h3>
      <a href="#" className="block text-sm hover:underline">
        Startups
      </a>
      <a href="#" className="block text-sm hover:underline">
        SMBs
      </a>
      <a href="#" className="block text-sm hover:underline">
        Enterprise
      </a>
    </div>
    <button className="w-full rounded-lg border-2 border-neutral-950 px-4 py-2 font-semibold transition-colors hover:bg-neutral-950 hover:text-white">
      Contact sales
    </button>
  </div>
);

export default StaggeredDropDown;
