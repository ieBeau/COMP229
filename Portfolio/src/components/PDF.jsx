import resume from '../assets/documents/resume.pdf'

export default function PDF () {
    return (
        <>
            <iframe src={resume} width={500} height={690} />
        </>
    )
}