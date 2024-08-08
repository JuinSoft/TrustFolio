import React, { useState } from "react";
import Head from "next/head";
import { Box } from "@chakra-ui/react";
import { Navbar, Landpage, Footer } from "../component";
import styles from '../styles/Home.module.css';
import Marketplace from "./Marketplace";
import MyDatafolio from "./MyDatafolio";
import MyDataBids from "./MyDataBids";
import Dataplace from "./Dataplace";

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <Landpage setActiveTab={setActiveTab} />;
      case 1:
        return <Marketplace />;
      case 2:
        return <Dataplace />;
      case 3:
        return <MyDatafolio />;
      case 4:
        return <MyDataBids />;
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

      <Box as="main" className={styles.main}>
        {renderContent()}
      </Box>

      <Footer />
    </div>
  );
}