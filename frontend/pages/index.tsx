import { useState, useEffect } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import Head from "next/head";
import wilderAPI from "../services/wilderAPI";
import Wilder from "../components/Wilder";
import Layout from "../components/Layout";
import AddAWilder from "../components/AddAWilder";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import styles from "../styles/Home.module.css";
import IWilder from "../interfaces/IWilder";
import { ISkill } from "../interfaces/ISkill";

type HomeProps = {
  wildersStatic: IWilder[];
  staticSkills: ISkill[];
};

export default function Home({ wildersStatic, staticSkills }: HomeProps) {
  const [wilders, setWilders] = useState<IWilder[]>([]);
  const [alltags, setAlltags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tagFilter = (wilder: IWilder) => {
    if (!selectedTags.length) return true;

    let tagFound: boolean[] = selectedTags.map(() => false);
    selectedTags.forEach((tag: string, tagIndex) => {
      if (wilder.name.includes(tag)) tagFound[tagIndex] = true;
      wilder.skills.forEach((skill: ISkill) => {
        if (skill.name === tag) tagFound[tagIndex] = true;
      });
    });
    return tagFound.every((tag) => tag === true);
  };

  useEffect(() => {
    setWilders(wildersStatic);
    console.log(wildersStatic);
  }, [wildersStatic]);

  useEffect(() => {
    setAlltags(
      [
        ...staticSkills.map((skill) => skill.name),
        ...wildersStatic.map((wilder) => wilder.name),
      ].sort()
    );
  }, []);

  return (
    <Layout>
      <Head>
        <title>Wilders Book</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.h2Container}>
          <h2>Wilders</h2>{" "}
          <Typeahead
            multiple
            id="tags"
            placeholder="Recherchez un wilder ou un skill"
            onChange={(text) => {
              setSelectedTags(text as string[]);
            }}
            options={alltags}
            selected={selectedTags}
          />
        </div>
        <div className={styles.wildersContainer}>
          {wilders &&
            wilders.length > 0 &&
            wilders
              .filter(tagFilter)
              .map((wilder: IWilder, wilderIndex) => (
                <Wilder
                  key={wilder.id}
                  wilder={wilder}
                  wilderIndex={wilderIndex}
                  staticSkills={staticSkills}
                  wilders={wilders}
                  setWilders={setWilders}
                />
              ))}
          <AddAWilder wilders={wilders} setWilders={setWilders} />
        </div>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  let wildersStatic: IWilder[] = [];
  let staticSkills: ISkill[] = [];

  try {
    wildersStatic = (await wilderAPI.back.get<IWilder[]>("/wilders")).data;
    staticSkills = (await wilderAPI.back.get<ISkill[]>(`/skills/`)).data;
  } catch (err) {
    console.error(err);
  }

  return {
    props: {
      wildersStatic,
      staticSkills,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}