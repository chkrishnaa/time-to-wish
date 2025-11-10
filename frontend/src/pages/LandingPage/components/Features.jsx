import React from "react";
import { birthdayFeatures } from "../../../utils/data";
import { useTheme } from "../../../context/ThemeContext";
import { motion } from "framer-motion";

const Features = () => {
  const { darkMode } = useTheme();

  const CreateCard = ({ card }) => {
    const Icon = card.icon; // get icon component reference
    return (
      <div
        className={`group p-4 rounded-2xl mx-4 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-80 shrink-0 border-2 border-gray-200 ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        <div className="flex gap-3 items-center">
          <div
            className={`p-3 rounded-full transition-all duration-300 ${
              darkMode
                ? "bg-gray-700 text-blue-300"
                : "bg-blue-100 text-blue-600"
            }`}
          >
            <Icon
              className={`size-6 transform transition-transform duration-300 ease-out
          group-hover:rotate-6 group-hover:scale-110
          ${darkMode ? "text-blue-400" : "text-blue-600"}`}
            />
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-base">{card.title}</p>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {card.subtitle}
            </span>
          </div>
        </div>
        <p className="text-sm py-4 leading-relaxed text-gray-700 font-medium text-justify">
          {card.description}
        </p>
      </div>
    );
  };

  return (
    <>
      <style>{`
  @keyframes scrollX {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  .marquee-track {
    display: flex;
    width: max-content;
    animation: scrollX 80s linear infinite;
  }
  .marquee-track.reverse {
    animation-direction: reverse;
  }
  // .marquee:hover .marquee-track {
  //   animation-play-state: paused;
  // }
`}</style>

<section
      className={`py-20 ${
        darkMode ? "bg-gray-950" : "bg-white"
      } relative overflow-hidden`}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Platform
            <span
              className={`bg-gradient-to-r ${
                darkMode
                  ? "from-blue-700 to-blue-800"
                  : "from-blue-600 to-blue-700"
              } bg-clip-text text-transparent`}
            >
              {" "}
              Analytics
            </span>
          </h2>
          <p
            className={`text-lg sm:text-xl ${
              darkMode ? "text-gray-300" : "text-gray-600"
            } max-w-3xl mx-auto`}
          >
            Harnessing the power of platform analytics, you can gain real-time
            insights into user behavior, engagement, and trends, enabling you to
            make data-driven decisions instantly.
          </p>
        </motion.div>

        <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              viewport={{ once: true }}>

      {/* 🔹 Top Marquee Row */}
      <div className="marquee w-full mx-auto max-w-6xl overflow-hidden relative">
        <div
          className={`absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r ${
            darkMode ? "from-gray-900" : "from-white"
          } to-transparent`}
        />
        <div className="marquee-track pt-5 pb-5">
          {[...birthdayFeatures, ...birthdayFeatures].map((feature, index) => (
            <CreateCard key={`top-${index}`} card={feature} />
          ))}
        </div>
        <div
          className={`absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l ${
            darkMode ? "from-gray-900" : "from-white"
          } to-transparent`}
        />
      </div>

      {/* 🔹 Reverse Marquee Row */}
      <div className="marquee w-full mx-auto max-w-6xl overflow-hidden relative">
        <div
          className={`absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r ${
            darkMode ? "from-gray-900" : "from-white"
          } to-transparent`}
        />
        <div className="marquee-track reverse pt-5 pb-5">
          {[...birthdayFeatures]
            .reverse()
            .concat([...birthdayFeatures].reverse())
            .map((feature, index) => (
              <CreateCard key={`bottom-${index}`} card={feature} />
            ))}
        </div>
        <div
          className={`absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l ${
            darkMode ? "from-gray-900" : "from-white"
          } to-transparent`}
        />
      </div>
              </motion.div>

      </div>
    </section>
    </>
  );
};

export default Features;
