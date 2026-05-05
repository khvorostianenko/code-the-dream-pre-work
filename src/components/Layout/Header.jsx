import {NavLink} from "react-router-dom";

export default function Header() {
    return (
        <header>
            <div className="container">
                <NavLink to="/">
                    <strong>Van Gogh Gallery</strong>
                </NavLink>
            </div>
        </header>
    )
}

