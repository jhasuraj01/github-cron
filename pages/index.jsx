import Head from 'next/head'
import styles from '../styles/Home.module.scss'

export default function Home({ timestamp, quote }) {
    return (
        <>
            <Head>
                <title>GitHub Actions Auto Build and Deploy Next.js APP with CRON JOB</title>
                <meta name="description" content="This is the Demonstration for how easily we can use Next.js and GitHub Actions to Create Sites with Dynamic content without any server and schedule CRON Job for auto build at specific time/interval of time." />
            </Head>
            <main className={styles.main}>
                <header className={styles.header}>
                    <h1># Daily Quote Machine</h1>
                </header>

                <p>Today&apos;s Quote By {quote.author}</p>
                <h2 className={styles.quote}><q>{quote.content}</q></h2>

                <p className={styles.desc}>Quotes get Automatically updated daily, around 12:00 AM. This is the Demonstration for how easily we can use Next.js and GitHub Actions to Create Sites with Dynamic content <b>without any server</b> and schedule <a target="_blank" rel="noopener noreferrer" href="https://crontab.guru/#0_0_*_*_*">CRON Job</a> for auto build at specific time/interval of time.</p>

            </main>
            <footer className={styles.footer}>
                <span><b>Last Auto Build:</b> {new Date(timestamp).toString()}</span>, <a target="_blank" rel="noopener noreferrer" href="https://github.dev/jhasuraj01/github-cron">Source Code</a>
            </footer>
        </>
    )
}

export async function getStaticProps() {

    const res = await fetch("https://quotable.io/random")
    const quote = await res.json()

    // Get date on build time
    // .toLocaleString("en-IN", { timeZone: 'Asia/Kolkata' })
    const timestamp = Date.now()

    return {
        props: { timestamp, quote }, // will be passed to the page component as props
    }
}