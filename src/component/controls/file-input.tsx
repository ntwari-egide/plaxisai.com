type ReusableFileInput = {
    onChange: (file: File) => void;
    accept?: string;
    className?: string;
    style?: React.CSSProperties;
}

// it first of all need to upload the file somewhere.

const ReusableFileInput = ({ onChange, accept, className, style }: ReusableFileInput) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onChange(e.target.files[0]);
        }
    };

    return (
        <input
            type='file'
            accept={accept}
            onChange={handleFileChange}
            className={`file-input ${className}`}
            style={style}
        />
    );
};

export default ReusableFileInput;