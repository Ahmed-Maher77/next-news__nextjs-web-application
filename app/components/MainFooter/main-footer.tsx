// Site footer with copyright
const MainFooter = () => {
    return (
        <footer className="pt-16 pb-8 text-center flex flex-col gap-2 justify-center items-center">
            <p>
                Copyright &copy; {new Date().getFullYear()} &nbsp;  
                Developed By <a className="hover:underline transition duration-300" href="https://www.linkedin.com/in/ahmed-maher-algohary" title="About Developer" target="_blank">Ahmed Maher</a>
            </p>
            <span>All Rights Reserved</span>
        </footer>
    );
};

export default MainFooter;
