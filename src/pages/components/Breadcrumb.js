import './breadcrumb.css'
import { useAuth } from '../../hooks/Auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Breadcrumb = ({ title }) => {
    const auth = useAuth();

    return (
        <>
            <nav className="breadcrumb has-succeeds-separator m-3" aria-label="breadcrumbs">
                <p>
                    Hello, {auth.userDetails.name}
                </p>
            </nav>
        </>
    )
}

export default Breadcrumb