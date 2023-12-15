import {Helmet} from 'react-helmet';
import Navbar from './Navbar';

const Layout = ({title,content,Children}) => (
    <>
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={content} />
    </Helmet>
    <Navbar />
    <div className = "container mt-5" >
        {Children}
    </div>
    </>
)

export default Layout