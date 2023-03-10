import { useRouter } from "next/router";
import Header from "../../../components/header";
import { GetStaticProps } from "next";

export default function CommentPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const comment = router.query.comment as string;

  return (
    <>
      <Header />
      <h1>Post: {id}</h1>
      <h1>Comment: {comment}</h1>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true, // can also be true or 'blocking'
  };
}

// `getStaticPaths` requires using `getStaticProps`
export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log("test");
  return {
    // Passed to the page component as props
    props: { post: {} },
  };
};
