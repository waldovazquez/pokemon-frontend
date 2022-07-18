function SampleNextArrow({
  className,
  style,
  onClick,
}) {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#353535',
        borderRadius: '14px',
        width: '30px',
        height: '30px',
        left: '-35px',
      }}
      onClick={onClick}
    />
  );
}

export default SampleNextArrow;
