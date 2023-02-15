import { useRouter } from "next/router";
import Header from "../../components/header";
import { GetStaticProps } from "next";

export default function CommentPage() {
  const router = useRouter();
  const id = router.query.chapter as string;

  return (
    <>
      <Header />
      <h1>Post: {id}</h1>
      <h1>Comment: {id}</h1>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {},
    revalidate: 3000,
  };
};
