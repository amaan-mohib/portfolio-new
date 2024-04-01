"use server";

import { initializeFirebaseAdmin } from "@/lib/firebase-admin";
import { getDownloadURL } from "firebase-admin/storage";

export const getCachedData = async (
  type: "info" | "projects" | "links" | "home",
) => {
  const { db, storage } = await initializeFirebaseAdmin();
  let json = null;
  let getData = false;

  const path = `fetchedData/${type}.json`;
  const file = storage.file(path);

  try {
    const fileUrl = await getDownloadURL(file);
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }
    json = await response.json();
  } catch (error) {
    // console.log(error);
  }
  if (json) {
    const data = json;
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

      const buffer = Buffer.from(JSON.stringify(data), "utf8");
      await file.save(buffer, {
        contentType: "application/json",
        public: true,
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  return json || {};
};
