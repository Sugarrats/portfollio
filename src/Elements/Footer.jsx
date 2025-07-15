export const Footer = () => {
    return (
        <footer className="fixed bottom-0 left-0 right-0 flex justify-center items-center text-primaire p-4">
            <div className="flex flex-col items-center">
                <p className="mt-2 text-sm">© {new Date().getFullYear()} adrien marc-chazarenc</p>
            </div>
        </footer>
    );
};

export default Footer;
