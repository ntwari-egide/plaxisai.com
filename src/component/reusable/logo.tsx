type LogoProps = {
    size: 'small' | 'medium' | 'large';
}

const LogoComponent = ( {size}: LogoProps) => {
    return (
        <div>
            <h1 className={`${ size 
                === 'small' ? 'text-3xl' : size === 'medium' ? 'text-3xl' : 'text-5xl'
            } text-white`}>GetHired<span className="text-[_orange]">Hints</span></h1>
        </div>
    )
}

export default LogoComponent