"use server";

import { initializeFirebaseAdmin } from "@/lib/firebase-admin";
import { promises as fs } from "fs";

export const getCachedData = async (
  type: "info" | "projects" | "links" | "home",
) => {
  let json = "";
  let getData = false;

  const path = process.cwd() + `/src/fetchedData/${type}.json`;

  try {
    json = await fs.readFile(path, "utf-8");
  } catch (error) {
    console.log(error);
  }
  if (json) {
    const data = JSON.parse(json);
    const threeDays = 3 * 24 * 60 * 60 * 1000;
    if (new Date().getTime() - new Date(data.createdAt).getTime() > threeDays) {
      getData = true;
    } else {
      return data;
    }
  } else {
    getData = true;
  }

  if (getData) {
    try {
      const { db } = await initializeFirebaseAdmin();
      let data = {};
      if (type === "home") {
        const info: any = (
          await db.collection("info").doc("about").get()
        ).data();
        const projects = (
          await db.collection("projects").orderBy("index").limit(3).get()
        ).docs.map((doc) => doc.data());
        data = {
          info,
          projects,
          createdAt: new Date(),
        };
      } else if (type === "projects") {
        const projects = (
          await db.collection("projects").orderBy("index").get()
        ).docs.map((doc) => doc.data());
        const { info: description }: any = (
          await db.collection("info").doc("projects-about").get()
        ).data();
        data = {
          projects,
          description,
          createdAt: new Date(),
        };
      } else if (type === "info") {
        const info: any = (
          await db.collection("info").doc("about").get()
        ).data();
        data = {
          info,
          createdAt: new Date(),
        };
      } else if (type === "links") {
        const links = (
          await db.collection("links").orderBy("createdAt", "desc").get()
        ).docs.map((doc) => doc.data());
        const info: any = (
          await db.collection("info").doc("about").get()
        ).data();
        data = {
          links,
          info,
          createdAt: new Date(),
        };
      }

      await fs.writeFile(path, JSON.stringify(data), "utf-8");

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  return JSON.parse(json || "{}");
};
