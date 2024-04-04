"use server";

export const getCachedData = async (
  type: "info" | "projects" | "links" | "home",
  getOnlyResponse?: boolean,
) => {
  try {
    const res = await fetch(`${process.env.JSON_DATA_BASE_URL}/${type}.json`, {
      next: {
        revalidate: 3600,
      },
    });

    if (getOnlyResponse) return res;

    const json = await res.json();

    return json || {};
  } catch (error) {
    console.log(error);
    return {};
  }
};
