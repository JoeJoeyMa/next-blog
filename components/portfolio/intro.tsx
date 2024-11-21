"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { CSSProperties, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import RingLoader from "react-spinners/ClipLoader";
import { url } from "inspector";
export default function Intro() {
  const [loading, setLoading] = useState(false);
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
  };
  return (
    <section
      id="home"
      className="mb-6 max-w-full text-center sm:mb-0 scroll-mt-[100rem]"
    >

      <motion.h1
        className="mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center text-center justify-self-start"
        >
          <h1
            id="name"
            className="text-center text-3xl  sm:text-5xl lg:text-6xl lg:leading-normal font-extrabold"
          >
            <TypeAnimation
              sequence={[
                "",
                500,
                "Hello, I'm MASON JOEY ",
                1000,
                "Web Developer Which ",
                1000,
                "Full Stack Developer Based ReactJs + NodeJs",
                1000,
                "",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              cursor={true}
              style={{ display: 'inline-block' }}
            />
          </h1>
        </motion.div>
        <p className="font-bold">with 5 years of experience</p>
        <p className="text-xl">
          in ReactNative, ReactJs, Node<span className="text-sm"> etc.</span>
        </p>

        <p className="text-base">
          <a
            className="underline mr-2 "
            href="mailto:joejoey.ma@gmail.com"
          >
            joejoey.ma@gmail.com
          </a>
          <span className="w-150 inline-block sm:inline"> +86-13500000000</span>
        </p>
        <p className=" text-lg">Frontend Dev | FullStack | ReactJs + NodeJs</p>
        <p className="text-base">
          Speaker of <span className="font-bold">English  Chinese</span>
        </p>
        <a className=" block text-sm font-bold underline" href="/#skills">
          more skills check here{" "}
        </a>
      </motion.h1>

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 text-lg font-medium"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
      >
        <Link
          // target="_blank"
          href="/en/projects"
          className=" relative mr-2 group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition"

        >
          <>
            Check My Projects here
          </>
        </Link>

        <a
          href="/en/resume"
          className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10"
        >
          Go to CV{" "}

        </a>

        <div className="flex">
          {/* <a
            className="bg-white p-4 text-gray-700 hover:text-gray-950 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
            href="https://linkedin.com"
            target="_blank"
          >
            <BsLinkedin />
          </a> 

          <a
            className="bg-white p-4 text-gray-700 flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
            href="https://github.com/zero19124"
            target="_blank"
          >
            <FaGithubSquare />
          </a>
                  */}
        </div>


        {loading && (
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              position: "fixed",
              zIndex: 999,
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <div>
              <RingLoader
                color={"#fff"}
                loading={loading}
                cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              <p className="text-white">
                downloading
                <span className="animate-ping"> .</span>
                <span className="animate-ping">.</span>
                <span className="animate-ping">.</span>
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
