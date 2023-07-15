import Header from "./Header"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <Header />
            <body>{children}</body>
        </html>
    )
}