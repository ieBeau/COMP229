import '../../styles/components/buttons/ButtonEdit.css';

export default function ButtonEdit({ id, type, onClick }) {

    // const handleButtonEdit = (e) => {
    //     e.stopPropagation();

    //     if (!id && !type) {
    //         console.error("ID or type not provided for editing.");
    //         return;
    //     }

    //     fetch(`http://localhost:3000/api/${type}/${id}`, {
    //         method: 'PUT',
    //         credentials: 'include',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     .then(response => response.json())
    //     .then(_ => onClick())
    //     .catch(error => {
    //         console.error('Error:', error);
    //     });
        
    // }

    return (
        <button className="button-edit" onClick={() => onClick()}>Edit</button>
    )

}