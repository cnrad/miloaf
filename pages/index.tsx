import { motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Home: NextPage = () => {
    const [petCount, setPetCount] = useState(0);
    const [date, setDate] = useState("");

    const startDate = new Date("2021/10/15 20:13:06").getTime(); //generally

    useEffect(() => {
        updateTime();

        if (!window) return;
        const petStorage = localStorage.getItem("pet");

        if (!petStorage) return;

        setPetCount(parseInt(localStorage.getItem("pet") as string));
    }, []);

    function updateTime() {
        const current = new Date().getTime();

        const time = current - startDate;

        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((time / (1000 * 60)) % 60);
        const seconds = Math.floor((time / 1000) % 60);

        setDate(`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds `);
        setTimeout(updateTime, 1000);
    }

    const incrementPet = () => {
        setPetCount(petCount + 1);
        localStorage.setItem("pet", `${petCount + 1}`);
    };

    return (
        <>
            <Head>
                <title>miloaf</title>
            </Head>
            <Page
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <Kot
                    src="/miloaf.png"
                    onClick={incrementPet}
                    whileTap={{ height: "8.5rem", transition: { duration: 0, ease: "easeInOut" } }}
                    whileHover={{ cursor: "pointer" }}
                    draggable={false}
                />
                <PetCounter>pets: {petCount}</PetCounter>
                <ArtLink
                    href="https://twitter.com/catladydoodles"
                    target="_blank"
                    whileHover={{ color: "#4a4a47" }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                    @catladydoodles
                </ArtLink>
                <Footer>
                    <DateCaption>{date}</DateCaption>
                    {"made with EXTRA <3"}
                </Footer>
            </Page>
        </>
    );
};

const Page = styled(motion.div)`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background: rgba(0, 0, 0, 0);
`;

const Kot = styled(motion.img)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -100%);

    width: 15rem;
    height: 10rem;
`;

const PetCounter = styled.div`
    margin-top: 6rem;
    font-size: 1.75rem;
    color: #454542;
    user-select: none;
`;

const ArtLink = styled(motion.a)`
    font-size: 1.2rem;
    color: #8c8c84;
`;

const Footer = styled.div`
    position: absolute;
    bottom: 2rem;
    width: 100vw;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-start: center;

    font-size: 1.35rem;
    color: #454542;
    text-align: center;
`;

const DateCaption = styled.span`
    font-size: 1.35rem;
    color: #7a7a6d;
`;

export default Home;
