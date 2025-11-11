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
        className={`group p-4 rounded-2xl mx-4 transition-all duration-300 transform hover:scale-105 w-80 shrink-0 border-2 ${
          darkMode
            ? "border-gray-700 bg-gray-950 text-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
            : "border-gray-200 bg-white text-gray-900 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
        }`}
      >
        <div className="flex gap-3 items-center">
          <div
            className={`p-3 rounded-full transition-all duration-300 bg-gradient-to-br ${
              darkMode
                ? "from-blue-700 to-blue-900 text-blue-300"
                : "from-blue-100 to-blue-300 text-blue-600"
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
            <span
              className={`text-xs ${
                darkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              {card.subtitle}
            </span>
          </div>
        </div>
        <p
          className={`text-sm py-4 leading-relaxed font-medium text-justify ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
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
              insights into user behavior, engagement, and trends, enabling you
              to make data-driven decisions instantly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            viewport={{ once: true }}
            className={`${darkMode ? "bg-gray-950" : "bg-white"}`}
          >
            {/* 🔹 Top Marquee Row */}
            <div className="marquee w-full mx-auto max-w-6xl overflow-hidden relative">
              <div className="marquee-track pt-5 pb-5">
                {[...birthdayFeatures, ...birthdayFeatures].map(
                  (feature, index) => (
                    <CreateCard key={`top-${index}`} card={feature} />
                  )
                )}
              </div>
            </div>

            {/* 🔹 Reverse Marquee Row */}
            <div className="marquee w-full mx-auto max-w-6xl overflow-hidden relative">
              <div className="marquee-track reverse pt-5 pb-5">
                {[...birthdayFeatures]
                  .reverse()
                  .concat([...birthdayFeatures].reverse())
                  .map((feature, index) => (
                    <CreateCard key={`bottom-${index}`} card={feature} />
                  ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Features;
