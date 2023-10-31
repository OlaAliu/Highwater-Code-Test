import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Spinner = () => {
    return (
        <div style={{
            textAlign: 'center',
            width: '100%',

        }}>
            <FontAwesomeIcon icon="spinner" spin />
        </div>
    )
}

export default Spinner