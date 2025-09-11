// Cette page est le footer du site, affichant le copyright.

export const Footer = () => {
    return (
        <footer className="w-full flex justify-center items-center text-primaire p-4">
            <div className="flex flex-col items-center">
                <p className="mt-2 text-sm">
                    © {new Date().getFullYear()} adrien marc-chazarenc
                </p>
            </div>
        </footer>
    );
};

export default Footer;
