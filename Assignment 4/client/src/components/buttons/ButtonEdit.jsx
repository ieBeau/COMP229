import '../../styles/components/buttons/ButtonEdit.css';

export default function ButtonEdit({ onClick }) {

    return <button className="button-edit" onClick={(e) => { e.stopPropagation(); onClick(); }}>Edit</button>;
}