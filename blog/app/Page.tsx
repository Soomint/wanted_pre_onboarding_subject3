// page.tsx
import styles from '../styles/Home.module.css'
import BlogList from './components/BlogList'

// v13 "app" folder approach
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function Home() {
  return (
    <main className={styles.main}>
      <BlogList />
    </main>
  )
}
