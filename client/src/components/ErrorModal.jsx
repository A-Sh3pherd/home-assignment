import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const ErrorModal = ( msg ) => {
    MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${ msg }`,
    })
};



