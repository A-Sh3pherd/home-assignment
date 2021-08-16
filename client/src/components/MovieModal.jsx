import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const MovieModal = ( title, rating, image, description, actors, published ) => {
    MySwal.fire({
        title: `${ title }`,
        // text: `${ description }`,
        imageUrl: `${ image }`,
        html: `
        <p style={fontSize: "0.8 rem"}> <strong> Actors </strong>: ${ actors } </p>
        <h3 style="color: darkgoldenrod"> Rating: ${ rating } </h3>
        <hr>
        <p> ${ description } </p>
`,
        imageWidth: 400,
        imageHeight: 400,
        imageAlt: { title },
    })
};

