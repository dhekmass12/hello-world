
 
export default function Layout({ children }) {
    return (
        <>
            <main>
                Hello {process.env.NEXT_PUBLIC_HELLO}.
            </main>
        </>
    )
}