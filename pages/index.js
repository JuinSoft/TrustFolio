import React, { useState } from "react";
import Head from "next/head";
import { Box } from "@chakra-ui/react";
import { Navbar, Landpage, Footer } from "../component";
import styles from '../styles/Home.module.css';

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);

  const renderContent = () => {
    switch (activeTab) {
      default:
        return <Landpage />;
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Trustfolio</title>
        <meta name="description" content="Trustfolio" />
        <link rel="icon" href="/icon.png" />
      </Head>

      <Navbar setActiveTab={setActiveTab} />

      <main className={styles.main}>
        {renderContent()}
      </main>

      <Footer />
    </div>
  );
}