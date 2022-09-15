import { useState, useEffect } from "react";
import Head from "next/head";
import wilderAPI from "../services/wilderAPI";
import Wilder from "../components/Wilder";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";

export default function Home({ wilders }) {
  // const [wilders, setWilders] = useState([]);

  // const getWilders = async () => {
  //   try {
  //     const res = (await wilderAPI.get("/wilders")).data;
  //     setWilders(res);
  //     console.log("res", res);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // useEffect(() => {
  //   getWilders();
  // }, []);

  return (
    <Layout>
      <Head>
        <title>Wilders Book</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h2>Wilders</h2>
        <div className={styles.wildersContainer}>
          {wilders &&
            wilders.length > 0 &&
            wilders.map((wilder) => <Wilder key={wilder.id} wilder={wilder} />)}
        </div>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  let wilders = [];
  try {
    wilders = (await wilderAPI.back.get("/wilders")).data;
  } catch (err) {
    console.error(err);
  }

  return {
    props: {
      wilders,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}
