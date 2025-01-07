import { ArrowLeftIcon } from 'lucide-react';

const BackBtn = () => {
    const onClick = () => {
        window.history.back();
    };
    return (
        <button onClick={onClick} className='absolute top-4 z-10 left-10 sm:left-5 md:left-5 xsm:left-5 '>
            <ArrowLeftIcon style={styles.icon} />

        </button>
    );
};

const styles = {
    button: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        color: '#000',
    },
    icon: {
        marginRight: '8px',
    },
};

export default BackBtn;