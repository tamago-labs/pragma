

const FullLayout = ({ children }) => {
    return (
        <main>
            <div class="flex h-screen">
                {children}
            </div>
        </main>
    )
}

export default FullLayout