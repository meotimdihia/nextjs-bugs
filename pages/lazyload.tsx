import React from "react";
import Image from "next/image";
import axios from "axios";

import {
  useInfiniteQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
const sizes = `
    (min-width: 1020px) 1000px,
    calc(100vw - 20px)`;

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const myLoader = ({ src, width }: { src: string; width: string }) => {
    return `https://picsum.photos/id/${src}/${width}/${width}`;
  };

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["projects"],
    async ({ pageParam = 1 }) => {
      const res = await axios.get(
        `https://picsum.photos/v2/list?page=${pageParam}&limit=100`
      );

      return { photos: res.data, nextPage: pageParam + 1 };
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
    }
  );

  return (
    <div style={{ maxWidth: 1000, marginLeft: "auto", marginRight: "auto" }}>
      <h1>Infinite Loading</h1>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        //@ts-ignore
        <span>Error: {error.message}</span>
      ) : (
        <>
          {data.pages?.map((page, i) => (
            <React.Fragment key={i}>
              {page.photos.map((photo: any) => (
                <div style={{ padding: 10 }} key={photo.id}>
                  <img
                    alt={"test"}
                    src={`https://picsum.photos/id/${photo.id}/${photo.width}/${photo.width}`}
                    width={photo.width}
                    height={photo.width}
                    loading={"lazy"}
                  />
                </div>
              ))}
            </React.Fragment>
          ))}
          <div style={{ margin: 10 }}>
            <button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
              style={{
                width: 300,
                height: 100,
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
              }}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                ? "Load More"
                : "Nothing more to load"}
            </button>
          </div>
          <div>
            {isFetching && !isFetchingNextPage
              ? "Background Updating..."
              : null}
          </div>
        </>
      )}
    </div>
  );
}
